import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS } from '../data/exercises'
import { FOCUS_COLORS } from '../data/focusColors'
import ExerciseRow from '../components/ExerciseRow'
import RestDay from '../components/RestDay'

const JS_DAY_TO_IDX = [6, 0, 1, 2, 3, 4, 5]

// ─── mini SVG ring ────────────────────────────────────────────────────────────
function ProgressRing({ value, size = 54, stroke = 4, color }) {
  const r    = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const pct  = Math.min(1, Math.max(0, value))
  const col  = color ?? (pct >= 1 ? 'var(--success)' : 'var(--accent)')
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border2)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={col} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  )
}

// ─── stat pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label, color }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 2, padding: '8px 4px',
      background: `${color}0D`,
      border: `1px solid ${color}22`,
      borderRadius: 10
    }}>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800, fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
        color, lineHeight: 1
      }}>{value}</span>
      <span style={{ fontSize: 'clamp(0.6rem, 2vw, 0.68rem)', color: 'var(--muted)', letterSpacing: '0.04em' }}>
        {label}
      </span>
    </div>
  )
}

// ─── day chip ─────────────────────────────────────────────────────────────────
function DayChip({ day, dayIdx, selectedIdx, todayIdx, progress, onClick }) {
  const active   = selectedIdx === dayIdx
  const isToday  = dayIdx === todayIdx
  const done     = progress >= 1 && day.exercises.length > 0
  const theme    = FOCUS_COLORS[day.focus] ?? { color: 'var(--accent)' }
  const chipColor = day.rest ? '#A78BFA' : theme.color

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 4, padding: '7px 2px 8px',
        background: active ? `${chipColor}14` : 'transparent',
        border: 'none',
        borderBottom: active ? `2.5px solid ${chipColor}` : `2.5px solid transparent`,
        cursor: 'pointer', transition: 'all 0.15s',
        position: 'relative'
      }}
    >
      {isToday && !active && (
        <div style={{
          position: 'absolute', top: 5, right: '50%', transform: 'translateX(8px)',
          width: 5, height: 5, borderRadius: '50%',
          background: chipColor, opacity: 0.6
        }} />
      )}
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: active ? 800 : 600,
        fontSize: 'clamp(0.68rem, 2.4vw, 0.82rem)',
        letterSpacing: '0.03em', textTransform: 'uppercase',
        color: active ? chipColor : isToday ? 'var(--text)' : 'var(--muted)',
        lineHeight: 1
      }}>{day.label}</span>
      <div style={{
        width: 'clamp(4px, 1.2vw, 6px)', height: 'clamp(4px, 1.2vw, 6px)',
        borderRadius: '50%',
        background: done
          ? 'var(--success)'
          : day.rest
            ? 'rgba(167,139,250,0.35)'
            : active
              ? chipColor
              : 'var(--faint)'
      }} />
    </button>
  )
}

