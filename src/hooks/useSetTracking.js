import { useState, useEffect, useRef } from 'react'

export function parseSets(setsStr) {
  const match = setsStr.match(/(\d+)[×x](\d+)/)
  const count  = match ? parseInt(match[1]) : 3
  const reps   = match ? parseInt(match[2]) : 10
  const wMatch = setsStr.match(/·\s*(\d+(?:\.\d+)?)\s*kg/)
  const weight = wMatch ? parseFloat(wMatch[1]) : 0
  const isTimed      = /seg/i.test(setsStr)
  const isBodyweight = /peso corporal/i.test(setsStr) || weight === 0
  return { count, reps, weight, isTimed, isBodyweight }
}

export function epley1RM(reps, weight) {
  if (!weight || weight <= 0 || reps <= 1) return weight
  return Math.round(weight * (1 + reps / 30))
}

// Dumbbell exercises → 1 kg steps; barbell → 2.5 kg steps
function weightStep(exerciseName = '') {
  const n = exerciseName.toLowerCase()
  return n.includes('mancuerna') ? 1 : 2.5
}

export function useSetTracking(exerciseName, setsStr, dayIdx) {
  const { count, reps: defReps, weight: defWeight, isTimed, isBodyweight } = parseSets(setsStr)
  const key  = `fithome_sets2_${dayIdx}_${exerciseName.replace(/\W+/g, '_')}`
  const step = weightStep(exerciseName)

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const p = JSON.parse(raw)
        if (p.count === count) return p
      }
    } catch {}
    return { count, reps: defReps, weight: defWeight, done: 0 }
  })

  const timer = useRef(null)
  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => localStorage.setItem(key, JSON.stringify(state)), 300)
  }, [state, key])

  function adj(field, delta) {
    setState(prev => {
      const inc   = field === 'weight' ? step : 1
      const next  = Math.round((prev[field] + delta * inc) * 10) / 10
      return { ...prev, [field]: Math.max(0, next) }
    })
  }

  function markSet(i) {
    setState(prev => ({ ...prev, done: prev.done === i + 1 ? i : i + 1 }))
  }

  const allDone = state.done >= count
  const best1RM = state.done > 0 && !isBodyweight ? epley1RM(state.reps, state.weight) : 0

  return { ...state, adj, markSet, allDone, best1RM, isTimed, isBodyweight }
}
