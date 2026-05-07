import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS, getBadgeClass } from '../data/exercises'
import { useNavigate } from 'react-router-dom'

const FOCUS_COLORS = {
  'Empuje superior':   '#F97316',
  'Tirón + Bíceps':    '#4589FF',
  'Piernas + Glúteos': '#F59E0B',
  'Movilidad activa':  '#A78BFA',
  'Fuerza total':      '#22C55E',
  'Descanso total':    '#A78BFA',
}

function ProgressArc({ value, size = 40, stroke = 3 }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(1, Math.max(0, value))
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="var(--border2)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={pct >= 1 ? 'var(--success)' : 'var(--accent)'}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
      />
    </svg>
  )
}

export default function WeekScreen() {
  const { user } = useAuth()
  const { isDone, toggle, dayProgress } = useProgress(user)
  const navigate = useNavigate()

  const totalDone = DAYS.reduce((acc, d, i) => acc + d.exercises.filter((_, j) => isDone(i, j)).length, 0)
  const totalEx = DAYS.reduce((acc, d) => acc + d.exercises.length, 0)
  const weekPct = totalEx > 0 ? totalDone / totalEx : 0

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        padding: '16px 16px 14px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '1.6rem',
              letterSpacing: '0.03em', color: 'var(--text)', lineHeight: 1
            }}>
              SEMANA
            </h1>
            <p style={{ fontSize: '0.76rem', color: 'var(--muted)', marginTop: '3px' }}>
              {totalDone} de {totalEx} ejercicios completados
            </p>
          </div>
          {/* Week progress ring */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ProgressArc value={weekPct} size={48} stroke={3.5} />
            <span style={{
              position: 'absolute',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '0.72rem',
              color: weekPct >= 1 ? 'var(--success)' : 'var(--accent)'
            }}>
              {Math.round(weekPct * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {DAYS.map((day, dIdx) => {
          const progress = dayProgress(dIdx, day.exercises.length)
          const doneCount = day.exercises.filter((_, i) => isDone(dIdx, i)).length
          const accent = FOCUS_COLORS[day.focus] ?? 'var(--accent)'
          const allDone = day.exercises.length > 0 && doneCount === day.exercises.length

          return (
            <div key={dIdx} style={{
              background: 'var(--card)',
              border: `1px solid ${allDone ? 'rgba(31,209,106,0.2)' : 'var(--border)'}`,
              borderRadius: 'var(--r2)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Left color bar */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: day.rest ? '#A78BFA' : allDone ? 'var(--success)' : accent,
                borderRadius: '18px 0 0 18px'
              }} />

              {/* Day header */}
              <div style={{
                padding: '12px 14px 12px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
                borderBottom: (day.rest || day.exercises.length === 0) ? 'none' : '1px solid var(--border)'
              }}>
                {/* Day label badge */}
                <div style={{
                  width: 34, height: 34, borderRadius: '10px',
                  background: day.rest ? 'rgba(167,139,250,0.12)' : `${accent}15`,
                  border: `1px solid ${day.rest ? 'rgba(167,139,250,0.2)' : `${accent}30`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: '0.82rem',
                    color: day.rest ? '#A78BFA' : accent
                  }}>
                    {day.label}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: '0.96rem', color: 'var(--text)', lineHeight: 1
                  }}>
                    {day.name}
                  </div>
                  <div style={{
                    fontSize: '0.73rem',
                    color: day.rest ? 'var(--purple)' : 'var(--muted)',
                    marginTop: '2px'
                  }}>
                    {day.focus}
                  </div>
                </div>

                {!day.rest && day.exercises.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: '0.84rem',
                      color: allDone ? 'var(--success)' : 'var(--muted)'
                    }}>
                      {doneCount}/{day.exercises.length}
                    </span>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ProgressArc value={progress} size={32} stroke={2.5} />
                      {allDone && (
                        <svg style={{ position: 'absolute' }} width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Exercises list */}
              {!day.rest && day.exercises.length > 0 && (
                <div style={{ padding: '8px 12px 10px 14px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {day.exercises.map((ex, eIdx) => {
                    const done = isDone(dIdx, eIdx)
                    return (
                      <div
                        key={eIdx}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '8px 10px',
                          background: done ? 'rgba(31,209,106,0.04)' : 'var(--card2)',
                          borderRadius: 'var(--r)',
                          border: `1px solid ${done ? 'rgba(31,209,106,0.15)' : 'var(--border)'}`,
                          cursor: 'pointer', transition: 'background 0.15s'
                        }}
                        onClick={() => navigate(`/ejercicio/${dIdx}/${eIdx}`)}
                      >
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
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4l2.5 2.5L9 1" stroke="#0C0D0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>

                        <span style={{
                          flex: 1, fontSize: '0.83rem', fontWeight: 500,
                          color: done ? 'var(--muted)' : 'var(--text)',
                          textDecoration: done ? 'line-through' : 'none',
                          textDecorationColor: 'var(--muted)'
                        }}>
                          {ex.name}
                        </span>

                        <span className={getBadgeClass(ex.badge)} style={{ fontSize: '0.6rem' }}>
                          {ex.badge}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {day.rest && (
                <div style={{ padding: '4px 16px 12px' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>{day.note}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
