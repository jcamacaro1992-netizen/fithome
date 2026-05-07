import { useAuth } from '../hooks/useAuth'
import { useIllustrations } from '../hooks/useIllustrations'
import { useAutoVideo } from '../hooks/useAutoVideo'
import { useSetTracking } from '../hooks/useSetTracking'
import { getBadgeClass } from '../data/exercises'
import AutoVideoPlayer from './AutoVideoPlayer'

const BADGE_COLOR = {
  Pecho:        '#FF6B2B',
  Hombros:      '#4C9EFF',
  Tríceps:      '#C6F135',
  Bíceps:       '#C6F135',
  Espalda:      '#4C9EFF',
  Piernas:      '#F5C518',
  Glúteos:      '#F5C518',
  Core:         '#C6F135',
  Fuerza:       '#FF6B2B',
  Global:       '#FF6B2B',
  Movilidad:    '#A78BFA',
  Columna:      '#A78BFA',
  Flexibilidad: '#A78BFA',
  Recuperación: '#1FD16A',
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      style={{ animation: 'spin 0.9s linear infinite', flexShrink: 0 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <path d="M9 2a7 7 0 107 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function SetRow({ num, set, isTimed, isBodyweight, onAdj, onToggle, accentColor }) {
  const label = isTimed ? 'seg' : 'reps'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px 0',
      borderBottom: '1px solid var(--border)',
      opacity: set.done ? 0.55 : 1,
      transition: 'opacity 0.2s'
    }}>
      {/* Set number */}
      <div style={{
        width: 24, height: 24, borderRadius: '7px', flexShrink: 0,
        background: set.done ? `${accentColor}18` : 'var(--card2)',
        border: `1px solid ${set.done ? `${accentColor}35` : 'var(--border2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '0.72rem',
          color: set.done ? accentColor : 'var(--muted)'
        }}>
          {num}
        </span>
      </div>

      {/* Reps block */}
      <div style={{
        flex: 1,
        background: 'var(--card2)',
        borderRadius: '10px',
        border: `1px solid var(--border2)`,
        padding: '6px 8px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <button onClick={() => onAdj('reps', -1)} style={adjBtnStyle}>−</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: '1.1rem',
            color: 'var(--text)', lineHeight: 1
          }}>
            {set.reps}
          </div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600, fontSize: '0.58rem',
            color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase'
          }}>
            {label}
          </div>
        </div>
        <button onClick={() => onAdj('reps', +1)} style={adjBtnStyle}>+</button>
      </div>

      {/* Weight block */}
      {!isBodyweight && (
        <div style={{
          flex: 1,
          background: 'var(--card2)',
          borderRadius: '10px',
          border: `1px solid var(--border2)`,
          padding: '6px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <button onClick={() => onAdj('weight', -1)} style={adjBtnStyle}>−</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '1.1rem',
              color: 'var(--text)', lineHeight: 1
            }}>
              {set.weight % 1 === 0 ? set.weight : set.weight.toFixed(1)}
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, fontSize: '0.58rem',
              color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase'
            }}>
              kg
            </div>
          </div>
          <button onClick={() => onAdj('weight', +1)} style={adjBtnStyle}>+</button>
        </div>
      )}

      {/* Done check */}
      <button
        onClick={onToggle}
        style={{
          width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
          border: set.done ? `2px solid ${accentColor}` : '2px solid var(--border2)',
          background: set.done ? accentColor : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s'
        }}
      >
        {set.done && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4.5L4 7.5L11 1" stroke="#0C0D0F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  )
}

const adjBtnStyle = {
  width: 24, height: 24, borderRadius: '7px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid var(--border2)',
  color: 'var(--text2)', fontSize: '0.9rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0,
  lineHeight: 1, padding: 0
}

function IllustrationPanel({ svgs, loading, apiKey }) {
  const anyLoading = loading.some(Boolean)
  const PHASE_LABELS = ['Inicio', 'Medio', 'Final']
  return (
    <div>
      {anyLoading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Spinner />
          <span style={{ fontSize: '0.73rem', color: 'var(--muted)' }}>Generando ilustraciones IA…</span>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{
              aspectRatio: '3/4', background: 'var(--bg)', borderRadius: '10px',
              border: '1px solid var(--border)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {svgs[i] ? (
                <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svgs[i] }} />
              ) : loading[i] ? <Spinner /> : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="var(--faint)" strokeWidth="1.4" strokeDasharray="3 2"/>
                </svg>
              )}
            </div>
            <span style={{
              textAlign: 'center', fontSize: '0.6rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase'
            }}>
              {PHASE_LABELS[i]}
            </span>
          </div>
        ))}
      </div>
      {!apiKey && (
        <div style={{
          marginTop: '10px', padding: '8px 10px',
          background: 'var(--card2)', borderRadius: '8px',
          border: '1px dashed var(--border2)',
          fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center'
        }}>
          Añade tu API key Anthropic en Ajustes para ilustraciones automáticas
        </div>
      )}
    </div>
  )
}

export default function ExerciseRow({ exercise, dayIdx, exIdx, done, onToggle, expanded, onExpand }) {
  const { user } = useAuth()
  const { videoId, status: videoStatus } = useAutoVideo(exercise.name)
  const showIllustrations = videoStatus === 'none' || (!videoId && videoStatus !== 'loading' && videoStatus !== 'searching')
  const { svgs, loading: illuLoading, apiKey } = useIllustrations(user, exercise.name, expanded && showIllustrations)
  const { sets, adj, toggleDone, doneSets, allDone, best1RM, isTimed, isBodyweight } = useSetTracking(exercise.name, exercise.sets, dayIdx)

  const accentColor = BADGE_COLOR[exercise.badge] ?? 'var(--accent)'
  const isVideoReady = videoStatus === 'ready' && videoId

  function handleCheck(e) {
    e.stopPropagation()
    onToggle(dayIdx, exIdx)
  }

  // Auto-check when all sets done
  function handleSetToggle(i) {
    toggleDone(i)
    const willAllBeDone = sets.every((s, idx) => idx === i ? !s.done : s.done)
    if (willAllBeDone && !done) onToggle(dayIdx, exIdx)
    if (!willAllBeDone && done) onToggle(dayIdx, exIdx)
  }

  return (
    <div style={{
      background: done ? 'rgba(31,209,106,0.03)' : 'var(--card)',
      border: `1px solid ${expanded ? `${accentColor}40` : done ? 'rgba(31,209,106,0.2)' : 'var(--border)'}`,
      borderRadius: 'var(--r2)',
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      position: 'relative'
    }}>
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: done ? 'var(--success)' : expanded ? accentColor : 'transparent',
        borderRadius: '18px 0 0 18px',
        transition: 'background 0.2s'
      }} />

      {/* ── Header ── */}
      <div onClick={onExpand} style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '13px 14px 13px 16px', cursor: 'pointer'
      }}>
        {/* Main check */}
        <button onClick={handleCheck} style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          border: done ? '2px solid var(--success)' : '2px solid var(--border2)',
          background: done ? 'var(--success)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s'
        }}>
          {done && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4.5L4 7.5L11 1" stroke="#0C0D0F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontWeight: 600, fontSize: '0.9rem',
              color: done ? 'var(--muted)' : 'var(--text)',
              textDecoration: done ? 'line-through' : 'none',
              textDecorationColor: 'var(--muted)'
            }}>
              {exercise.name}
            </span>
            <span className={getBadgeClass(exercise.badge)}>{exercise.badge}</span>
            {isVideoReady && (
              <span style={{
                background: 'rgba(255,0,0,0.12)', borderRadius: '5px',
                padding: '1px 5px', fontSize: '0.58rem', color: '#FF4545',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, letterSpacing: '0.04em'
              }}>
                ▶ VIDEO
              </span>
            )}
          </div>

          {/* Sets info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
            <span style={{
              fontSize: '0.73rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif"
            }}>
              {exercise.sets}
            </span>
            {doneSets > 0 && (
              <span style={{
                fontSize: '0.68rem',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: allDone ? 'var(--success)' : accentColor,
                background: allDone ? 'rgba(31,209,106,0.12)' : `${accentColor}15`,
                padding: '1px 6px', borderRadius: '5px'
              }}>
                {doneSets}/{sets.length} series
              </span>
            )}
          </div>
        </div>

        {/* Expand arrow */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{
            flexShrink: 0, opacity: 0.4,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s ease'
          }}
        >
          <path d="M2 5l5 5 5-5" stroke="var(--text2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Expanded content ── */}
      {expanded && (
        <>
          {/* Muscles row */}
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid var(--border)',
            background: 'var(--card2)',
            display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '0.63rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              Músculos:
            </span>
            {exercise.muscles.split(' · ').map((m, i) => (
              <span key={i} style={{
                fontSize: '0.67rem', color: accentColor,
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                background: `${accentColor}12`, padding: '2px 6px', borderRadius: '5px'
              }}>
                {m}
              </span>
            ))}
          </div>

          {/* ── SET TRACKER ── */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.63rem', color: 'var(--muted)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
              }}>
                Series · {isTimed ? 'Tiempo' : isBodyweight ? 'Repeticiones' : 'Reps + Peso'}
              </span>
              {best1RM > 0 && (
                <span style={{
                  fontSize: '0.68rem',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, color: accentColor,
                  background: `${accentColor}12`,
                  padding: '2px 8px', borderRadius: '6px',
                  border: `1px solid ${accentColor}25`
                }}>
                  1RM est. {best1RM} kg
                </span>
              )}
            </div>

            <div>
              {sets.map((set, i) => (
                <SetRow
                  key={i}
                  num={i + 1}
                  set={set}
                  isTimed={isTimed}
                  isBodyweight={isBodyweight}
                  onAdj={(field, delta) => adj(i, field, delta)}
                  onToggle={() => handleSetToggle(i)}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>

          {/* Video / Illustrations */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
            {(videoStatus === 'loading' || videoStatus === 'searching') && (
              <div style={{
                background: 'var(--card2)', borderRadius: '12px',
                padding: '20px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px', border: '1px solid var(--border)'
              }}>
                <Spinner />
                <span style={{ fontSize: '0.73rem', color: 'var(--muted)' }}>
                  {videoStatus === 'loading' ? 'Verificando video…' : 'Buscando en YouTube…'}
                </span>
              </div>
            )}
            {videoId && <AutoVideoPlayer exerciseName={exercise.name} />}
            {showIllustrations && videoStatus !== 'loading' && videoStatus !== 'searching' && (
              <div style={{ marginTop: videoId ? '12px' : 0 }}>
                <div style={{
                  fontSize: '0.63rem', color: 'var(--muted)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '10px'
                }}>
                  Ilustraciones IA
                </div>
                <IllustrationPanel svgs={svgs} loading={illuLoading} apiKey={apiKey} />
              </div>
            )}
          </div>

          {/* Steps */}
          <div style={{
            padding: '12px 16px 16px',
            borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '10px'
          }}>
            <span style={{
              fontSize: '0.63rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              Ejecución
            </span>
            {exercise.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '8px', flexShrink: 0,
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: '0.75rem', color: accentColor
                  }}>
                    {i + 1}
                  </span>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.55, flex: 1 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
