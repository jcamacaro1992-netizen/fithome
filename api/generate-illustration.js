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
- Flecha indicando dirección de movimiento: stroke="#F97316" stroke-width="2" stroke-dasharray="4,3" marker-end si es posible
- La figura debe ocupar al menos el 75% del viewBox, centrada
- Sin texto, sin etiquetas title, sin desc, sin comentarios XML
- Responde ÚNICAMENTE con el XML SVG comenzando con <svg y terminando con </svg>`
}

export default async function handler(req, res) {
  // CORS for same-origin Vercel
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { exerciseName, phaseIdx } = req.body ?? {}
  if (!exerciseName || phaseIdx === undefined || phaseIdx < 0 || phaseIdx > 2) {
    return res.status(400).json({ error: 'Invalid parameters' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'Server API key not configured' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1800,
        messages: [{ role: 'user', content: buildPrompt(exerciseName, PHASES[phaseIdx]) }]
      })
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', err)
      return res.status(502).json({ error: 'Upstream API error' })
    }

    const json = await response.json()
    const raw = json.content?.[0]?.text ?? ''
    const match = raw.match(/<svg[\s\S]*?<\/svg>/i)
    const svgData = match ? match[0] : null

    if (!svgData) {
      return res.status(422).json({ error: 'No SVG in response' })
    }

    return res.status(200).json({ svg: svgData })
  } catch (err) {
    console.error('generate-illustration error:', err)
    return res.status(500).json({ error: 'Internal error' })
  }
}
