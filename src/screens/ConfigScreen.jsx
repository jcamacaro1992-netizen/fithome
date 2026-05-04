import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS } from '../data/exercises'

function Section({ title, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{
        fontSize: '0.72rem', color: 'var(--muted)',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 600, letterSpacing: '0.07em',
        textTransform: 'uppercase', paddingLeft: '4px'
      }}>
        {title}
      </span>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--r2)', overflow: 'hidden'
      }}>
        {children}
      </div>
    </div>
  )
}

function KeyField({ label, hint, placeholder, value, onChange, onSave, saved, danger = false }) {
  return (
    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '10px', lineHeight: 1.5 }}>
        {hint}
      </div>
      <input
        type="password"
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ marginBottom: '10px' }}
        autoComplete="off"
      />
      <button
        className="btn-accent"
        onClick={onSave}
        style={{ background: saved ? 'var(--success)' : 'var(--accent)' }}
      >
        {saved ? '✓ Guardada' : `Guardar ${label}`}
      </button>
    </div>
  )
}

export default function ConfigScreen() {
  const { user, signOut } = useAuth()
  const { clearToday } = useProgress(user)

  const [anthropicKey, setAnthropicKey] = useState('')
  const [anthropicSaved, setAnthropicSaved] = useState(false)
  const [googleKey, setGoogleKey] = useState('')
  const [googleSaved, setGoogleSaved] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [confirmClearVideos, setConfirmClearVideos] = useState(false)
  const [videoCacheCount, setVideoCacheCount] = useState(0)

  useEffect(() => {
    setAnthropicKey(localStorage.getItem('fithome_api_key') ?? '')
    setGoogleKey(localStorage.getItem('fithome_google_key') ?? '')
    // Count how many videos are cached
    const count = DAYS.flatMap(d => d.exercises).filter(ex => {
      const k = `fithome_vid_${ex.name.toLowerCase().replace(/\s+/g, '_')}`
      return !!localStorage.getItem(k)
    }).length
    setVideoCacheCount(count)
  }, [])

  function saveAnthropicKey() {
    localStorage.setItem('fithome_api_key', anthropicKey.trim())
    setAnthropicSaved(true)
    setTimeout(() => setAnthropicSaved(false), 2000)
  }

  function saveGoogleKey() {
    localStorage.setItem('fithome_google_key', googleKey.trim())
    setGoogleSaved(true)
    setTimeout(() => setGoogleSaved(false), 2000)
  }

  async function handleClearToday() {
    if (!confirmClear) { setConfirmClear(true); return }
    await clearToday()
    setConfirmClear(false)
  }

  function clearVideoCache() {
    if (!confirmClearVideos) { setConfirmClearVideos(true); return }
    DAYS.flatMap(d => d.exercises).forEach(ex => {
      const base = ex.name.toLowerCase().replace(/\s+/g, '_')
      localStorage.removeItem(`fithome_vid_${base}`)
      localStorage.removeItem(`fithome_vid_checked_${base}`)
    })
    setVideoCacheCount(0)
    setConfirmClearVideos(false)
  }

  const totalExercises = DAYS.flatMap(d => d.exercises).length
  const anthHint = anthropicKey ? `sk-ant-…${anthropicKey.slice(-6)}` : 'No configurada'
  const googleHint = googleKey ? `AIza…${googleKey.slice(-6)}` : 'No configurada'

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        padding: '18px 16px 14px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10
      }}>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '1.5rem',
          letterSpacing: '0.03em', color: 'var(--text)'
        }}>
          Ajustes
        </h1>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── Cuenta ── */}
        <Section title="Cuenta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="6" r="3" stroke="var(--accent)" strokeWidth="1.4"/>
                <path d="M2 14c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text)' }}>{user?.email ?? 'Usuario'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Sesión activa</div>
            </div>
          </div>
        </Section>

        {/* ── API Key Anthropic (ilustraciones automáticas) ── */}
        <Section title="Ilustraciones automáticas · Anthropic">
          <KeyField
            label="API key"
            hint="Las ilustraciones se generan automáticamente al abrir un ejercicio. Sin esta key se muestran en blanco."
            placeholder="sk-ant-api03-..."
            value={anthropicKey}
            onChange={setAnthropicKey}
            onSave={saveAnthropicKey}
            saved={anthropicSaved}
          />
          <div style={{ padding: '10px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Estado: {anthHint}</span>
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--accent)', textDecoration: 'none' }}
            >
              Obtener key ↗
            </a>
          </div>
        </Section>

        {/* ── API Key Google (videos automáticos) ── */}
        <Section title="Videos automáticos · YouTube API">
          <KeyField
            label="Google key"
            hint="Permite buscar y reemplazar videos automáticamente. Gratis: 100 búsquedas/día. Sin esta key se usan candidatos pre-cargados."
            placeholder="AIzaSy..."
            value={googleKey}
            onChange={setGoogleKey}
            onSave={saveGoogleKey}
            saved={googleSaved}
          />
          <div style={{ padding: '10px 16px 14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '6px' }}>
              Estado: {googleHint}
            </div>
            <div style={{
              background: 'var(--card2)', borderRadius: '10px',
              padding: '10px 12px', border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '0.73rem', color: 'var(--text2)', lineHeight: 1.5, marginBottom: '6px', fontWeight: 600 }}>
                Cómo obtener la key gratis:
              </div>
              {[
                '1. Ve a console.cloud.google.com',
                '2. Crea un proyecto nuevo',
                '3. Busca "YouTube Data API v3" y actívala',
                '4. Credenciales → Crear credencial → Clave de API',
                '5. Copia y pega la key aquí'
              ].map((s, i) => (
                <div key={i} style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.7 }}>{s}</div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Estado del sistema automático ── */}
        <Section title="Sistema automático · Estado">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text)' }}>Videos cacheados</span>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: '0.9rem',
                color: videoCacheCount === totalExercises ? 'var(--success)' : 'var(--accent)'
              }}>
                {videoCacheCount} / {totalExercises}
              </span>
            </div>
            <div style={{
              height: 6, borderRadius: 3,
              background: 'var(--border2)', overflow: 'hidden'
            }}>
              <div style={{
                width: `${(videoCacheCount / totalExercises) * 100}%`,
                height: '100%', borderRadius: 3,
                background: videoCacheCount === totalExercises ? 'var(--success)' : 'var(--accent)',
                transition: 'width 0.4s'
              }} />
            </div>
            <div style={{ fontSize: '0.73rem', color: 'var(--muted)', marginTop: '8px' }}>
              Los videos se verifican una vez al día. Si uno desaparece, se reemplaza automáticamente.
            </div>
          </div>
          <div
            onClick={clearVideoCache}
            style={{
              padding: '12px 16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '0.84rem', color: confirmClearVideos ? 'var(--red)' : 'var(--text2)' }}>
              {confirmClearVideos ? '¿Confirmar? Toca de nuevo' : 'Forzar re-búsqueda de todos los videos'}
            </span>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ opacity: 0.3 }}>
              <path d="M1 1L6 6L1 11" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Section>

        {/* ── Equipamiento ── */}
        <Section title="Equipamiento">
          {[
            ['🏋️', '2 mancuernas · 15 kg c/u'],
            ['🔩', 'Barra 10 kg + 6 discos 5 kg (40 kg total)'],
            ['🟩', 'Colchoneta de yoga'],
            ['🪑', 'Silla firme'],
            ['🏠', 'Sin saltos — entrenamiento en depto.'],
          ].map(([icon, label], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '11px 16px', borderBottom: '1px solid var(--border)'
            }}>
              <span>{icon}</span>
              <span style={{ fontSize: '0.86rem', color: 'var(--text2)' }}>{label}</span>
            </div>
          ))}
        </Section>

        {/* ── Progreso ── */}
        <Section title="Progreso">
          <div
            onClick={handleClearToday}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', cursor: 'pointer',
              borderBottom: '1px solid var(--border)'
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '9px',
              background: 'rgba(255,69,69,0.1)',
              border: '1px solid rgba(255,69,69,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 10h8l1-10"
                  stroke="var(--red)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '0.9rem', color: confirmClear ? 'var(--red)' : 'var(--red)', fontWeight: 500 }}>
              {confirmClear ? '¿Confirmar? Toca de nuevo' : 'Borrar progreso de hoy'}
            </span>
          </div>
        </Section>

        {/* ── Acerca de ── */}
        <Section title="Acerca de">
          {[
            ['FitHome', 'v0.1.0 · React + Vite + Supabase'],
            ['Videos', 'YouTube Data API v3 · auto-replace'],
            ['Ilustraciones', 'claude-sonnet-4-20250514 · auto-generate'],
          ].map(([label, value], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 16px', borderBottom: '1px solid var(--border)'
            }}>
              <span style={{ fontSize: '0.86rem', color: 'var(--text)', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{value}</span>
            </div>
          ))}
        </Section>

        {/* Logout */}
        <button
          onClick={signOut}
          className="btn-outline"
          style={{ color: 'var(--red)', borderColor: 'rgba(255,69,69,0.3)' }}
        >
          Cerrar sesión
        </button>

        <div style={{ height: 16 }} />
      </div>
    </div>
  )
}
