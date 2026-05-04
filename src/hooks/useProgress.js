import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'

const TODAY = new Date().toDateString()

export function useProgress(user) {
  const [checked, setChecked] = useState({}) // key: `${dia}-${idx}`
  const [loading, setLoading] = useState(true)

  const fetchToday = useCallback(async () => {
    if (!user) { setChecked({}); setLoading(false); return }
    const { data } = await supabase
      .from('progreso')
      .select('dia, ejercicio_idx')
      .eq('user_id', user.id)
      .eq('fecha', TODAY)

    const map = {}
    data?.forEach(r => { map[`${r.dia}-${r.ejercicio_idx}`] = true })
    setChecked(map)
    setLoading(false)
  }, [user])

  useEffect(() => { fetchToday() }, [fetchToday])

  async function toggle(dia, idx) {
    if (!user) return
    const key = `${dia}-${idx}`
    const alreadyDone = !!checked[key]

    // Optimistic update
    setChecked(prev => {
      const next = { ...prev }
      if (alreadyDone) delete next[key]
      else next[key] = true
      return next
    })

    if (alreadyDone) {
      await supabase.from('progreso').delete()
        .eq('user_id', user.id)
        .eq('dia', dia)
        .eq('ejercicio_idx', idx)
        .eq('fecha', TODAY)
    } else {
      await supabase.from('progreso').upsert({
        user_id: user.id,
        dia,
        ejercicio_idx: idx,
        fecha: TODAY
      })
    }
  }

  async function clearToday() {
    if (!user) return
    await supabase.from('progreso').delete()
      .eq('user_id', user.id)
      .eq('fecha', TODAY)
    setChecked({})
  }

  function isDone(dia, idx) {
    return !!checked[`${dia}-${idx}`]
  }

  function dayProgress(dia, total) {
    if (total === 0) return 1
    let count = 0
    for (let i = 0; i < total; i++) {
      if (checked[`${dia}-${i}`]) count++
    }
    return count / total
  }

  function totalToday(exercises) {
    return exercises.filter((_, i) => checked[`${new Date().getDay()}-${i}`]).length
  }

  return { checked, loading, toggle, clearToday, isDone, dayProgress, totalToday }
}
