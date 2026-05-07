import { useAuth } from '../hooks/useAuth'
import { useIllustrations } from '../hooks/useIllustrations'
import { useAutoVideo } from '../hooks/useAutoVideo'
import { useSetTracking } from '../hooks/useSetTracking'
import { getBadgeClass } from '../data/exercises'
import AutoVideoPlayer from './AutoVideoPlayer'

const BADGE_COLOR = {
  Pecho:        '#F97316',
  Hombros:      '#4589FF',
  Tríceps:      '#4589FF',
  Bíceps:       '#4589FF',
  Espalda:      '#4589FF',
  Piernas:      '#F59E0B',
  Glúteos:      '#F59E0B',
  Core:         '#22C55E',
  Fuerza:       '#F97316',
  Global:       '#F97316',
  Movilidad:    '#A78BFA',
  Columna:      '#A78BFA',
  Flexibilidad: '#A78BFA',
  Recuperación: '#22C55E',
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

/* ── Big set block (matches reference style) ── */
function SetBlock({ value, label, onDec, onInc, done }) {
  const opacity = done ? 0.45 : 1
  return (
    <div style={{
      flex: 1,
      background: done ? 'rgba(69,137,255,0.35)' : 'var(--accent)',
      borderRadius: '14px',
      overflow: 'hidden',
      opacity,
      transition: 'opacity 0.2s'
    }}>
      {/* Number + label */}
      <div style={{
        padding: '11px 8px 8px',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '1.65rem',
          color: '#fff', lineHeight: 1
        }}>
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600, fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.65)',
          letterSpacing: '0.05em', textTransform: 'uppercase',
          marginTop: '3px'
        }}>
          {label}
        </div>
      </div>
      {/* Controls */}
      <div style={{
        display: 'flex',
        borderTop: '1px solid rgba(255,255,255,0.18)'
      }}>
        <button
          onClick={onDec}
          style={{
            flex: 1, padding: '7px 0',
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '1.15rem',
            cursor: 'pointer', lineHeight: 1
          }}
        >−</button>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.18)' }} />
        <button
          onClick={onInc}
          style={{
            flex: 1, padding: '7px 0',
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '1.15rem',
            cursor: 'pointer', lineHeight: 1
          }}
        >+</button>
      </div>
    </div>
  )
}

