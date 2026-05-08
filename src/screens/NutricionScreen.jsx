import { useState, useMemo } from 'react'
import { DAYS } from '../data/exercises'
import {
  MACRO_TARGETS, DAY_PLAN, LUNCH_LABEL,
  getMealsForDay, WATER_GLASSES, MEAL_PREP_GUIDE, SHOPPING_LIST
} from '../data/nutrition'
import { useApp } from '../contexts/AppContext'
import { useNutritionLog, useShoppingList } from '../hooks/useNutritionLog'

// ─── helpers ─────────────────────────────────────────────────────────────────
const JS_DAY_TO_IDX = [6, 0, 1, 2, 3, 4, 5]

function todayDayIdx() { return JS_DAY_TO_IDX[new Date().getDay()] }

// ─── macro bar ───────────────────────────────────────────────────────────────
function MacroBar({ label, eaten, target, unit, color }) {
  const pct = Math.min(1, eaten / target)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text)', fontWeight: 700 }}>
          {eaten}<span style={{ color: 'var(--muted)', fontWeight: 400 }}>/{target}{unit}</span>
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: 'var(--border2)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${pct * 100}%`,
          background: pct >= 1 ? 'var(--success)' : color,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  )
}

// ─── meal card ───────────────────────────────────────────────────────────────
function MealCard({ meal, eaten, onToggle }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      background: 'var(--card)',
      border: `1px solid ${eaten ? 'rgba(31,209,106,0.25)' : 'var(--border)'}`,
      borderRadius: 'var(--r2)', overflow: 'hidden', transition: 'border-color 0.2s'
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          gap: 10, padding: '11px 12px',
          background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>{meal.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.1
            }}>{meal.label}</span>
            <span style={{ fontSize: '0.66rem', color: 'var(--muted)' }}>{meal.time}</span>
            {meal.mealPrep && (
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em',
                color: '#F59E0B', background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 4, padding: '1px 5px'
              }}>MEAL PREP</span>
            )}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 2, lineHeight: 1.2 }}>
            {meal.name}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
            color: eaten ? 'var(--success)' : 'var(--muted)'
          }}>{meal.macros.kcal} kcal</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
            <path d="M3 5l4 4 4-4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Macro pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { label: 'Proteína', val: meal.macros.protein, color: '#4589FF' },
              { label: 'Carbos',   val: meal.macros.carbs,   color: '#F59E0B' },
              { label: 'Grasa',    val: meal.macros.fat,     color: '#A78BFA' },
            ].map(m => (
              <div key={m.label} style={{
                background: `${m.color}15`, border: `1px solid ${m.color}30`,
                borderRadius: 6, padding: '3px 8px',
                display: 'flex', alignItems: 'center', gap: 4
              }}>
                <span style={{ fontSize: '0.68rem', color: m.color, fontWeight: 700 }}>{m.val}g</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{m.label}</span>
              </div>
            ))}
            <div style={{
              background: 'rgba(141,163,190,0.08)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '3px 8px'
            }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 700 }}>⏱ {meal.prepTime} min</span>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
              Ingredientes
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {meal.ingredients.map((ing, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text)' }}>{ing.item}</span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                    {ing.amount}{ing.unit ? ` ${ing.unit}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
              Preparación
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {meal.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: '0.72rem',
                    color: 'var(--accent)', minWidth: 16, marginTop: 1
                  }}>{i + 1}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.45, flex: 1 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mark eaten */}
          <button
            onClick={() => onToggle(meal.id)}
            style={{
              width: '100%', padding: '10px 0',
              borderRadius: 'var(--r)',
              border: `1.5px solid ${eaten ? 'var(--success)' : 'var(--border2)'}`,
              background: eaten ? 'rgba(31,209,106,0.08)' : 'transparent',
              color: eaten ? 'var(--success)' : 'var(--muted)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.04em',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 6, transition: 'all 0.2s'
            }}
          >
            {eaten ? (
              <>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5.5l3.5 3.5L13 1" stroke="var(--success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                COMPLETADO
              </>
            ) : 'MARCAR COMO COMIDO'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── water tracker ────────────────────────────────────────────────────────────
function WaterTracker({ glasses, setGlasses }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r2)', padding: '12px 14px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>Agua</span>
        <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
          {glasses}/{WATER_GLASSES} vasos · {glasses * 250} ml
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {Array.from({ length: WATER_GLASSES }, (_, i) => {
          const filled = i < glasses
          return (
            <button
              key={i}
              onClick={() => setGlasses(glasses === i + 1 ? i : i + 1)}
              style={{
                width: 32, height: 38, borderRadius: 6,
                border: `1.5px solid ${filled ? '#38BDF8' : 'var(--border2)'}`,
                background: filled ? 'rgba(56,189,248,0.12)' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', transition: 'all 0.15s'
              }}
            >
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                <path d="M2 4l1 12a2 2 0 002 2h2a2 2 0 002-2L10 4H2z"
                  stroke={filled ? '#38BDF8' : 'var(--muted)'}
                  fill={filled ? 'rgba(56,189,248,0.3)' : 'none'}
                  strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M1 4h12" stroke={filled ? '#38BDF8' : 'var(--muted)'} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── HOY tab ─────────────────────────────────────────────────────────────────
function TabHoy() {
  const dayIdx  = todayDayIdx()
  const plan    = DAY_PLAN[dayIdx]
  const type    = plan.type
  const targets = MACRO_TARGETS[type]
  const meals   = getMealsForDay(dayIdx)
  const isDom   = dayIdx === 6

  const { profile, tenant } = useApp()
  const { eatenIds, glasses, toggleMeal, setWater } = useNutritionLog(profile?.id, tenant?.id)

  const eaten = useMemo(() => meals
    .filter(m => eatenIds.includes(m.id))
    .reduce((acc, m) => ({
      kcal:    acc.kcal    + m.macros.kcal,
      protein: acc.protein + m.macros.protein,
      carbs:   acc.carbs   + m.macros.carbs,
      fat:     acc.fat     + m.macros.fat,
    }), { kcal: 0, protein: 0, carbs: 0, fat: 0 }),
  [eatenIds, meals])

  return (
    <div style={{ padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* Day type banner */}
      <div style={{
        background: `${targets.color}12`,
        border: `1px solid ${targets.color}30`,
        borderRadius: 'var(--r2)', padding: '12px 14px',
        display: 'flex', alignItems: 'flex-start', gap: 10
      }}>
        <div style={{ width: 4, borderRadius: 99, alignSelf: 'stretch', background: targets.color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: '1rem', color: targets.color, lineHeight: 1
          }}>{targets.label.toUpperCase()}</div>
          {plan.lunch && (
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 3 }}>
              Almuerzo: <span style={{ color: '#F59E0B', fontWeight: 600 }}>{LUNCH_LABEL[plan.lunch]}</span>
              {'  ·  '}
              Cena: <span style={{ color: targets.color, fontWeight: 600 }}>Menú {plan.dinner}</span>
            </div>
          )}
          <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>
            {targets.note}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: '1.5rem', color: targets.color, lineHeight: 1
          }}>{targets.kcal}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>kcal objetivo</div>
        </div>
      </div>

      {/* Macro summary */}
      {!isDom && (
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r2)', padding: '12px 14px',
          display: 'flex', flexDirection: 'column', gap: 8
        }}>
          <MacroBar label="Calorías" eaten={eaten.kcal}    target={targets.kcal}    unit=" kcal" color={targets.color} />
          <MacroBar label="Proteína" eaten={eaten.protein} target={targets.protein} unit="g"     color="#4589FF" />
          <MacroBar label="Carbos"   eaten={eaten.carbs}   target={targets.carbs}   unit="g"     color="#F59E0B" />
          <MacroBar label="Grasa"    eaten={eaten.fat}     target={targets.fat}     unit="g"     color="#A78BFA" />
        </div>
      )}

      {/* Water */}
      <WaterTracker glasses={glasses} setGlasses={setWater} />

      {/* Meals or rest message */}
      {isDom ? (
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r2)', padding: '20px 16px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>😴</div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '1rem', color: '#A78BFA', marginBottom: 4
          }}>DÍA DE DESCANSO TOTAL</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            Come ligero, hidratación máxima y descansa bien. Mañana empieza la nueva semana.
          </div>
        </div>
      ) : (
        <>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'var(--muted)', margin: '2px 0 0'
          }}>COMIDAS DEL DÍA</p>
          {meals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              eaten={eatenIds.includes(meal.id)}
              onToggle={toggleMeal}
            />
          ))}
        </>
      )}
    </div>
  )
}

