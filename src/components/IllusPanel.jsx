import { useNavigate } from 'react-router-dom'

const PHASE_LABELS = ['Inicio', 'Medio', 'Final']

export default function IllusPanel({ svgs, loading, apiKey, onGenerate, onGenerateAll }) {
  const navigate = useNavigate()
  const hasAny = svgs.some(Boolean)
  const allDone = svgs.every(Boolean)

  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r2)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text2)'
        }}>
          Ilustraciones IA
        </span>
        {apiKey && !allDone && (
          <button
            onClick={onGenerateAll}
            style={{
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-glow)',
              color: 'var(--accent)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              padding: '5px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Generar todo
          </button>
        )}
      </div>

      {/* Frames */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              aspectRatio: '110 / 160',
              background: '#111315',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {svgs[i] ? (
                <div
                  style={{ width: '100%', height: '100%' }}
                  dangerouslySetInnerHTML={{ __html: svgs[i] }}
                />
              ) : loading[i] ? (
                <Spinner />
              ) : apiKey ? (
                <button
                  onClick={() => onGenerate(i)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="9" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4"/>
                    <path d="M11 7v8M7 11h8" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '0.6rem', color: 'var(--accent)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                    GENERAR
                  </span>
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="8" width="14" height="9" rx="2" stroke="var(--faint)" strokeWidth="1.5"/>
                    <path d="M6 8V6a3 3 0 016 0v2" stroke="var(--faint)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '0.55rem', color: 'var(--faint)', textAlign: 'center', lineHeight: 1.3, fontFamily: "'Barlow Condensed', sans-serif" }}>
                    API Key
                  </span>
                </div>
              )}
            </div>
            <span style={{
              textAlign: 'center',
              fontSize: '0.65rem',
              color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              {PHASE_LABELS[i]}
            </span>
          </div>
        ))}
      </div>

      {!apiKey && (
        <button
          onClick={() => navigate('/config')}
          style={{
            background: 'transparent',
            border: '1px dashed var(--border2)',
            borderRadius: 'var(--r)',
            color: 'var(--text2)',
            fontSize: '0.82rem',
            padding: '10px',
            cursor: 'pointer',
            fontFamily: "'Barlow', sans-serif"
          }}
        >
          Añade tu API key Anthropic para generar ilustraciones →
        </button>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <path d="M12 3a9 9 0 109 9" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}
