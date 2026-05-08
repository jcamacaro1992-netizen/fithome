import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../supabaseClient'

const toISO = () => new Date().toISOString().split('T')[0]

// ─── useNutritionLog ──────────────────────────────────────────────────────────
// Replaces localStorage for daily eaten meals + water tracking.
// Falls back to localStorage transparently when Supabase is unavailable.

export function useNutritionLog(userId, tenantId) {
  const today    = toISO()
  const hasDB    = !!(userId && tenantId)
  const saveTimer = useRef(null)

  const [eatenIds, setEatenIds] = useState([])
  const [glasses,  setGlasses]  = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [synced,   setSynced]   = useState(false)   // true = Supabase is the source

  // ── initial load ───────────────────────────────────────────────────────────
  const fetchLog = useCallback(async () => {
    if (!hasDB) {
      // Fallback: read from localStorage
      const lsKey = `fithome_meals_${today}`
      const lsWater = `fithome_water_${today}`
      try {
        const meals = JSON.parse(localStorage.getItem(lsKey) ?? '[]')
        const water = parseInt(localStorage.getItem(lsWater) ?? '0', 10)
        setEatenIds(meals)
        setGlasses(water)
      } catch {}
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await supabase
      .from('nutrition_logs')
      .select('eaten_meal_ids, water_glasses')
      .eq('user_id', userId)
      .eq('logged_date', today)
      .maybeSingle()

    if (data) {
      setEatenIds(data.eaten_meal_ids ?? [])
      setGlasses(data.water_glasses ?? 0)
      setSynced(true)
    } else {
      // No DB record yet — check localStorage for migration
      try {
        const lsKey   = `fithome_meals_${today}`
        const lsWater = `fithome_water_${today}`
        const meals = JSON.parse(localStorage.getItem(lsKey) ?? '[]')
        const water = parseInt(localStorage.getItem(lsWater) ?? '0', 10)
        if (meals.length > 0 || water > 0) {
          setEatenIds(meals)
          setGlasses(water)
          // Migrate to Supabase immediately
          await upsertDB(meals, water)
          setSynced(true)
        }
      } catch {}
    }
    setLoading(false)
  }, [userId, tenantId, today]) // eslint-disable-line

  useEffect(() => { fetchLog() }, [fetchLog])

  // ── write helpers ──────────────────────────────────────────────────────────
  async function upsertDB(meals, water) {
    if (!hasDB) return
    await supabase.from('nutrition_logs').upsert(
      { user_id: userId, tenant_id: tenantId, logged_date: today,
        eaten_meal_ids: meals, water_glasses: water },
      { onConflict: 'user_id,logged_date' }
    )
  }

  function scheduleSave(meals, water) {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => upsertDB(meals, water), 400)
  }

  // ── public API ─────────────────────────────────────────────────────────────
  function toggleMeal(id) {
    setEatenIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      scheduleSave(next, glasses)
      return next
    })
  }

  function setWater(n) {
    setGlasses(n)
    scheduleSave(eatenIds, n)
  }

  return { eatenIds, glasses, toggleMeal, setWater, loading, synced }
}

// ─── useShoppingList ──────────────────────────────────────────────────────────
// Replaces localStorage for shopping list checked state.

export function useShoppingList(userId, tenantId) {
  const hasDB   = !!(userId && tenantId)
  const [checked, setChecked] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hasDB) {
      // Fallback: localStorage
      try {
        const ls = JSON.parse(localStorage.getItem('fithome_shopping') ?? '[]')
        setChecked(ls)
      } catch {}
      setLoading(false)
      return
    }

    supabase
      .from('shopping_checked')
      .select('item_id')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (data) {
          const ids = data.map(r => r.item_id)
          setChecked(ids)
          setSynced(true) // eslint-disable-line
        }
        setLoading(false)
      })
  }, [userId, hasDB]) // eslint-disable-line

  async function toggle(itemId) {
    const isDone = checked.includes(itemId)
    // Optimistic update
    setChecked(prev => isDone ? prev.filter(x => x !== itemId) : [...prev, itemId])

    if (!hasDB) return

    if (isDone) {
      await supabase.from('shopping_checked')
        .delete()
        .eq('user_id', userId)
        .eq('item_id', itemId)
    } else {
      await supabase.from('shopping_checked')
        .insert({ user_id: userId, tenant_id: tenantId, item_id: itemId })
        .onConflict('user_id,item_id')
        .ignore()
    }
  }

  async function clearAll() {
    setChecked([])
    if (!hasDB) {
      localStorage.removeItem('fithome_shopping')
      return
    }
    await supabase.from('shopping_checked').delete().eq('user_id', userId)
  }

  return { checked, toggle, clearAll, loading }
}
