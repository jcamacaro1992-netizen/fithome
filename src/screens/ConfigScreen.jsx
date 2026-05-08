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

function Row({ icon, label, value, chevron }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '13px 16px', borderBottom: '1px solid var(--border)'
    }}>
      {icon && (
        <div style={{
          width: 32, height: 32, borderRadius: '9px', flexShrink: 0,
          background: 'var(--card2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {icon}
        </div>
      )}
      <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>{label}</span>
      {value && <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{value}</span>}
      {chevron && (
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ opacity: 0.25 }}>
          <path d="M1 1L6 6L1 11" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

export default function ConfigScreen() {
  const { user, signOut } = useAuth()
  const { clearToday } = useProgress(user)

  const [googleKey, setGoogleKey] = useState('')
  const [googleSaved, setGoogleSaved] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [confirmClearVideos, setConfirmClearVideos] = useState(false)
  const [videoCacheCount, setVideoCacheCount] = useState(0)

  const totalExercises = DAYS.flatMap(d => d.exercises).length

  useEffect(() => {
    setGoogleKey(localStorage.getItem('fithome_google_key') ?? '')
    const count = DAYS.flatMap(d => d.exercises).filter(ex => {
      const k = `fithome_vid_${ex.name.toLowerCase().replace(/\s+/g, '_')}`
      return !!localStorage.getItem(k)
    }).length
    setVideoCacheCount(count)
  }, [])

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--accent-dim)', border: '1px solid var(--accent-glow)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="3.5" stroke="var(--accent)" strokeWidth="1.5"/>
                <path d="M2.5 16c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>
                {user?.email ?? 'Usuario'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '2px' }}>● Sesión activa</div>
            </div>
          </div>
        </Section>

        {/* ── Videos ── */}
        <Section title="Videos · YouTube API">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '10px', lineHeight: 1.5 }}>
              Permite buscar y reemplazar videos automáticamente cuando uno desaparece. Gratis: 100 búsquedas/día. Sin esta key se usan los candidatos pre-cargados.
            </div>
            <input
              type="password"
              className="input-field"
              placeholder="AIzaSy..."
              value={googleKey}
              onChange={e => setGoogleKey(e.target.value)}
              style={{ marginBottom: '10px' }}
              autoComplete="off"
            />
            <button
              className="btn-accent"
              onClick={saveGoogleKey}
              style={{ background: googleSaved ? 'var(--success)' : 'var(--accent)' }}
            >
              {googleSaved ? '✓ Guardada' : 'Guardar key'}
            </button>
          </div>
          <div style={{ padding: '10px 16px 14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '8px' }}>
              Estado: {googleHint}
            </div>
            <div style={{
              background: 'var(--card2)', borderRadius: '10px',
              padding: '10px 12px', border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '0.73rem', fontWeight: 600, color: 'var(--text2)', marginBottom: '6px', lineHeight: 1.5 }}>
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

        {/* ── Estado de videos ── */}
        <Section title="Caché de videos">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--text)' }}>Videos verificados</span>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                color: videoCacheCount === totalExercises ? 'var(--success)' : 'var(--accent)'
              }}>
                {videoCacheCount} / {totalExercises}
              </span>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: 'var(--border2)', overflow: 'hidden' }}>
              <div style={{
                width: `${(videoCacheCount / totalExercises) * 100}%`,
                height: '100%', borderRadius: 3,
                background: videoCacheCount === totalExercises ? 'var(--success)' : 'var(--accent)',
                transition: 'width 0.4s'
              }} />
            </div>
            <div style={{ fontSize: '0.73rem', color: 'var(--muted)', marginTop: '8px' }}>
              Los videos se verifican una vez al día y se reemplazan automáticamente si uno deja de estar disponible.
            </div>
          </div>
          <div onClick={clearVideoCache} style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.84rem', color: confirmClearVideos ? 'var(--red)' : 'var(--text2)' }}>
              {confirmClearVideos ? '¿Confirmar? Toca de nuevo' : 'Forzar re-búsqueda de videos'}
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
          <div onClick={handleClearToday} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '14px 16px', cursor: 'pointer'
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '9px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 3.5h11M5 3.5V2.5a1 1 0 011-1h3a1 1 0 011 1v1M5.5 6.5v4M9.5 6.5v4M2.5 3.5l.9 9h8.2l.9-9"
                  stroke="var(--red)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--red)', fontWeight: 500 }}>
              {confirmClear ? '¿Confirmar? Toca de nuevo' : 'Borrar progreso de hoy'}
            </span>
          </div>
        </Section>

        {/* ── Acerca de ── */}
        <Section title="Acerca de">
          {[
            ['FitHome', 'v1.0.0'],
            ['Plataforma', 'React 18 · Vite · Supabase'],
            ['Videos', 'YouTube · auto-verificación diaria'],
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
          style={{ color: 'var(--red)', borderColor: 'rgba(239,68,68,0.28)' }}
        >
          Cerrar sesión
        </button>

        <div style={{ height: 16 }} />
      </div>
    </div>
  )
}