// ─── main screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { user }  = useAuth()
  const { toggle, isDone, dayProgress } = useProgress(user)

  const jsDay     = new Date().getDay()
  const todayIdx  = JS_DAY_TO_IDX[jsDay]
  const [selectedIdx, setSelectedIdx] = useState(todayIdx)
  const [expandedEx, setExpandedEx]   = useState(null)

  const day        = DAYS[selectedIdx]
  const isToday    = selectedIdx === todayIdx
  const theme      = FOCUS_COLORS[day.focus] ?? { color: 'var(--accent)', bg: 'rgba(69,137,255,0.08)' }
  const accentColor = day.rest ? '#A78BFA' : theme.color

  const doneCount  = day.exercises.filter((_, i) => isDone(selectedIdx, i)).length
  const totalCount = day.exercises.length
  const progress   = totalCount > 0 ? doneCount / totalCount : 0
  const allDone    = totalCount > 0 && doneCount === totalCount

  const today     = new Date()
  const dayName   = today.toLocaleDateString('es-ES', { weekday: 'long' })
  const dateLabel = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })

  const totalSets = day.exercises.reduce((acc, ex) => {
    const m = ex.sets.match(/(\d+)[×x]/)
    return acc + (m ? parseInt(m[1]) : 3)
  }, 0)

  const uniqueMuscles = [...new Set(day.exercises.map(e => e.badge))].slice(0, 3)

  function handleExpand(i) { setExpandedEx(prev => prev === i ? null : i) }
  function selectDay(i) { setSelectedIdx(i); setExpandedEx(null) }

  return (
    <div className="screen">

      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)' }}>

        {/* Top accent gradient bar */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}88 60%, transparent 100%)`
        }} />

        {/* Title row */}
        <div style={{
          padding: 'clamp(10px,3vw,16px) clamp(12px,4vw,18px) clamp(8px,2vw,10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10
        }}>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.5rem, 5.5vw, 1.85rem)',
              letterSpacing: '0.06em', color: 'var(--text)', lineHeight: 1
            }}>FITHOME</div>
            <div style={{
              fontSize: 'clamp(0.66rem, 2.2vw, 0.76rem)',
              color: 'var(--muted)', marginTop: 3, textTransform: 'capitalize',
              letterSpacing: '0.02em'
            }}>{dayName} · {dateLabel}</div>
          </div>

          {/* Progress ring — only when training day is selected */}
          {!day.rest && (
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <ProgressRing value={progress} size={48} stroke={3.5} color={accentColor} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 0
              }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: allDone ? '0.58rem' : '0.82rem',
                  color: allDone ? 'var(--success)' : accentColor, lineHeight: 1
                }}>
                  {allDone ? '✓' : doneCount}
                </span>
                {!allDone && (
                  <span style={{ fontSize: '0.56rem', color: 'var(--muted)', lineHeight: 1 }}>
                    /{totalCount}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Day selector */}
        <div style={{
          display: 'flex',
          padding: '0 clamp(6px,2vw,10px)',
          borderBottom: '1px solid var(--border)'
        }}>
          {DAYS.map((d, i) => (
            <DayChip
              key={i}
              day={d}
              dayIdx={i}
              selectedIdx={selectedIdx}
              todayIdx={todayIdx}
              progress={dayProgress(i, d.exercises.length)}
              onClick={() => selectDay(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div style={{
        padding: 'clamp(10px,3vw,14px) clamp(10px,3vw,14px) 28px',
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(8px,2.5vw,12px)'
      }}>

        {/* ── Hero card ── */}
        <div style={{
          background: 'var(--card)',
          border: `1px solid ${accentColor}20`,
          borderRadius: 'var(--r2)',
          overflow: 'hidden',
          display: 'flex'
        }}>
          {/* Left accent bar */}
          <div style={{ width: 4, flexShrink: 0, background: accentColor }} />

          <div style={{ flex: 1, minWidth: 0, padding: 'clamp(12px,3vw,16px)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Label row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  {isToday && !day.rest && (
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.08em',
                      color: accentColor, background: `${accentColor}18`,
                      border: `1px solid ${accentColor}30`,
                      borderRadius: 5, padding: '2px 6px'
                    }}>HOY</span>
                  )}
                  {day.rest && (
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.08em',
                      color: '#A78BFA', background: 'rgba(167,139,250,0.1)',
                      border: '1px solid rgba(167,139,250,0.2)',
                      borderRadius: 5, padding: '2px 6px'
                    }}>DESCANSO</span>
                  )}
                  <span style={{ fontSize: '0.67rem', color: 'var(--muted)' }}>
                    {day.name}
                  </span>
                </div>

                {/* Focus title */}
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.15rem, 4.5vw, 1.45rem)',
                  color: 'var(--text)', lineHeight: 1.05,
                  letterSpacing: '0.01em'
                }}>{day.focus}</div>

                {/* Note */}
                <div style={{
                  fontSize: 'clamp(0.7rem, 2.2vw, 0.76rem)',
                  color: 'var(--muted)', marginTop: 6, lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>{day.note}</div>
              </div>

              {/* Decorative accent square */}
              {!day.rest && (
                <div style={{
                  width: 'clamp(38px,10vw,48px)', height: 'clamp(38px,10vw,48px)',
                  borderRadius: 12, flexShrink: 0,
                  background: `${accentColor}15`,
                  border: `1px solid ${accentColor}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="8" width="6" height="11" rx="2" stroke={accentColor} strokeWidth="1.6"/>
                    <rect x="8" y="4" width="6" height="15" rx="2" stroke={accentColor} strokeWidth="1.6"/>
                    <rect x="13" y="6" width="6" height="13" rx="2" stroke={accentColor} strokeWidth="1.6"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Stat pills row */}
            {!day.rest && (
              <div style={{ display: 'flex', gap: 6, marginTop: 'clamp(10px,2.5vw,14px)' }}>
                <StatPill value={totalCount} label="ejercicios" color={accentColor} />
                <StatPill value={totalSets}  label="series tot." color={accentColor} />
                {uniqueMuscles.length > 0 && (
                  <div style={{
                    flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', gap: 3, padding: '7px 6px',
                    background: `${accentColor}0D`, border: `1px solid ${accentColor}22`,
                    borderRadius: 10
                  }}>
                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {uniqueMuscles.map(m => (
                        <span key={m} style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700, fontSize: 'clamp(0.56rem, 1.8vw, 0.66rem)',
                          color: accentColor, letterSpacing: '0.04em'
                        }}>{m}</span>
                      ))}
                    </div>
                    <span style={{ fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)', color: 'var(--muted)' }}>músculos</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── All done banner ── */}
        {allDone && (
          <div style={{
            background: 'rgba(34,197,94,0.07)',
            border: '1px solid rgba(34,197,94,0.22)',
            borderRadius: 'var(--r)',
            padding: 'clamp(10px,3vw,14px)',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(34,197,94,0.12)', border: '1.5px solid #22C55E',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M1 6l4.5 4.5L15 1" stroke="#22C55E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: 'clamp(0.9rem, 3vw, 1rem)', color: 'var(--success)'
              }}>¡Día completado!</div>
              <div style={{ fontSize: 'clamp(0.68rem, 2vw, 0.74rem)', color: 'var(--muted)', marginTop: 2 }}>
                {doneCount} ejercicios terminados. Excelente trabajo.
              </div>
            </div>
          </div>
        )}

        {/* ── Section header ── */}
        {!day.rest && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.7rem',
              letterSpacing: '0.09em', textTransform: 'uppercase',
              color: 'var(--muted)', flexShrink: 0
            }}>EJERCICIOS</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.7rem', color: 'var(--muted)', flexShrink: 0
            }}>{doneCount}/{totalCount}</span>
          </div>
        )}

        {/* ── Exercises or rest ── */}
        {day.rest ? (
          <RestDay dayName={day.name} note={day.note} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px,1.5vw,8px)' }}>
            {day.exercises.map((ex, i) => (
              <ExerciseRow
                key={i}
                exercise={ex}
                dayIdx={selectedIdx}
                exIdx={i}
                done={isDone(selectedIdx, i)}
                onToggle={toggle}
                expanded={expandedEx === i}
                onExpand={() => handleExpand(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
