import { useState } from 'react'
import { getBadgeClass } from '../data/exercises'
import { useAuth } from '../hooks/useAuth'
import { useIllustrations } from '../hooks/useIllustrations'
import { useAutoVideo } from '../hooks/useAutoVideo'
import AutoVideoPlayer from './AutoVideoPlayer'

const PHASE_LABELS = ['Inicio', 'Medio', 'Final']

const BADGE_ACCENT = {
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

function IllustrationPanel({ svgs, loading, apiKey }) {
  const anyLoading = loading.some(Boolean)

  return (
    <div>
      {anyLoading && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 0', marginBottom: '8px'
        }}>
          <Spinner />
          <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
            Generando ilustraciones IA…
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{
              aspectRatio: '110 / 150',
              background: 'var(--bg)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {svgs[i] ? (
                <div style={{ width: '100%', height: '100%' }}
                  dangerouslySetInnerHTML={{ __html: svgs[i] }} />
              ) : loading[i] ? (
                <Spinner />
              ) : (
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
          marginTop: '10px',
          padding: '8px 10px',
          background: 'var(--card2)',
          borderRadius: '8px',
          border: '1px dashed var(--border2)',
          fontSize: '0.73rem', color: 'var(--muted)', textAlign: 'center'
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

  const { svgs, loading: illuLoading, apiKey } = useIllustrations(
    user,
    exercise.name,
    expanded && showIllustrations
  )

  const accentColor = BADGE_ACCENT[exercise.badge] ?? 'var(--accent)'
  const isVideoReady = videoStatus === 'ready' && videoId

  function handleCheck(e) {
    e.stopPropagation()
    onToggle(dayIdx, exIdx)
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

      {/* ── Header row ── */}
      <div
        onClick={onExpand}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '13px 14px 13px 16px', cursor: 'pointer'
        }}
      >
        {/* Check circle */}
        <button
          onClick={handleCheck}
          style={{
            width: 28, height: 28, borderRadius: '50%',
            border: done ? `2px solid var(--success)` : '2px solid var(--border2)',
            background: done ? 'var(--success)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s'
          }}
        >
          {done && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4.5L4 7.5L11 1" stroke="#0C0D0F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Name + sets */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
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
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                background: 'rgba(255,0,0,0.1)',
                borderRadius: '5px', padding: '1px 5px',
                fontSize: '0.58rem', color: '#FF4545',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, letterSpacing: '0.04em'
              }}>
                ▶ VIDEO
              </span>
            )}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px'
          }}>
            <span style={{
              fontSize: '0.74rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif"
            }}>
              {exercise.sets}
            </span>
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
            background: 'var(--card2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.65rem', color: 'var(--muted)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
              }}>
                Músculos:
              </span>
              {exercise.muscles.split(' · ').map((m, i) => (
                <span key={i} style={{
                  fontSize: '0.68rem', color: accentColor,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  background: `${accentColor}12`,
                  padding: '2px 6px', borderRadius: '5px'
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Video / Illustrations */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)' }}>
            {(videoStatus === 'loading' || videoStatus === 'searching') && (
              <div style={{
                background: 'var(--card2)', borderRadius: '12px',
                padding: '20px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                border: '1px solid var(--border)'
              }}>
                <Spinner />
                <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                  {videoStatus === 'loading' ? 'Verificando video…' : 'Buscando en YouTube…'}
                </span>
              </div>
            )}

            {videoId && <AutoVideoPlayer exerciseName={exercise.name} />}

            {showIllustrations && videoStatus !== 'loading' && videoStatus !== 'searching' && (
              <div style={{ marginTop: videoId ? '12px' : 0 }}>
                <div style={{
                  fontSize: '0.65rem', color: 'var(--muted)',
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
              fontSize: '0.65rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              Ejecución
            </span>
            {exercise.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '8px',
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
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
