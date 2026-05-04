import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function extractYouTubeId(input) {
  const s = input.trim()
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  for (const p of patterns) {
    const m = s.match(p)
    if (m) return m[1]
  }
  return null
}

export default function VideoSection({ exerciseName, dayIdx, exIdx, svgs, loadingIllu, apiKey, onGenerate, onGenerateAll }) {
  const navigate = useNavigate()
  const storageKey = `fithome_video_${exerciseName.toLowerCase().replace(/\s+/g, '_')}`
  const [videoId, setVideoId] = useState(() => localStorage.getItem(storageKey) ?? '')
  const [input, setInput] = useState('')
  const [videoError, setVideoError] = useState(false)
  const [tab, setTab] = useState('video') // 'video' | 'illu'

  function handleSave() {
    const id = extractYouTubeId(input)
    if (id) {
      localStorage.setItem(storageKey, id)
      setVideoId(id)
      setInput('')
      setVideoError(false)
    }
  }

  const PHASE_LABELS = ['Inicio', 'Medio', 'Final']
  const hasIllu = svgs?.some(Boolean)

  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        <TabBtn active={tab === 'video'} onClick={() => setTab('video')}>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ marginRight: 5 }}>
            <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10 3.5l3.5-2v7L10 6.5V3.5z" fill="currentColor"/>
          </svg>
          Video
        </TabBtn>
        <TabBtn active={tab === 'illu'} onClick={() => setTab('illu')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 5 }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Ilustraciones IA
        </TabBtn>
      </div>

      {/* VIDEO TAB */}
      {tab === 'video' && (
        <div style={{ padding: '10px 12px 12px' }}>
          {/* YouTube header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <div style={{
                background: '#FF0000', borderRadius: '4px',
                width: 28, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="white">
                  <path d="M4 6V2l4 2-4 2z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.83rem', color: 'var(--text)', fontWeight: 500 }}>
                {exerciseName}
              </span>
            </div>
            {videoId && (
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.72rem', color: 'var(--text2)', textDecoration: 'none' }}
              >
                abrir ↗
              </a>
            )}
          </div>

          {/* Player */}
          {videoId && !videoError ? (
            <div style={{
              position: 'relative', paddingBottom: '56.25%', height: 0,
              borderRadius: '10px', overflow: 'hidden', marginBottom: '10px',
              background: '#000'
            }}>
              <iframe
                key={videoId}
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => setVideoError(true)}
                title={exerciseName}
              />
            </div>
          ) : videoId && videoError ? (
            <div style={{
              background: 'var(--card2)', borderRadius: '10px',
              padding: '20px', textAlign: 'center', marginBottom: '10px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '8px' }}>
                Error cargando el video
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', fontSize: '0.83rem', fontWeight: 600 }}
              >
                Mirar el video en YouTube ↗
              </a>
            </div>
          ) : (
            <div style={{
              background: 'var(--card2)', borderRadius: '10px',
              padding: '18px', textAlign: 'center', marginBottom: '10px',
              border: '1px dashed var(--border2)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                Sin video · Busca en YouTube "{exerciseName} en casa" y pega el ID o URL
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="input-field"
              placeholder="ID YouTube: Pega ID o URL"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              style={{ flex: 1, padding: '9px 12px', fontSize: '0.82rem' }}
            />
            <button
              onClick={handleSave}
              style={{
                background: 'var(--accent)', color: '#0C0D0F',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '0.95rem',
                padding: '9px 16px', borderRadius: 'var(--r)',
                border: 'none', cursor: 'pointer', flexShrink: 0
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ILLUSTRATIONS TAB */}
      {tab === 'illu' && (
        <div style={{ padding: '10px 12px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{
                  aspectRatio: '110 / 160',
                  background: '#111315',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative'
                }}>
                  {svgs?.[i] ? (
                    <div style={{ width: '100%', height: '100%' }}
                      dangerouslySetInnerHTML={{ __html: svgs[i] }} />
                  ) : loadingIllu?.[i] ? (
                    <Spinner />
                  ) : apiKey ? (
                    <button onClick={() => onGenerate?.(i)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" stroke="var(--accent)" strokeWidth="1.4" opacity="0.5"/>
                        <path d="M10 6v8M6 10h8" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      <span style={{ fontSize: '0.58rem', color: 'var(--accent)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>
                        GENERAR
                      </span>
                    </button>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="7" width="12" height="8" rx="2" stroke="var(--faint)" strokeWidth="1.4"/>
                      <path d="M5 7V5a3 3 0 016 0v2" stroke="var(--faint)" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <span style={{
                  textAlign: 'center', fontSize: '0.6rem',
                  color: 'var(--muted)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase'
                }}>
                  {['Inicio', 'Medio', 'Final'][i]}
                </span>
              </div>
            ))}
          </div>

          {!apiKey ? (
            <button
              onClick={() => navigate('/config')}
              style={{
                width: '100%', background: 'transparent',
                border: '1px dashed var(--border2)', borderRadius: 'var(--r)',
                color: 'var(--text2)', fontSize: '0.8rem',
                padding: '10px', cursor: 'pointer',
                fontFamily: "'Barlow', sans-serif"
              }}
            >
              Añade tu API key Anthropic en Ajustes →
            </button>
          ) : !svgs?.every(Boolean) && (
            <button
              onClick={onGenerateAll}
              style={{
                width: '100%',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent-glow)',
                borderRadius: 'var(--r)',
                color: 'var(--accent)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '0.88rem',
                padding: '10px', cursor: 'pointer'
              }}
            >
              Generar ilustraciones
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '9px 8px',
        background: 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
        color: active ? 'var(--accent)' : 'var(--muted)',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontSize: '0.78rem',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        cursor: 'pointer', transition: 'all 0.15s'
      }}
    >
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <path d="M11 3a8 8 0 108 8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
