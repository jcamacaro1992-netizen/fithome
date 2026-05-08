import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useApp } from '../contexts/AppContext'

// ─── brand color presets ─────────────────────────────────────────────────────
const COLOR_PRESETS = [
  { label: 'Azul',    value: '#4589FF' },
  { label: 'Naranja', value: '#F97316' },
  { label: 'Verde',   value: '#22C55E' },
  { label: 'Violeta', value: '#A78BFA' },
  { label: 'Rosa',    value: '#EC4899' },
  { label: 'Teal',    value: '#14B8A6' },
  { label: 'Rojo',    value: '#EF4444' },
  { label: 'Ámbar',   value: '#F59E0B' },
]

const PLAN_FEATURES = {
  free:       ['5 usuarios', 'Módulos: Entrenamiento + Nutrición', 'Marca FitHome'],
  starter:    ['25 usuarios', 'Todos los módulos', 'Logo propio', 'Analytics básico'],
  pro:        ['100 usuarios', 'Todos los módulos + IA', 'Sin marca', 'Analytics avanzado'],
  enterprise: ['Usuarios ilimitados', 'White-label completo', 'SLA 99.9%', 'Soporte 24/7'],
}

// ─── sub-components ───────────────────────────────────────────────────────────
function SectionCard({ title, subtitle, children }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r2)', overflow: 'hidden'
    }}>
      <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)'
        }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>
        )}
      </div>
      <div style={{ padding: '14px 16px' }}>{children}</div>
    </div>
  )
}

function RoleBadge({ role }) {
  const map = {
    owner: { label: 'Owner', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    admin: { label: 'Admin', color: '#4589FF', bg: 'rgba(69,137,255,0.12)' },
    member: { label: 'Miembro', color: 'var(--muted)', bg: 'var(--card2)' },
  }
  const s = map[role] ?? map.member
  return (
    <span style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.06em',
      color: s.color, background: s.bg,
      border: `1px solid ${s.color}30`,
      borderRadius: 5, padding: '2px 7px'
    }}>{s.label.toUpperCase()}</span>
  )
}

function StatBox({ value, label, color }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 3, padding: '12px 8px',
      background: `${color}0D`, border: `1px solid ${color}22`,
      borderRadius: 12
    }}>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800, fontSize: '1.6rem', color, lineHeight: 1
      }}>{value}</span>
      <span style={{ fontSize: '0.64rem', color: 'var(--muted)', textAlign: 'center' }}>{label}</span>
    </div>
  )
}

