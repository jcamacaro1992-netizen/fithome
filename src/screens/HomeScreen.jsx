import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS } from '../data/exercises'
import ExerciseRow from '../components/ExerciseRow'
import RestDay from '../components/RestDay'

const JS_DAY_TO_IDX = [6, 0, 1, 2, 3, 4, 5]

const FOCUS_COLORS = {
  'Empuje superior': { color: '#FF6B2B', bg: 'rgba(255,107,43,0.1)' },
  'Tirón + Bíceps':  { color: '#4C9EFF', bg: 'rgba(76,158,255,0.1)' },
  'Piernas + Glúteos': { color: '#F5C518', bg: 'rgba(245,197,24,0.1)' },
  'Movilidad activa': { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
  'Fuerza total':    { color: '#C6F135', bg: 'rgba(198,241,53,0.1)' },
  'Descanso total':  { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
}

function ProgressRing({ value, size = 44, stroke = 3.5 }) {
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
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  )
}

export default function HomeScreen() {
  const { user } = useAuth()
  const { toggle, isDone, dayProgress } = useProgress(user)

  const jsDay = new Date().getDay()
  const todayIdx = JS_DAY_TO_IDX[jsDay]
  const [selectedIdx, setSelectedIdx] = useState(todayIdx)
  const [expandedEx, setExpandedEx] = useState(null)

  const day = DAYS[selectedIdx]
  const doneCount = day.exercises.filter((_, i) => isDone(selectedIdx, i)).length
  const totalCount = day.exercises.length
  const progress = totalCount > 0 ? doneCount / totalCount : 0
  const allDone = totalCount > 0 && doneCount === totalCount
  const isToday = selectedIdx === todayIdx

  const focusTheme = FOCUS_COLORS[day.focus] ?? { color: 'var(--accent)', bg: 'var(--accent-dim)' }

  const today = new Date()
  const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' })
  const dateLabel = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })

  function handleExpand(i) {
    setExpandedEx(prev => prev === i ? null : i)
  }

  return (
    <div className="screen">
      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Top row */}
        <div style={{
          padding: '16px 16px 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '1.75rem',
              letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1
            }}>
              ENTRENAMIENTO
            </div>
            <div style={{
              marginTop: '3px',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 500, fontSize: '0.78rem',
              letterSpacing: '0.04em',
              color: 'var(--muted)',
              textTransform: 'capitalize'
            }}>
              {dayName} · {dateLabel}
            </div>
          </div>

          {/* Progress ring for selected day */}
          {!day.rest && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ProgressRing value={progress} size={46} stroke={3.5} />
              <span style={{
                position: 'absolute',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: '0.75rem',
                color: allDone ? 'var(--success)' : 'var(--accent)'
              }}>
                {doneCount}/{totalCount}
              </span>
            </div>
          )}
        </div>

        {/* Day chips */}
        <div style={{
          display: 'flex', gap: '4px',
          padding: '0 12px 12px',
          overflowX: 'auto', scrollbarWidth: 'none'
        }}>
          {DAYS.map((d, i) => {
            const active = selectedIdx === i
            const isTodayChip = i === todayIdx
            const prog = dayProgress(i, d.exercises.length)
            const done = prog >= 1 && d.exercises.length > 0

            return (
              <button
                key={i}
                onClick={() => { setSelectedIdx(i); setExpandedEx(null) }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                  padding: '7px 11px',
                  borderRadius: '12px',
                  border: active ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                  background: active ? 'var(--accent-dim)' : isTodayChip ? 'rgba(255,255,255,0.04)' : 'transparent',
                  cursor: 'pointer', minWidth: '42px',
                  transition: 'all 0.15s'
                }}
              >
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.8rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  color: active ? 'var(--accent)' : d.rest ? 'var(--purple)' : isTodayChip ? 'var(--text)' : 'var(--muted)'
                }}>
                  {d.label}
                </span>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: done ? 'var(--success)' : d.rest ? 'rgba(167,139,250,0.4)' : active ? 'var(--accent)' : 'var(--faint)'
                }} />
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Day summary card */}
        <div style={{
          background: focusTheme.bg,
          border: `1px solid ${focusTheme.color}22`,
          borderRadius: 'var(--r2)',
          padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: `${focusTheme.color}18`,
            border: `1px solid ${focusTheme.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '0.82rem', color: focusTheme.color
            }}>
              {day.label}
            </span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              color: 'var(--text)', lineHeight: 1
            }}>
              {day.focus}
            </div>
            <div style={{
              fontSize: '0.74rem', color: 'var(--muted)', marginTop: '3px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>
              {day.note}
            </div>
          </div>
          {!day.rest && isToday && (
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.68rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: focusTheme.color,
              background: `${focusTheme.color}18`,
              padding: '3px 8px', borderRadius: '6px',
              border: `1px solid ${focusTheme.color}30`,
              flexShrink: 0
            }}>
              HOY
            </span>
          )}
        </div>

        {/* Completed banner */}
        {allDone && (
          <div style={{
            background: 'rgba(31,209,106,0.08)',
            border: '1px solid rgba(31,209,106,0.25)',
            borderRadius: 'var(--r)',
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(31,209,106,0.15)',
              border: '1.5px solid #1FD16A',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path d="M1 5l3.5 3.5L12 1" stroke="#1FD16A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.92rem', color: 'var(--success)' }}>
                ¡Día completado!
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                Excelente trabajo. A descansar.
              </div>
            </div>
          </div>
        )}

        {/* Exercises or rest */}
        {day.rest ? (
          <RestDay dayName={day.name} note={day.note} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
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
