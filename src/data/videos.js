// Search queries and pre-curated candidate IDs per exercise.
// The auto-video system tries candidates first (no API key needed),
// then falls back to YouTube Data API search if a Google key is configured.

export const VIDEO_DATA = {
  'Press de suelo con barra': {
    query: 'press de suelo barra pecho ejercicio casa tutorial español',
    candidates: ['6OeHHbKQHks', 'Zn6T7lQ5_yA', 'glIB8lBHSdA']
  },
  'Press de suelo con mancuernas': {
    query: 'press suelo mancuernas pecho casa ejercicio tutorial',
    candidates: ['VmB1G1K7v94', 'QsYre2sLkbe', 'IiWsYv1CBII']
  },
  'Press militar sentado con barra': {
    query: 'press militar sentado barra hombros casa tutorial español',
    candidates: ['qEwKCR5JCog', 'B-aVuyhvLHU', 'ye4nuMJv6gw']
  },
  'Press lateral con mancuernas': {
    query: 'elevaciones laterales mancuernas hombros casa tutorial',
    candidates: ['3VcKaXpzqRo', 'kDqklk1CPYA', 'FeJPMf5bsKg']
  },
  'Fondos en silla': {
    query: 'fondos en silla triceps casa ejercicio tutorial español',
    candidates: ['0326dy_-CzM', 'jox1rb5krQI', 'dX_nXpbWR7o']
  },
  'Plancha abdominal': {
    query: 'plancha abdominal correcta core casa tutorial español',
    candidates: ['ASdvN_XEl_c', 'F-nQ_KX0uMc', 'pvIjrsbeC1Y']
  },
  'Remo con barra inclinado': {
    query: 'remo barra inclinado espalda casa tutorial español',
    candidates: ['9efgcAjQe7E', 'FWJR5Ve8bnQ', 'vT2GjY_Umpw']
  },
  'Remo con mancuerna un brazo': {
    query: 'remo mancuerna un brazo espalda casa tutorial',
    candidates: ['dFzUjzfih7k', 'roCP442LA5s', 'kr_BPQPZNV8']
  },
  'Curl de bíceps con barra': {
    query: 'curl biceps barra ejercicio casa correcto tutorial español',
    candidates: ['ykJmrZ5v0Oo', 'XE_BHo98r5Q', 'LY1V6UbRHFM']
  },
  'Curl martillo mancuernas': {
    query: 'curl martillo mancuernas biceps braquial casa tutorial',
    candidates: ['zC3nLlEvin4', 'TwD-YGVP4Bk', 'av7-8CzC9Sw']
  },
  'Curl de concentración': {
    query: 'curl concentracion biceps mancuerna sentado casa tutorial',
    candidates: ['Zyx0yzQ9fxc', 'KKi_rDjQmb4', 'soxrZlIl35U']
  },
  'Plancha lateral': {
    query: 'plancha lateral oblicuos core casa ejercicio correcto',
    candidates: ['_GSVtytYkBo', 'K2EK_q4bsHE', 'bkdYdmME5-Y']
  },
  'Sentadilla goblet con barra': {
    query: 'sentadilla frontal goblet barra casa tutorial español',
    candidates: ['MeIiIdhvXT4', 'bEv6CCg2BC8', 'SAzjIAP8etA']
  },
  'Peso muerto con barra': {
    query: 'peso muerto barra correcto casa tutorial español principiante',
    candidates: ['op9kVnSso6Q', 'AweC3UaM14o', '1ZXobu7JvvE']
  },
  'Hip thrust con barra': {
    query: 'hip thrust barra gluteos casa sofa tutorial español',
    candidates: ['LM8XHLYJoYs', 'SEdqd9YoIrg', 'xDmFkJxPzeM']
  },
  'Zancada estática con mancuernas': {
    query: 'zancada estatica split mancuernas gluteos casa tutorial',
    candidates: ['D7KaRcUTQeE', 'wrwwXE_KINg', 'BYrwEKuKdg8']
  },
  'Sentadilla isométrica en pared': {
    query: 'sentadilla isometrica pared cuadriceps casa ejercicio',
    candidates: ['y-wV4Venusw', 'y9MSQ5PVBFQ', 'j2-xA83_vEo']
  },
  'Ab rollout con barra': {
    query: 'ab rollout barra abdominales casa tutorial correcto',
    candidates: ['p7j_fMaIAVo', 'OfBKBBGwx_o', 'AlFGHYmME14']
  },
  'Movilidad torácica': {
    query: 'movilidad toracica columna ejercicio casa fisioterapia',
    candidates: ['qN4sMFjBJwQ', 'BhWkDCvjBvQ', 'fHnPqQHKNIc']
  },
  'Apertura de caderas (paloma)': {
    query: 'apertura caderas paloma piriforme estiramiento yoga casa',
    candidates: ['nnI3nVWm7kU', 'blSkez-OFIM', 'ZRRfNXTrBkQ']
  },
  'Estiramiento de pecho en marco': {
    query: 'estiramiento pecho puerta marco casa flexibilidad',
    candidates: ['RcCpXLDECoo', 'g2O0w35a1dU', 'x4X7mvJlXJ8']
  },
  'Estiramiento isquiotibiales': {
    query: 'estiramiento isquiotibiales suelo casa flexibilidad correcto',
    candidates: ['WqgEFBTJVW4', 'VYMwE3OE3NM', 'I9sX1UZmFAY']
  },
  'Respiración diafragmática': {
    query: 'respiracion diafragmatica tecnica correcta relajacion casa',
    candidates: ['DbDoBzGY3vo', 'kgTL5GnBDy8', 'YFPnPe33oI4']
  },
  'Sentadilla frontal con barra': {
    query: 'sentadilla frontal barra casa tutorial correcto',
    candidates: ['uYumuL_G_V0', 'Uwca68QLWV4', 'paElgMRUGLo']
  },
}

export function getVideoData(exerciseName) {
  return VIDEO_DATA[exerciseName] ?? { query: `${exerciseName} ejercicio casa tutorial`, candidates: [] }
}
