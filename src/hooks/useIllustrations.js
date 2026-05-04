import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../supabaseClient'

const PHASES = ['posición inicial', 'punto medio del movimiento', 'posición final']

function buildPrompt(exerciseName, phase) {
  return `Dibuja un SVG técnico de una figura humana haciendo "${exerciseName}" en ${phase}.

REGLAS:
- viewBox="0 0 110 160"
- Fondo: <rect width="110" height="160" fill="#111315"/>
- Figura humana COMPLETA: cabeza, cuello, torso, 2 brazos, 2 piernas
- Líneas de figura: stroke="#C6F135" stroke-width="2.8" stroke-linecap="round"
- Articulaciones: <circle r="3.5" fill="#C6F135"/>
- Cabeza: <circle r="10" fill="none" stroke="#C6F135" stroke-width="2.8"/>
- Barra/mancuerna si aplica: stroke="#888888" stroke-width="5"
- Flecha de movimiento: stroke="#FF6B2B" stroke-width="2" stroke-dasharray="4,3"
- Figura ocupa 80% del viewBox, centrada
- SIN texto, SIN title, SIN desc
- Solo XML SVG puro comenzando con <svg`
}

export function useIllustrations(user, exerciseName, autoGenerate = false) {
  const [svgs, setSvgs] = useState([null, null, null])
  const [loading, setLoading] = useState([false, false, false])
  const [apiKey, setApiKey] = useState('')
  const autoTriggered = useRef(false)

  const exerciseKey = exerciseName?.toLowerCase().replace(/\s+/g, '_')

  useEffect(() => {
    const stored = localStorage.getItem('fithome_api_key') ?? ''
    setApiKey(stored)
  }, [])

  const loadCached = useCallback(async () => {
    if (!user || !exerciseKey) return [null, null, null]
    const { data } = await supabase
      .from('ilustraciones')
      .select('fase, svg_data')
      .eq('user_id', user.id)
      .eq('ejercicio_key', exerciseKey)

    const result = [null, null, null]
    data?.forEach(r => { result[r.fase] = r.svg_data })
    setSvgs(result)
    return result
  }, [user, exerciseKey])

  useEffect(() => {
    loadCached()
    autoTriggered.current = false
  }, [loadCached])

  // Auto-generate missing illustrations when autoGenerate mode is on and key present
  useEffect(() => {
    if (!autoGenerate || !apiKey || !exerciseKey) return
    if (autoTriggered.current) return

    const missingPhases = svgs.map((s, i) => (!s ? i : -1)).filter(i => i >= 0)
    if (missingPhases.length === 0) return

    autoTriggered.current = true
    missingPhases.forEach(i => generatePhase(i))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoGenerate, apiKey, svgs, exerciseKey])

  async function generatePhase(phaseIdx) {
    if (!apiKey) return
    setLoading(prev => { const n = [...prev]; n[phaseIdx] = true; return n })
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [{ role: 'user', content: buildPrompt(exerciseName, PHASES[phaseIdx]) }]
        })
      })

      const json = await res.json()
      const raw = json.content?.[0]?.text ?? ''
      const match = raw.match(/<svg[\s\S]*<\/svg>/i)
      const svgData = match ? match[0] : null

      if (svgData) {
        setSvgs(prev => { const n = [...prev]; n[phaseIdx] = svgData; return n })
        if (user) {
          await supabase.from('ilustraciones').upsert({
            user_id: user.id,
            ejercicio_key: exerciseKey,
            fase: phaseIdx,
            svg_data: svgData
          })
        }
      }
    } catch (e) {
      console.error('Illustration generation failed', e)
    } finally {
      setLoading(prev => { const n = [...prev]; n[phaseIdx] = false; return n })
    }
  }

  async function generateAll() {
    for (let i = 0; i < 3; i++) {
      if (!svgs[i]) await generatePhase(i)
    }
  }

  return { svgs, loading, apiKey, generate: generatePhase, generateAll }
}