// ─── main screen ─────────────────────────────────────────────────────────────
export default function AdminScreen() {
  const navigate  = useNavigate()
  const { profile, tenant, isAdmin, isOwner, planLabel, planColor,
          updateTenantConfig, updateTenant, setUserRole, reload } = useApp()

  const [users,      setUsers]      = useState([])
  const [loadUsers,  setLoadUsers]  = useState(true)
  const [appName,    setAppName]    = useState('')
  const [saving,     setSaving]     = useState(false)
  const [savedMsg,   setSavedMsg]   = useState('')
  const [roleTarget, setRoleTarget] = useState(null)

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin) navigate('/config', { replace: true })
  }, [isAdmin, navigate])

  // Initialise form from tenant
  useEffect(() => {
    setAppName(tenant?.config?.brand?.name ?? tenant?.name ?? '')
  }, [tenant])

  // Load users in tenant
  useEffect(() => {
    if (!tenant?.id) return
    setLoadUsers(true)
    supabase
      .from('profiles')
      .select('id, email, name, role, is_active, created_at')
      .eq('tenant_id', tenant.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setUsers(data ?? [])
        setLoadUsers(false)
      })
  }, [tenant?.id])

  const currentColor = tenant?.config?.brand?.color ?? '#4589FF'

  async function saveBranding() {
    setSaving(true)
    const { error } = await updateTenantConfig({
      brand: { color: currentColor, name: appName }
    })
    if (!error) {
      if (appName !== tenant?.name) await updateTenant({ name: appName })
      flash('Guardado ✓')
    } else {
      flash('Error al guardar')
    }
    setSaving(false)
  }

  async function pickColor(color) {
    await updateTenantConfig({ brand: { color, name: appName } })
    flash('Color actualizado ✓')
  }

  async function handleRoleChange(userId, newRole) {
    setRoleTarget(userId)
    const { error } = await setUserRole(userId, newRole)
    if (!error) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      flash('Rol actualizado ✓')
    }
    setRoleTarget(null)
  }

  function flash(msg) {
    setSavedMsg(msg)
    setTimeout(() => setSavedMsg(''), 2500)
  }

  const usersLimit = tenant?.config?.limits?.users ?? 5
  const activeUsers = users.filter(u => u.is_active).length
  const planFeatures = PLAN_FEATURES[tenant?.plan ?? 'free'] ?? []

  return (
    <div className="screen">

      {/* ── Sticky header ── */}
      <div style={{
        padding: '16px 16px 14px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'var(--card2)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M6 1L1 6L6 11" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '1.5rem',
              letterSpacing: '0.03em', color: 'var(--text)', lineHeight: 1
            }}>ADMINISTRACIÓN</h1>
            <div style={{ fontSize: '0.71rem', color: 'var(--muted)', marginTop: 2 }}>
              {tenant?.name ?? '—'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.06em',
              color: planColor, background: `${planColor}18`,
              border: `1px solid ${planColor}30`,
              borderRadius: 5, padding: '3px 8px'
            }}>{planLabel.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 14px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── Stats ── */}
        <div style={{ display: 'flex', gap: 8 }}>
          <StatBox value={activeUsers}  label="usuarios activos"   color="var(--accent)" />
          <StatBox value={usersLimit}   label="límite del plan"    color={planColor} />
          <StatBox value={users.filter(u => u.role === 'owner' || u.role === 'admin').length}
                   label="admins"       color="#A78BFA" />
        </div>

        {/* ── Branding ── */}
        <SectionCard
          title="Identidad visual"
          subtitle="El color de acento se aplica a toda la aplicación en tiempo real"
        >
          {/* App name */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600,
                            letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              Nombre de la app
            </label>
            <input
              className="input-field"
              value={appName}
              onChange={e => setAppName(e.target.value)}
              placeholder="FitHome"
              maxLength={40}
            />
          </div>

          {/* Color presets */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600,
                            letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Color de acento
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {COLOR_PRESETS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => pickColor(value)}
                  title={label}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: value,
                    border: currentColor === value
                      ? `3px solid var(--text)`
                      : '3px solid transparent',
                    cursor: 'pointer', transition: 'border 0.15s, transform 0.1s',
                    transform: currentColor === value ? 'scale(1.15)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: currentColor, border: '1px solid var(--border)'
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                {currentColor}
              </span>
            </div>
          </div>

          <button
            className="btn-accent"
            onClick={saveBranding}
            disabled={saving}
            style={{ opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Guardando…' : savedMsg || 'Guardar cambios'}
          </button>
        </SectionCard>

        {/* ── Plan ── */}
        <SectionCard title="Plan actual" subtitle="Características incluidas">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {planFeatures.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <path d="M1 6l3.5 4L13 1" stroke="var(--success)" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{f}</span>
              </div>
            ))}
          </div>
          {tenant?.plan === 'free' && (
            <div style={{
              background: 'rgba(69,137,255,0.06)', border: '1px solid rgba(69,137,255,0.18)',
              borderRadius: 10, padding: '10px 12px',
              fontSize: '0.76rem', color: 'var(--muted)', lineHeight: 1.5
            }}>
              💡 Actualiza al plan <strong style={{ color: 'var(--accent)' }}>Starter</strong> para más
              usuarios y funciones avanzadas. Contacta al equipo FitHome.
            </div>
          )}
        </SectionCard>

        {/* ── Users ── */}
        <SectionCard
          title={`Usuarios (${activeUsers}/${usersLimit})`}
          subtitle="Gestiona roles de los miembros del equipo"
        >
          {loadUsers ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--muted)', fontSize: '0.8rem' }}>
              Cargando usuarios…
            </div>
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--muted)', fontSize: '0.8rem' }}>
              No hay otros usuarios en este tenant.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {users.map((u, idx) => {
                const isSelf   = u.id === profile?.id
                const isTarget = roleTarget === u.id
                return (
                  <div key={u.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 0',
                    borderTop: idx > 0 ? '1px solid var(--border)' : 'none'
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)'
                    }}>
                      {(u.name ?? u.email).charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.83rem', fontWeight: 600, color: 'var(--text)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {u.name ?? u.email}
                        {isSelf && <span style={{ fontSize: '0.65rem', color: 'var(--muted)', marginLeft: 5 }}>(tú)</span>}
                      </div>
                      {u.name && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 1,
                                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {u.email}
                        </div>
                      )}
                    </div>

                    {/* Role badge + change (owner can't be changed) */}
                    {u.role === 'owner' || isSelf ? (
                      <RoleBadge role={u.role} />
                    ) : (
                      <select
                        disabled={isTarget || !isOwner}
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        style={{
                          background: 'var(--card2)', border: '1px solid var(--border)',
                          borderRadius: 7, color: 'var(--text)', fontSize: '0.73rem',
                          padding: '3px 6px', cursor: isOwner ? 'pointer' : 'default'
                        }}
                      >
                        <option value="member">Miembro</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </SectionCard>

        {/* ── Tenant info ── */}
        <SectionCard title="Información del workspace">
          {[
            ['ID del tenant', tenant?.id?.slice(0, 8) + '…'],
            ['Slug',          tenant?.slug ?? '—'],
            ['Plan',          planLabel],
            ['Miembro desde', tenant?.created_at
              ? new Date(tenant.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
              : '—'],
          ].map(([label, value], i, arr) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '9px 0',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{label}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text)', fontFamily: 'monospace' }}>{value}</span>
            </div>
          ))}
        </SectionCard>

        {/* ── Flash message ── */}
        {savedMsg && (
          <div style={{
            position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--success)', color: '#000',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.85rem',
            padding: '8px 20px', borderRadius: 99, zIndex: 999,
            animation: 'fadeIn 0.2s ease'
          }}>
            {savedMsg}
          </div>
        )}

      </div>
    </div>
  )
}
