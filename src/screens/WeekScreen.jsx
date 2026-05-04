import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS, getBadgeClass } from '../data/exercises'
import ProgressBar from '../components/ProgressBar'
import RestDay from '../components/RestDay'
import { useNavigate } from 'react-router-dom'

export default function WeekScreen() {
  const { user } = useAuth()
  const { isDone, toggle, dayProgress } = useProgress(user)
  const navigate = useNavigate()

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
          fontWeight: 800,
          fontSize: '1.5rem',
          letterSpacing: '0.03em',
          color: 'var(--text)'
        }}>
          Semana completa
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
          {DAYS.reduce((acc, d, i) => acc + d.exercises.filter((_, j) => isDone(i, j)).length, 0)} /{' '}
          {DAYS.reduce((acc, d) => acc + d.exercises.length, 0)} ejercicios
        </p>
      </div>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {DAYS.map((day, dIdx) => {
          const progress = dayProgress(dIdx, day.exercises.length)
          const doneCount = day.exercises.filter((_, i) => isDone(dIdx, i)).length

          return (
            <div key={dIdx} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r2)',
              overflow: 'hidden'
            }}>
              {/* Day header */}
              <div style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: day.rest ? 'none' : '1px solid var(--border)'
              }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: '10px',
                  background: day.rest ? 'rgba(167,139,250,0.12)' : 'var(--accent-dim)',
                  border: `1px solid ${day.rest ? 'rgba(167,139,250,0.2)' : 'var(--accent-glow)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    color: day.rest ? '#A78BFA' : 'var(--accent)'
                  }}>
                    {day.label}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--text)'
                  }}>
                    {day.name}
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '0.82rem',
                      color: day.rest ? 'var(--purple)' : 'var(--text2)',
                      fontWeight: 500
                    }}>
                      · {day.focus}
                    </span>
                  </div>

                  {!day.rest && (
                    <div style={{ marginTop: '6px' }}>
                      <ProgressBar
                        value={progress}
                        color={progress >= 1 ? 'var(--success)' : 'var(--accent)'}
                        height={4}
                      />
                    </div>
                  )}
                </div>

                {!day.rest && (
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: progress >= 1 ? 'var(--success)' : 'var(--muted)'
                  }}>
                    {doneCount}/{day.exercises.length}
                  </span>
                )}
              </div>

              {/* Exercises */}
              {day.rest ? (
                <div style={{ padding: '10px 16px 14px' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{day.note}</p>
                </div>
              ) : (
                <div style={{ padding: '8px 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {day.exercises.map((ex, eIdx) => {
                    const done = isDone(dIdx, eIdx)
                    return (
                      <div
                        key={eIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 10px',
                          background: done ? 'rgba(31,209,106,0.05)' : 'var(--card2)',
                          borderRadius: 'var(--r)',
                          border: `1px solid ${done ? 'rgba(31,209,106,0.15)' : 'var(--border)'}`,
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/ejercicio/${dIdx}/${eIdx}`)}
                      >
                        {/* Check */}
                        <button
                          onClick={e => { e.stopPropagation(); toggle(dIdx, eIdx) }}
                          style={{
                            width: 22, height: 22, borderRadius: '50%',
                            border: done ? '2px solid var(--success)' : '2px solid var(--border2)',
                            background: done ? 'var(--success)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s'
                          }}
                        >
                          {done && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="#0C0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>

                        <span style={{
                          flex: 1,
                          fontSize: '0.84rem',
                          color: done ? 'var(--muted)' : 'var(--text)',
                          textDecoration: done ? 'line-through' : 'none',
                          fontWeight: 500
                        }}>
                          {ex.name}
                        </span>

                        <span className={getBadgeClass(ex.badge)} style={{ fontSize: '0.62rem' }}>
                          {ex.badge}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
