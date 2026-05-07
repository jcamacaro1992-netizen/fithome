import { useState, useEffect, useRef } from 'react'

// Parse "4×8 · 30 kg" → { count:4, reps:8, weight:30, isTimed:false }
export function parseSets(setsStr) {
  const match = setsStr.match(/(\d+)[×x](\d+)/)
  const count = match ? parseInt(match[1]) : 3
  const reps  = match ? parseInt(match[2]) : 10
  const wMatch = setsStr.match(/·\s*(\d+(?:\.\d+)?)\s*kg/)
  const weight = wMatch ? parseFloat(wMatch[1]) : 0
  const isTimed = /seg/i.test(setsStr)
  const isBodyweight = /peso corporal/i.test(setsStr) || weight === 0
  return { count, reps, weight, isTimed, isBodyweight }
}

// Epley formula: estimated 1RM
export function epley1RM(reps, weight) {
  if (!weight || weight <= 0) return 0
  if (reps <= 1) return weight
  return Math.round(weight * (1 + reps / 30))
}

export function useSetTracking(exerciseName, setsStr, dayIdx) {
  const { count, reps, weight, isTimed, isBodyweight } = parseSets(setsStr)
  const key = `fithome_sets_${dayIdx}_${exerciseName.replace(/\W+/g, '_')}`

  const defaultSet = () => ({ reps, weight, done: false })
  const defaultSets = () => Array.from({ length: count }, defaultSet)

  const [sets, setSets] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const parsed = JSON.parse(raw)
        // Re-init if count changed
        if (parsed.length === count) return parsed
      }
    } catch {}
    return defaultSets()
  })

  const saveTimer = useRef(null)
  useEffect(() => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(sets))
    }, 300)
  }, [sets, key])

  function adj(i, field, delta) {
    setSets(prev => prev.map((s, idx) => {
      if (idx !== i) return s
      const step = field === 'weight' ? 2.5 : 1
      const next = Math.round((s[field] + delta * step) * 10) / 10
      return { ...s, [field]: Math.max(0, next) }
    }))
  }

  function toggleDone(i) {
    setSets(prev => prev.map((s, idx) => idx === i ? { ...s, done: !s.done } : s))
  }

  const doneSets = sets.filter(s => s.done).length
  const allDone  = sets.length > 0 && doneSets === sets.length

  const best1RM = sets
    .filter(s => s.done && s.weight > 0)
    .reduce((best, s) => {
      const est = epley1RM(s.reps, s.weight)
      return est > best ? est : best
    }, 0)

  return { sets, adj, toggleDone, doneSets, allDone, best1RM, isTimed, isBodyweight }
}
