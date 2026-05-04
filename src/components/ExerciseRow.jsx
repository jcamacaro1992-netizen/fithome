import { useState } from 'react'
import { getBadgeClass } from '../data/exercises'
import { useAuth } from '../hooks/useAuth'
import { useIllustrations } from '../hooks/useIllustrations'
import { useAutoVideo } from '../hooks/useAutoVideo'
import AutoVideoPlayer from './AutoVideoPlayer'

const PHASE_LABELS = ['Inicio', 'Medio', 'Final']

function Spinner() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ animation: 'spin 0.9s linear infinite' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <path d="M10 3a7 7 0 107 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function IllustrationPanel({ svgs, loading, apiKey }) {
  const allLoading = loading.every(Boolean)
  const anyLoading = loading.some(Boolean)
  const allDone = svgs.every(Boolean)

  return (
    <div>
      {/* Status bar */}
      {anyLoading && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 0', marginBottom: '8px'
        }}>
          <Spinner />
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            Generando ilustraciones IA…
          </span>
        </div>
      )}

      {/* 3 frames */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{
              aspectRatio: '110 / 160',
              background: '#111315',
              borderRadius: '8px',
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
          padding: '8px 10px',
          background: 'var(--card2)',
          borderRadius: '8px',
          border: '1px dashed var(--border2)',
          fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center'
        }}>
          Añade tu API key Anthropic en Ajustes para generar ilustraciones automáticamente
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
    expanded && showIllustrations // auto-generate only when expanded AND no video
  )

  function handleCheck(e) {
    e.stopPropagation()
    onToggle(dayIdx, exIdx)
  }

  return (
    <div style={{
      background: done ? 'rgba(31,209,106,0.04)' : 'var(--card)',
      border: `1px solid ${expanded ? 'var(--accent-glow)' : done ? 'rgba(31,209,106,0.15)' : 'var(--border)'}`,
      borderRadius: 'var(--r2)',
      overflow: 'hidden',
      transition: 'border-color 0.15s'
    }}>
      {/* ── Header row ── */}
      <div
        onClick={onExpand}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '13px 14px', cursor: 'pointer'
        }}
      >
        {/* Check circle */}
        <button
          onClick={handleCheck}
          style={{
            width: 26, height: 26, borderRadius: '50%',
            border: done ? '2px solid var(--success)' : '2px solid var(--border2)',
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
              textDecoration: done ? 'line-through' : 'none'
            }}>
              {exercise.name}
            </span>
            <span className={getBadgeClass(exercise.badge)}>{exercise.badge}</span>

            {/* Video indicator dot */}
            {videoStatus === 'ready' && videoId && (
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#FF0000', flexShrink: 0,
                display: 'inline-block'
              }} title="Video disponible" />
            )}
          </div>
          <span style={{
            fontSize: '0.75rem', color: 'var(--muted)',
            fontFamily: "'Barlow Condensed', sans-serif"
          }}>
            {exercise.sets}
          </span>
        </div>

        {/* Expand arrow */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{
            flexShrink: 0, opacity: 0.45,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="var(--text2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Expanded content ── */}
      {expanded && (
        <>
          {/* Video + Illustrations section */}
          <div style={{
            padding: '10px 14px 12px',
            borderTop: '1px solid var(--border)'
          }}>
            {/* Video status: loading/searching */}
            {(videoStatus === 'loading' || videoStatus === 'searching') && (
              <div style={{
                background: 'var(--card2)', borderRadius: '10px',
                padding: '22px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px', marginBottom: '12px',
                border: '1px solid var(--border)'
              }}>
                <Spinner />
                <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                  {videoStatus === 'loading' ? 'Verificando video…' : 'Buscando video en YouTube…'}
                </span>
              </div>
            )}

            {/* Video player (when found) */}
            {videoId && (
              <div style={{ marginBottom: showIllustrations ? 0 : 0 }}>
                <AutoVideoPlayer exerciseName={exercise.name} />
              </div>
            )}

            {/* Illustrations (when no video or in addition) */}
            {showIllustrations && videoStatus !== 'loading' && videoStatus !== 'searching' && (
              <div style={{ marginTop: videoId ? '12px' : 0 }}>
                <div style={{
                  fontSize: '0.68rem', color: 'var(--muted)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', marginBottom: '8px'
                }}>
                  Ilustraciones IA
                </div>
                <IllustrationPanel svgs={svgs} loading={illuLoading} apiKey={apiKey} />
              </div>
            )}
          </div>

          {/* Execution steps */}
          <div style={{
            padding: '12px 14px 14px',
            borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '10px'
          }}>
            <span style={{
              fontSize: '0.68rem', color: 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              Ejecución · {exercise.muscles}
            </span>
            {exercise.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '7px',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-glow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: '0.75rem', color: 'var(--accent)'
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