// ─── SEMANA tab ───────────────────────────────────────────────────────────────
function TabSemana() {
  const [openDay,   setOpenDay]   = useState(null)
  const [openGuide, setOpenGuide] = useState(null)
  const todayIdx = todayDayIdx()

  return (
    <div style={{ padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>

      {/* Week grid — each day is expandable */}
      {DAYS.map((day, dIdx) => {
        const plan    = DAY_PLAN[dIdx]
        const t       = MACRO_TARGETS[plan.type]
        const isToday = dIdx === todayIdx
        const isDom   = dIdx === 6
        const isOpen  = openDay === dIdx
        const meals   = getMealsForDay(dIdx)
        const totalKcal = meals.reduce((a, m) => a + m.macros.kcal, 0)

        return (
          <div key={dIdx} style={{
            background: 'var(--card)',
            border: `1px solid ${isToday ? `${t.color}40` : isOpen ? `${t.color}25` : 'var(--border)'}`,
            borderRadius: 'var(--r2)', overflow: 'hidden',
            transition: 'border-color 0.2s'
          }}>
            {/* Header row — clickable */}
            <button
              onClick={() => setOpenDay(isOpen ? null : dIdx)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: 10, padding: '10px 14px',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: `${t.color}15`, border: `1px solid ${t.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: '0.8rem', color: t.color
                }}>{day.label}</span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1,
                  display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap'
                }}>
                  {t.label}
                  {isToday && (
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 700,
                      color: 'var(--accent)', background: 'rgba(198,241,53,0.1)',
                      border: '1px solid rgba(198,241,53,0.25)',
                      borderRadius: 4, padding: '1px 5px'
                    }}>HOY</span>
                  )}
                </div>
                {!isDom && plan.lunch && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 2, display: 'flex', gap: 5 }}>
                    <span style={{ color: '#F59E0B', fontWeight: 600 }}>{LUNCH_LABEL[plan.lunch]}</span>
                    <span>·</span>
                    <span>Cena {plan.dinner}</span>
                  </div>
                )}
                {isDom && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 2 }}>Descanso · Sin meal prep</div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: '0.95rem', color: t.color
                  }}>{isDom ? '—' : totalKcal}</div>
                  {!isDom && <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>kcal</div>}
                </div>
                {!isDom && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M3 5l4 4 4-4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>

            {/* Expanded meal list */}
            {isOpen && !isDom && (
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {meals.map((meal, mIdx) => (
                  <div key={meal.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 14px',
                    borderTop: mIdx > 0 ? '1px solid var(--border)' : 'none',
                    background: mIdx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                  }}>
                    <span style={{ fontSize: '1.2rem', lineHeight: 1, flexShrink: 0, width: 26, textAlign: 'center' }}>
                      {meal.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700, fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1,
                        display: 'flex', alignItems: 'center', gap: 5
                      }}>
                        {meal.label}
                        <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 400 }}>{meal.time}</span>
                        {meal.mealPrep && (
                          <span style={{
                            fontSize: '0.55rem', fontWeight: 700,
                            color: '#F59E0B', background: 'rgba(245,158,11,0.1)',
                            border: '1px solid rgba(245,158,11,0.2)',
                            borderRadius: 3, padding: '1px 4px'
                          }}>PREP</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: 1 }}>
                        {meal.name}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        {[
                          { val: meal.macros.protein, label: 'P', color: '#4589FF' },
                          { val: meal.macros.carbs,   label: 'C', color: '#F59E0B' },
                          { val: meal.macros.fat,     label: 'G', color: '#A78BFA' },
                        ].map(m => (
                          <span key={m.label} style={{ fontSize: '0.66rem', color: m.color, fontWeight: 600 }}>
                            {m.label} {m.val}g
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700, fontSize: '0.88rem', color: t.color
                      }}>{meal.macros.kcal}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>kcal</div>
                    </div>
                  </div>
                ))}

                {/* Day total footer */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 14px',
                  borderTop: '1px solid var(--border)',
                  background: `${t.color}08`
                }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>
                    {meals.length} comidas
                  </span>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {[
                      { label: 'P', val: meals.reduce((a,m)=>a+m.macros.protein,0), color:'#4589FF' },
                      { label: 'C', val: meals.reduce((a,m)=>a+m.macros.carbs,0),   color:'#F59E0B' },
                      { label: 'G', val: meals.reduce((a,m)=>a+m.macros.fat,0),     color:'#A78BFA' },
                    ].map(m => (
                      <span key={m.label} style={{ fontSize: '0.72rem', color: m.color, fontWeight: 700 }}>
                        {m.label} {m.val}g
                      </span>
                    ))}
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800, fontSize: '0.82rem', color: t.color
                    }}>{totalKcal} kcal</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Meal prep legend */}
      <div style={{
        background: 'var(--card)', border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 'var(--r2)', padding: '10px 14px',
        display: 'flex', gap: 10, alignItems: 'center', marginTop: 4
      }}>
        <span style={{ fontSize: '1.2rem' }}>🍱</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: '#F59E0B' }}>
            PLAN MEAL PREP SEMANAL
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>
            Arroz (Lun·Mar) · Puré (Mié·Jue) · Pasta (Vie·Sáb)
          </div>
        </div>
      </div>

      {/* Meal prep guides */}
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.07em',
        textTransform: 'uppercase', color: 'var(--muted)', margin: '2px 0 0'
      }}>GUÍAS DE PREPARACIÓN</p>

      {MEAL_PREP_GUIDE.map(guide => {
        const isOpen = openGuide === guide.id
        return (
          <div key={guide.id} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r2)', overflow: 'hidden'
          }}>
            <button
              onClick={() => setOpenGuide(isOpen ? null : guide.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: 10, padding: '12px 14px',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
              }}>🍱</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)'
                }}>{guide.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>
                  {guide.serves} porciones · {guide.totalTime} min · {guide.fridgeDays} días nevera
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <path d="M3 5l4 4 4-4" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isOpen && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  fontSize: '0.73rem', color: '#F59E0B',
                  background: 'rgba(245,158,11,0.08)', borderRadius: 6, padding: '5px 9px',
                  display: 'inline-block'
                }}>📅 Usar en: {guide.usedOn}</div>

                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                    Ingredientes (×{guide.serves})
                  </p>
                  {guide.ingredients.map((ing, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text)' }}>{ing.item}</span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                        {ing.amount}{ing.note ? ` (${ing.note})` : ''}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                    Pasos
                  </p>
                  {guide.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700, fontSize: '0.72rem',
                        color: '#F59E0B', minWidth: 16, marginTop: 1
                      }}>{i + 1}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.45 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── COMPRAS tab ──────────────────────────────────────────────────────────────
function TabCompras() {
  const { profile, tenant } = useApp()
  const { checked, toggle, clearAll } = useShoppingList(profile?.id, tenant?.id)

  const totalItems   = SHOPPING_LIST.reduce((a, c) => a + c.items.length, 0)
  const checkedCount = checked.length

  return (
    <div style={{ padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>
            {checkedCount}/{totalItems} artículos
          </span>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: 1 }}>Lista de compra semanal</div>
        </div>
        {checkedCount > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              borderRadius: 8, padding: '5px 10px',
              color: 'var(--muted)', fontSize: '0.72rem', cursor: 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700
            }}
          >LIMPIAR</button>
        )}
      </div>

      <div style={{ height: 4, borderRadius: 99, background: 'var(--border2)' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          width: `${(checkedCount / totalItems) * 100}%`,
          background: checkedCount === totalItems ? 'var(--success)' : 'var(--accent)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {SHOPPING_LIST.map(cat => (
        <div key={cat.category} style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r2)', overflow: 'hidden'
        }}>
          <div style={{
            padding: '8px 14px', background: `${cat.color}0A`,
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <div style={{ width: 3, height: 14, borderRadius: 99, background: cat.color, flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: '0.78rem',
              color: cat.color, letterSpacing: '0.05em'
            }}>{cat.category.toUpperCase()}</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--muted)', marginLeft: 'auto' }}>
              {cat.items.filter(i => checked.includes(i.id)).length}/{cat.items.length}
            </span>
          </div>

          <div style={{ padding: '4px 0' }}>
            {cat.items.map((item, idx) => {
              const done = checked.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: 10, padding: '9px 14px',
                    background: done ? 'rgba(31,209,106,0.03)' : 'transparent',
                    border: 'none',
                    borderTop: idx > 0 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s'
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    border: `1.5px solid ${done ? 'var(--success)' : 'var(--border2)'}`,
                    background: done ? 'var(--success)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}>
                    {done && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5l2 2.5L8 1" stroke="#0C0D0F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{
                    flex: 1, fontSize: '0.82rem',
                    color: done ? 'var(--muted)' : 'var(--text)',
                    textDecoration: done ? 'line-through' : 'none',
                    textDecorationColor: 'var(--muted)', fontWeight: 500
                  }}>{item.item}</span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--muted)', flexShrink: 0 }}>
                    {item.amount}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'hoy',     label: 'Hoy',     Component: TabHoy },
  { id: 'semana',  label: 'Semana',  Component: TabSemana },
  { id: 'compras', label: 'Compras', Component: TabCompras },
]

export default function NutricionScreen() {
  const [activeTab, setActiveTab] = useState('hoy')
  const { Component } = TABS.find(t => t.id === activeTab)

  return (
    <div className="screen">
      <div style={{
        padding: '16px 16px 0',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10
      }}>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '1.6rem',
          letterSpacing: '0.03em', color: 'var(--text)', lineHeight: 1, marginBottom: 12
        }}>NUTRICIÓN</h1>

        <div style={{ display: 'flex' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: '8px 0',
                  background: 'transparent', border: 'none',
                  borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                  color: active ? 'var(--accent)' : 'var(--muted)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em',
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
              >
                {tab.label.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>

      <Component />
    </div>
  )
}
