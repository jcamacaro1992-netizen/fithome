import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS, getBadgeClass } from '../data/exercises'
import { getVideoData } from '../data/videos'
import NavHeader from '../components/NavHeader'
import AutoVideoPlayer from '../components/AutoVideoPlayer'

function ReferenceImages({ exerciseName }) {
  const { candidates } = getVideoData(exerciseName)
  const [failed, setFailed] = useState({})
  const ids = [candidates[0], candidates[1] || candidates[0], candidates[2] || candidates[0]]
  const LABELS = ['Inicio', 'Medio', 'Final']
  if (!candidates[0]) return null
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', padding: '16px 20px' }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: '12px' }}>
        Referencia visual
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {ids.map((id, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg)' }}>
              {failed[i] ? (
                <div style={{ aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4a8 8 0 100 16A8 8 0 0012 4zM9.5 8.5l6 3.5-6 3.5V8.5z" fill="rgba(239,68,68,0.5)"/></svg>
                </div>
              ) : (
                <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt={LABELS[i]}
                  onError={() => setFailed(f => ({ ...f, [i]: true }))}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              )}
            </a>
            <span style={{ textAlign: 'center', fontSize: '0.62rem', color: 'var(--muted)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {LABELS[i]}
            </span>
          </div>
        ))}
      </div>
      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent('sergio orduz ' + exerciseName)}`}
        target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 12px', borderRadius: '10px', background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.15)', textDecoration: 'none' }}>
        <div style={{ background: '#FF0000', borderRadius: '4px', width: 26, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="9" height="8" viewBox="0 0 9 8" fill="white"><path d="M3.5 6V2l4 2-4 2z"/></svg>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text2)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>
          Buscar en YouTube: @sergioorduz
        </span>
      </a>
    </div>
  )
}

export default function DetailScreen() {
  const { dayIdx, exIdx } = useParams()
  const dIdx = parseInt(dayIdx)
  const eIdx = parseInt(exIdx)
  const navigate = useNavigate()

  const { user } = useAuth()
  const { isDone, toggle } = useProgress(user)
  const day = DAYS[dIdx]
  const exercise = day?.exercises[eIdx]

  if (!exercise) {
    return (
      <div style={{ padding: '32px', color: 'var(--text2)', textAlign: 'center' }}>
        Ejercicio no encontrado.
      </div>
    )
  }

  const done = isDone(dIdx, eIdx)

  return (
    <div className="screen">
      <NavHeader title={exercise.name} badge={exercise.badge} />

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Hero info */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--text)',
                letterSpacing: '0.02em',
                marginBottom: '4px'
              }}>
                {exercise.name}
              </h1>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'var(--accent)'
              }}>
                {exercise.sets}
              </span>
            </div>
            <span className={getBadgeClass(exercise.badge)}>{exercise.badge}</span>
          </div>

          {/* Muscles */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            background: 'var(--card2)',
            borderRadius: 'var(--r)',
            border: '1px solid var(--border)'
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M7 2C4.5 2 2.5 4 2.5 7.5C2.5 9.5 3.5 11 5 12H9C10.5 11 11.5 9.5 11.5 7.5C11.5 4 9.5 2 7 2Z"
                stroke="var(--blue)" strokeWidth="1.4"/>
              <path d="M7 5v4M5 7h4" stroke="var(--blue)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.4 }}>
              {exercise.muscles}
            </span>
          </div>

          {/* Mark done button */}
          <button
            onClick={() => toggle(dIdx, eIdx)}
            style={{
              marginTop: '14px',
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--r)',
              border: done ? '1.5px solid var(--success)' : '1.5px solid var(--accent)',
              background: done ? 'rgba(31,209,106,0.1)' : 'var(--accent)',
              color: done ? 'var(--success)' : '#0C0D0F',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.03em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            {done ? (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke="#1FD16A" strokeWidth="1.5"/>
                  <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#1FD16A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Completado — desmarcar
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke="#0C0D0F" strokeWidth="1.5"/>
                  <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#0C0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Marcar como completado
              </>
            )}
          </button>
        </div>

        {/* Reference images */}
        <ReferenceImages exerciseName={exercise.name} />

        {/* Steps */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r2)',
          padding: '20px'
        }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text2)',
            marginBottom: '14px'
          }}>
            Ejecución
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {exercise.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 26, height: 26,
                  borderRadius: '8px',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-glow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: 'var(--accent)'
                  }}>
                    {i + 1}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.6, flex: 1 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
