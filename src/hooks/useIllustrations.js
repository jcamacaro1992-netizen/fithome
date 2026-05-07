import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../supabaseClient'

const PHASES = ['posición inicial', 'punto medio del movimiento', 'posición final']

function buildPrompt(exerciseName, phase) {
  return `Dibuja un SVG técnico minimalista de una figura humana haciendo "${exerciseName}" en ${phase}.

REGLAS ESTRICTAS:
- viewBox="0 0 110 160"
- Fondo: <rect width="110" height="160" fill="#111827"/>
- Figura humana COMPLETA: cabeza, cuello, torso, 2 brazos, 2 piernas
- Color de líneas figura: stroke="#4589FF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"
- Articulaciones: <circle r="3.5" fill="#4589FF"/>
- Cabeza: <circle r="10" fill="none" stroke="#4589FF" stroke-width="2.8"/>
- Si el ejercicio usa barra: stroke="#6B7280" stroke-width="5" stroke-linecap="round"
- Si el ejercicio usa mancuernas: rectángulos pequeños stroke="#6B7280" fill="#374151"
- Flecha indicando dirección de movimiento: stroke="#F97316" stroke-width="2" stroke-dasharray="4,3"
- La figura debe ocupar al menos el 75% del viewBox, centrada
- Sin texto, sin title, sin desc, sin comentarios XML
- Responde ÚNICAMENTE con el XML SVG comenzando con <svg y terminando con </svg>`
}

// Try the Vercel serverless endpoint (uses server-side ANTHROPIC_API_KEY)
async function generateViaServer(exerciseName, phaseIdx) {
  const res = await fetch('/api/generate-illustration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exerciseName, phaseIdx }),
    signal: AbortSignal.timeout(30000)
  })
  if (res.status === 503) return { svg: null, noServerKey: true }
  if (!res.ok) return { svg: null, noServerKey: false }
  const data = await res.json()
  return { svg: data.svg ?? null, noServerKey: false }
}

// Fallback: call Anthropic API directly with user's local key
async function generateViaClientKey(apiKey, exerciseName, phaseIdx) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1800,
      messages: [{ role: 'user', content: buildPrompt(exerciseName, PHASES[phaseIdx]) }]
    }),
    signal: AbortSignal.timeout(30000)
  })
  if (!res.ok) return null
  const json = await res.json()
  const raw = json.content?.[0]?.text ?? ''
  const match = raw.match(/<svg[\s\S]*?<\/svg>/i)
  return match ? match[0] : null
}

export function useIllustrations(user, exerciseName, autoGenerate = false) {
  const [svgs, setSvgs]       = useState([null, null, null])
  const [loading, setLoading] = useState([false, false, false])
  const [apiKey, setApiKey]   = useState('')
  const [serverHasKey, setServerHasKey] = useState(true) // optimistic
  const autoTriggered = useRef(false)

  const exerciseKey = exerciseName?.toLowerCase().replace(/\s+/g, '_')

  useEffect(() => {
    const stored = localStorage.getItem('fithome_api_key') ?? ''
    setApiKey(stored)
  }, [])

  const loadCached = useCallback(async () => {
    if (!user || !exerciseKey) return
    const { data } = await supabase
      .from('ilustraciones')
      .select('fase, svg_data')
      .eq('user_id', user.id)
      .eq('ejercicio_key', exerciseKey)

    const result = [null, null, null]
    data?.forEach(r => { result[r.fase] = r.svg_data })
    setSvgs(result)
  }, [user, exerciseKey])

  useEffect(() => {
    loadCached()
    autoTriggered.current = false
  }, [loadCached])

  // Auto-generate when expanded and video is unavailable
  useEffect(() => {
    if (!autoGenerate || !exerciseKey) return
    if (autoTriggered.current) return
    if (!serverHasKey && !apiKey) return

    const missing = svgs.map((s, i) => (!s ? i : -1)).filter(i => i >= 0)
    if (missing.length === 0) return

    autoTriggered.current = true
    missing.forEach(i => generatePhase(i))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoGenerate, apiKey, serverHasKey, svgs, exerciseKey])

  async function generatePhase(phaseIdx) {
    if (!exerciseName) return
    setLoading(prev => { const n = [...prev]; n[phaseIdx] = true; return n })

    try {
      let svgData = null

      // 1. Try server endpoint first (ANTHROPIC_API_KEY on Vercel)
      if (serverHasKey) {
        const { svg, noServerKey } = await generateViaServer(exerciseName, phaseIdx)
        if (noServerKey) {
          setServerHasKey(false)
        } else {
          svgData = svg
        }
      }

      // 2. Fall back to user's local key
      if (!svgData && apiKey) {
        svgData = await generateViaClientKey(apiKey, exerciseName, phaseIdx)
      }

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

  // Show "add key" message only if neither server nor user has a key
  const showKeyPrompt = !serverHasKey && !apiKey

  return { svgs, loading, apiKey: showKeyPrompt ? '' : 'ok', generate: generatePhase, generateAll }
}
