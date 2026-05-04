import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { DAYS } from '../data/exercises'
import ExerciseRow from '../components/ExerciseRow'
import RestDay from '../components/RestDay'

const JS_DAY_TO_IDX = [6, 0, 1, 2, 3, 4, 5] // JS Sun=0 → nuestro índice

export default function HomeScreen() {
  const { user } = useAuth()
  const { toggle, isDone, dayProgress } = useProgress(user)

  const jsDay = new Date().getDay()
  const todayIdx = JS_DAY_TO_IDX[jsDay]
  const [selectedIdx, setSelectedIdx] = useState(todayIdx)
  const [expandedEx, setExpandedEx] = useState(null)

  const day = DAYS[selectedIdx]
  const doneCount = day.exercises.filter((_, i) => isDone(selectedIdx, i)).length
  const allDone = day.exercises.length > 0 && doneCount === day.exercises.length

  const today = new Date()
  const dateLabel = today.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).toUpperCase()

  function handleExpand(i) {
    setExpandedEx(prev => prev === i ? null : i)
  }

  return (
    <div className="screen">
      {/* Header */}
      <div style={{
        padding: '18px 16px 14px',
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: '2rem',
            letterSpacing: '0.04em',
            color: 'var(--text)',
            lineHeight: 1
          }}>
            ENTRENAMIENTO
          </h1>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.06em',
            color: 'var(--muted)'
          }}>
            {dateLabel}
          </span>
        </div>

        {/* Day chips */}
        <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {DAYS.map((d, i) => {
            const active = selectedIdx === i
            const isToday = i === todayIdx
            const prog = dayProgress(i, d.exercises.length)
            const done = prog >= 1 && d.exercises.length > 0

            return (
              <button
                key={i}
                onClick={() => { setSelectedIdx(i); setExpandedEx(null) }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  border: active ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                  background: active ? 'var(--accent-dim)' : 'transparent',
                  cursor: 'pointer',
                  minWidth: '40px',
                  transition: 'all 0.15s'
                }}
              >
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--accent)' : d.rest ? 'var(--purple)' : isToday ? 'var(--text)' : 'var(--muted)'
                }}>
                  {d.label}
                </span>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: done
                    ? 'var(--success)'
                    : d.rest
                      ? 'rgba(167,139,250,0.4)'
                      : active
                        ? 'var(--accent)'
                        : 'var(--faint)'
                }}/>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Day label + progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <div>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--muted)'
            }}>
              {day.rest ? 'Descanso' : 'Ejercicios del día'}
            </span>
            {!day.rest && (
              <span style={{
                marginLeft: '8px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '0.72rem',
                color: day.rest ? 'var(--purple)' : 'var(--accent)'
              }}>
                · {day.focus}
              </span>
            )}
          </div>
          {!day.rest && (
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              color: allDone ? 'var(--success)' : 'var(--muted)'
            }}>
              {doneCount}/{day.exercises.length}
            </span>
          )}
        </div>

        {/* Completed banner */}
        {allDone && (
          <div style={{
            background: 'rgba(31,209,106,0.08)',
            border: '1px solid rgba(31,209,106,0.2)',
            borderRadius: 'var(--r)',
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="rgba(31,209,106,0.15)" stroke="#1FD16A" strokeWidth="1.5"/>
              <path d="M6.5 10l2.5 2.5 4.5-5" stroke="#1FD16A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.92rem', color: 'var(--success)' }}>
              ¡Día completado! Excelente trabajo.
            </span>
          </div>
        )}

        {/* Exercises or rest */}
        {day.rest ? (
          <RestDay dayName={day.name} note={day.note} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