function SetRow({ num, set, isTimed, isBodyweight, onAdj, onToggle }) {
  const label = isTimed ? 'seg' : 'reps'
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '8px',
      paddingBottom: '10px',
      marginBottom: '10px',
      borderBottom: '1px solid var(--border)'
    }}>
      {/* Set number badge */}
      <div style={{
        width: 28, height: 28, borderRadius: '8px', flexShrink: 0, marginTop: '6px',
        background: set.done ? 'rgba(34,197,94,0.15)' : 'var(--card2)',
        border: `1px solid ${set.done ? 'rgba(34,197,94,0.3)' : 'var(--border2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '0.78rem',
          color: set.done ? '#22C55E' : 'var(--muted)'
        }}>{num}</span>
      </div>

      {/* Reps block */}
      <SetBlock
        value={set.reps}
        label={label}
        onDec={() => onAdj('reps', -1)}
        onInc={() => onAdj('reps', +1)}
        done={set.done}
      />

      {/* Weight block (only if not bodyweight) */}
      {!isBodyweight && (
        <SetBlock
          value={set.weight}
          label="kg"
          onDec={() => onAdj('weight', -1)}
          onInc={() => onAdj('weight', +1)}
          done={set.done}
        />
      )}

      {/* Done check */}
      <button
        onClick={onToggle}
        style={{
          width: 30, height: 30, borderRadius: '50%',
          flexShrink: 0, marginTop: '6px',
          border: set.done ? '2px solid #22C55E' : '2px solid var(--border2)',
          background: set.done ? '#22C55E' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s'
        }}
      >
        {set.done && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4.5L4 7.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  )
}

function IllustrationPanel({ svgs, loading, apiKey }) {
  const anyLoading = loading.some(Boolean)
  const LABELS = ['Inicio', 'Medio', 'Final']
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
              aspectRatio: '3/4', background: 'var(--bg)',
              borderRadius: '10px', border: '1px solid var(--border)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {svgs[i]
                ? <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svgs[i] }} />
                : loading[i] ? <Spinner />
                : <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="var(--faint)" strokeWidth="1.4" strokeDasharray="3 2"/>
                  </svg>
              }
            </div>
            <span style={{
              textAlign: 'center', fontSize: '0.6rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase'
            }}>
              {LABELS[i]}
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
  const noVideo = videoStatus === 'none' || (!videoId && videoStatus !== 'loading' && videoStatus !== 'searching')
  const { svgs, loading: illuLoading, apiKey } = useIllustrations(user, exercise.name, expanded && noVideo)
  const { sets, adj, toggleDone, doneSets, allDone, best1RM, isTimed, isBodyweight } = useSetTracking(exercise.name, exercise.sets, dayIdx)

  const accent = BADGE_COLOR[exercise.badge] ?? 'var(--accent)'
  const isVideoReady = videoStatus === 'ready' && videoId

  function handleCheck(e) {
    e.stopPropagation()
    onToggle(dayIdx, exIdx)
  }

  function handleSetToggle(i) {
    const wasDone = sets[i].done
    toggleDone(i)
    const willAllBeDone = sets.every((s, idx) => idx === i ? !wasDone : s.done)
    if (willAllBeDone && !done) onToggle(dayIdx, exIdx)
    else if (!willAllBeDone && done) onToggle(dayIdx, exIdx)
  }

  return (
    <div style={{
      background: done ? 'rgba(34,197,94,0.04)' : 'var(--card)',
      border: `1px solid ${expanded ? `${accent}45` : done ? 'rgba(34,197,94,0.22)' : 'var(--border)'}`,
      borderRadius: 'var(--r2)',
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      position: 'relative'
    }}>
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: done ? '#22C55E' : expanded ? accent : 'transparent',
        borderRadius: '18px 0 0 18px',
        transition: 'background 0.2s'
      }} />

      {/* ── Header row ── */}
      <div onClick={onExpand} style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '13px 14px 13px 16px', cursor: 'pointer'
      }}>
        {/* Check */}
        <button onClick={handleCheck} style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          border: done ? '2px solid #22C55E' : '2px solid var(--border2)',
          background: done ? '#22C55E' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s'
        }}>
          {done && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4.5L4 7.5L11 1" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
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
                background: 'rgba(239,68,68,0.12)', borderRadius: '5px',
                padding: '1px 5px', fontSize: '0.58rem', color: '#EF4444',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700
              }}>▶ VIDEO</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
            <span style={{ fontSize: '0.73rem', color: 'var(--muted)', fontFamily: "'Barlow Condensed', sans-serif" }}>
              {exercise.sets}
            </span>
            {doneSets > 0 && (
              <span style={{
                fontSize: '0.68rem',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                color: allDone ? '#22C55E' : 'var(--accent)',
                background: allDone ? 'rgba(34,197,94,0.12)' : 'var(--accent-dim)',
                padding: '1px 6px', borderRadius: '5px'
              }}>
                {doneSets}/{sets.length} series
              </span>
            )}
          </div>
        </div>

        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{
            flexShrink: 0, opacity: 0.35,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s ease'
          }}>
          <path d="M2 5l5 5 5-5" stroke="var(--text2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Expanded ── */}
      {expanded && (
        <>
          {/* Muscles */}
          <div style={{
            padding: '8px 16px', borderTop: '1px solid var(--border)',
            background: 'var(--card2)',
            display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '0.63rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>Músculos:</span>
            {exercise.muscles.split(' · ').map((m, i) => (
              <span key={i} style={{
                fontSize: '0.67rem', color: accent,
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                background: `${accent}12`, padding: '2px 7px', borderRadius: '5px',
                border: `1px solid ${accent}20`
              }}>{m}</span>
            ))}
          </div>

          {/* ── SET TRACKER ── */}
          <div style={{ padding: '14px 14px 4px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{
                fontSize: '0.63rem', color: 'var(--muted)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
              }}>
                Series
              </span>
              {best1RM > 0 && (
                <span style={{
                  fontSize: '0.7rem', fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, color: 'var(--accent)',
                  background: 'var(--accent-dim)',
                  padding: '2px 10px', borderRadius: '6px',
                  border: '1px solid var(--accent-glow)'
                }}>
                  1RM est. {best1RM} kg
                </span>
              )}
            </div>

            {sets.map((set, i) => (
              <SetRow
                key={i}
                num={i + 1}
                set={set}
                isTimed={isTimed}
                isBodyweight={isBodyweight}
                onAdj={(field, delta) => adj(i, field, delta)}
                onToggle={() => handleSetToggle(i)}
              />
            ))}
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
            {noVideo && videoStatus !== 'loading' && videoStatus !== 'searching' && (
              <div style={{ marginTop: videoId ? '12px' : 0 }}>
                <div style={{
                  fontSize: '0.63rem', color: 'var(--muted)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '10px'
                }}>Ilustraciones IA</div>
                <IllustrationPanel svgs={svgs} loading={illuLoading} apiKey={apiKey} />
              </div>
            )}
          </div>

          {/* Steps */}
          <div style={{
            padding: '12px 16px 18px', borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '10px'
          }}>
            <span style={{
              fontSize: '0.63rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>Ejecución</span>
            {exercise.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '8px', flexShrink: 0,
                  background: `${accent}14`, border: `1px solid ${accent}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: '0.75rem', color: accent
                  }}>{i + 1}</span>
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
