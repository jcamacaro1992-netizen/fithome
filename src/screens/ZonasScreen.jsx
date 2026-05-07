import { useState } from 'react'
import { ZONAS } from '../data/zonas'
import AutoVideoPlayer from '../components/AutoVideoPlayer'

/* ── Body silhouette icon with highlighted zone ── */
function BodyIcon({ zoneId, color }) {
  const dim = 'rgba(255,255,255,0.09)'
  const hl = (id) => zoneId === id ? color : dim
  return (
    <svg width="38" height="66" viewBox="0 0 38 66" fill="none">
      {/* Head */}
      <ellipse cx="19" cy="7" rx="6" ry="6.5" fill="rgba(255,255,255,0.13)"/>
      {/* Arms */}
      <rect x="1" y="17" width="6.5" height="18" rx="3" fill={dim} opacity="0.7"/>
      <rect x="30.5" y="17" width="6.5" height="18" rx="3" fill={dim} opacity="0.7"/>
      {/* Pecho / upper torso */}
      <rect x="10" y="15" width="18" height="11" rx="2" fill={hl('pecho')} opacity="0.85"/>
      {/* Abdomen / mid torso */}
      <rect x="11" y="27" width="16" height="10" rx="1.5" fill={hl('abdomen')} opacity="0.85"/>
      {/* Glúteos / hips */}
      <rect x="10" y="38" width="18" height="8" rx="2" fill={hl('gluteos')} opacity="0.85"/>
      {/* Piernas */}
      <rect x="10" y="47" width="7.5" height="19" rx="3" fill={hl('piernas')} opacity="0.85"/>
      <rect x="20.5" y="47" width="7.5" height="19" rx="3" fill={hl('piernas')} opacity="0.85"/>
      {/* Espalda hint (back diagonal lines on upper torso) */}
      {zoneId === 'espalda' && (
        <>
          <rect x="10" y="15" width="18" height="11" rx="2" fill={color} opacity="0.8"/>
          <line x1="12" y1="17" x2="16" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
          <line x1="17" y1="17" x2="21" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
          <line x1="22" y1="17" x2="26" y2="25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
        </>
      )}
    </svg>
  )
}

/* ── Single exercise row inside a zone ── */
function ZonaExercise({ exercise, accent }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      overflow: 'hidden'
    }}>
      {/* Row header */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '11px 14px', cursor: 'pointer'
        }}
      >
        {/* Accent dot */}
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: open ? accent : 'var(--border2)',
          flexShrink: 0, transition: 'background 0.2s'
        }}/>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {exercise.name}
          </div>
          <div style={{
            fontSize: '0.72rem', color: 'var(--muted)',
            fontFamily: "'Barlow Condensed', sans-serif", marginTop: '2px'
          }}>
            {exercise.sets}
          </div>
        </div>

        {/* Video badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '3px 8px', borderRadius: '7px',
          background: open ? `${accent}18` : 'var(--card2)',
          border: `1px solid ${open ? `${accent}30` : 'var(--border)'}`,
          transition: 'all 0.2s', flexShrink: 0
        }}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1 1.5v6l7-3-7-3z" fill={open ? accent : 'var(--muted)'}/>
          </svg>
          <span style={{
            fontSize: '0.6rem', fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, letterSpacing: '0.04em',
            color: open ? accent : 'var(--muted)'
          }}>VIDEO</span>
        </div>

        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{
            flexShrink: 0, opacity: 0.3,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s'
          }}>
          <path d="M2 4l4 4 4-4" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Expanded content */}
      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          {/* Muscles tags */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px'
          }}>
            {exercise.muscles.split(' · ').map((m, i) => (
              <span key={i} style={{
                fontSize: '0.67rem', color: accent,
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                background: `${accent}12`, padding: '2px 8px', borderRadius: '5px',
                border: `1px solid ${accent}22`
              }}>{m}</span>
            ))}
          </div>

          {/* Video */}
          <AutoVideoPlayer exerciseName={exercise.name} />

          {/* Steps */}
          <div style={{
            marginTop: '12px',
            display: 'flex', flexDirection: 'column', gap: '9px'
          }}>
            <span style={{
              fontSize: '0.62rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>Ejecución</span>
            {exercise.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 21, height: 21, borderRadius: '7px', flexShrink: 0,
                  background: `${accent}14`, border: `1px solid ${accent}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: '0.72rem', color: accent
                  }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.55, flex: 1 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Zone card ── */
function ZoneCard({ zona }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      borderRadius: 'var(--r2)',
      overflow: 'hidden',
      border: `1px solid ${expanded ? `${zona.color}35` : 'var(--border)'}`,
      background: 'var(--card)',
      transition: 'border-color 0.2s'
    }}>
      {/* Zone header */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          padding: '16px',
          cursor: 'pointer',
          background: expanded
            ? `linear-gradient(135deg, ${zona.color}18 0%, ${zona.color}06 100%)`
            : 'transparent',
          transition: 'background 0.25s'
        }}
      >
        {/* Body icon */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 52, height: 76,
          background: `${zona.color}10`,
          borderRadius: '14px',
          border: `1px solid ${zona.color}20`
        }}>
          <BodyIcon zoneId={zona.id} color={zona.color} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: '1.22rem',
            color: 'var(--text)', letterSpacing: '0.02em', lineHeight: 1.1
          }}>
            {zona.name}
          </div>
          <div style={{
            fontSize: '0.72rem', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.4
          }}>
            {zona.sub}
          </div>
          <div style={{ marginTop: '8px', display: 'flex', gap: '5px' }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                width: 22, height: 22, borderRadius: '7px',
                background: expanded ? `${zona.color}20` : 'var(--card2)',
                border: `1px solid ${expanded ? `${zona.color}35` : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: '0.68rem',
                  color: expanded ? zona.color : 'var(--muted)'
                }}>{n}</span>
              </div>
            ))}
            <span style={{
              fontSize: '0.68rem', color: 'var(--muted)', alignSelf: 'center',
              fontFamily: "'Barlow Condensed', sans-serif", marginLeft: '2px'
            }}>ejercicios</span>
          </div>
        </div>

        {/* Chevron */}
        <div style={{
          width: 30, height: 30, borderRadius: '9px', flexShrink: 0,
          background: expanded ? `${zona.color}18` : 'var(--card2)',
          border: `1px solid ${expanded ? `${zona.color}30` : 'var(--border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.22s ease'
            }}>
            <path d="M2 4l4 4 4-4" stroke={expanded ? zona.color : 'var(--muted)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Exercise list */}
      {expanded && (
        <div>
          {zona.exercises.map(ex => (
            <ZonaExercise key={ex.name} exercise={ex} accent={zona.color} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ZonasScreen() {
  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        padding: '16px 16px 14px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10
      }}>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '1.6rem',
          letterSpacing: '0.03em', color: 'var(--text)', lineHeight: 1
        }}>
          ZONAS
        </h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '3px' }}>
          Entrena por músculo objetivo · 3 ejercicios c/zona
        </p>
      </div>

      {/* Zone cards */}
      <div style={{ padding: '12px 12px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ZONAS.map(zona => (
          <ZoneCard key={zona.id} zona={zona} />
        ))}
      </div>
    </div>
  )
}
