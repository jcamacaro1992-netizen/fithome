// Candidates: verified working IDs listed first, older IDs kept as fallback.
// useAutoVideo tries each ID in order via oEmbed and embeds the first that works.
// ReferenceImage uses the first candidate's hqdefault.jpg thumbnail as a static fallback.

export const VIDEO_DATA = {
  'Press de suelo con barra': {
    query: 'sergio orduz press suelo barra pecho ejercicio',
    candidates: ['IDJ-wKQnYlU', '6OeHHbKQHks', 'Zn6T7lQ5_yA', 'glIB8lBHSdA']
  },
  'Press de suelo con mancuernas': {
    query: 'sergio orduz press suelo mancuernas pecho',
    candidates: ['fXgXwfosyhk', 'VmB1G1K7v94', 'QsYre2sLkbe', 'IiWsYv1CBII']
  },
  'Press militar sentado con barra': {
    query: 'sergio orduz press militar sentado hombros barra',
    candidates: ['tyx_XI_DXW0', 'qEwKCR5JCog', 'B-aVuyhvLHU', 'ye4nuMJv6gw']
  },
  'Press lateral con mancuernas': {
    query: 'sergio orduz elevaciones laterales mancuernas hombros',
    candidates: ['zBqZqAjCnR4', '3VcKaXpzqRo', 'kDqklk1CPYA', 'FeJPMf5bsKg']
  },
  'Fondos en silla': {
    query: 'sergio orduz fondos silla triceps ejercicio',
    candidates: ['p4uJFYBvFoo', '0326dy_-CzM', 'jox1rb5krQI', 'dX_nXpbWR7o']
  },
  'Plancha abdominal': {
    query: 'sergio orduz plancha abdominal core correcta',
    candidates: ['_Plb5jSSlX4', 'ASdvN_XEl_c', 'F-nQ_KX0uMc', 'pvIjrsbeC1Y']
  },
  'Remo con barra inclinado': {
    query: 'sergio orduz remo barra inclinado espalda',
    candidates: ['sr_U0jBE89A', '9efgcAjQe7E', 'FWJR5Ve8bnQ', 'vT2GjY_Umpw']
  },
  'Remo con mancuerna un brazo': {
    query: 'sergio orduz remo mancuerna un brazo espalda',
    candidates: ['DnQytXQMqcw', 'dFzUjzfih7k', 'roCP442LA5s', 'kr_BPQPZNV8']
  },
  'Curl de bíceps con barra': {
    query: 'sergio orduz curl biceps barra correcto',
    candidates: ['MqYBweUzDT4', 'ykJmrZ5v0Oo', 'XE_BHo98r5Q', 'LY1V6UbRHFM']
  },
  'Curl martillo con mancuernas': {
    query: 'sergio orduz curl martillo mancuernas biceps',
    candidates: ['PzmSQcFSNPI', 'zC3nLlEvin4', 'TwD-YGVP4Bk', 'av7-8CzC9Sw']
  },
  'Curl de concentración': {
    query: 'sergio orduz curl concentracion biceps mancuerna',
    candidates: ['XhCQqmYqynY', 'Zyx0yzQ9fxc', 'KKi_rDjQmb4', 'soxrZlIl35U']
  },
  'Plancha lateral': {
    query: 'sergio orduz plancha lateral oblicuos core',
    candidates: ['JAiuA69Wdt4', '_GSVtytYkBo', 'K2EK_q4bsHE', 'bkdYdmME5-Y']
  },
  'Sentadilla goblet con barra': {
    query: 'sergio orduz sentadilla goblet frontal barra',
    candidates: ['SBuOaFE1vMA', 'MeIiIdhvXT4', 'bEv6CCg2BC8', 'SAzjIAP8etA']
  },
  'Peso muerto con barra': {
    query: 'sergio orduz peso muerto barra correcto tecnica',
    candidates: ['wuHh-o9G6ow', 'op9kVnSso6Q', 'AweC3UaM14o', '1ZXobu7JvvE']
  },
  'Hip thrust con barra': {
    query: 'sergio orduz hip thrust barra gluteos',
    candidates: ['7B4pSZhzkYY', 'LM8XHLYJoYs', 'SEdqd9YoIrg', 'xDmFkJxPzeM']
  },
  'Zancada estática con mancuernas': {
    query: 'sergio orduz zancada estatica split mancuernas',
    candidates: ['so1yiglBa4k', 'D7KaRcUTQeE', 'wrwwXE_KINg', 'BYrwEKuKdg8']
  },
  'Sentadilla isométrica en pared': {
    query: 'sergio orduz sentadilla isometrica pared cuadriceps',
    candidates: ['Mol3yaGMz5M', 'y-wV4Venusw', 'y9MSQ5PVBFQ', 'j2-xA83_vEo']
  },
  'Ab rollout con barra': {
    query: 'sergio orduz ab rollout rueda abdominal barra',
    candidates: ['6DUbeqa9g3M', 'p7j_fMaIAVo', 'OfBKBBGwx_o', 'AlFGHYmME14']
  },
  'Apertura con mancuernas en suelo': {
    query: 'sergio orduz apertura mancuernas suelo pecho ejercicio',
    candidates: ['UGfYSVwI1dw', 'UWBiHekEpHQ', 'eoq_HBwJa9Q', 'mBxRiMQ6vXw']
  },
  'Press francés en suelo con barra': {
    query: 'sergio orduz press frances suelo barra triceps',
    candidates: ['MIyBCxY_Muc', 'd_DqMEIIGFQ', 'SNBY5wEi7Zc', 'OtaXJONZ5Ro']
  },
  'Extensión de tríceps sobre cabeza': {
    query: 'sergio orduz extension triceps sobre cabeza mancuerna',
    candidates: ['wKEONiKiNCk', '_gsUck4dMGc', 'mBkGn1MidVk', 'BX9e9W_vHzE']
  },
  'Peso muerto rumano con barra': {
    query: 'sergio orduz peso muerto rumano barra isquiotibiales',
    candidates: ['8qNrTuZ0rXM', '7iqOFbWYPEQ', 'JCXZnRoRPqo', '_oyxgtHhneo']
  },
  'Encogimientos con barra': {
    query: 'sergio orduz encogimientos barra trapecio hombros',
    candidates: ['Zz1VR4ivSos', 'e0nkZzVEq3k', 'kRm3iSxuD4w', 'rWB2MsYmyNA']
  },
  'Curl de muñeca con barra': {
    query: 'sergio orduz curl muneca barra antebrazos',
    candidates: ['H194guwZGTo', 'IWGHiZdRFQs', 'vLVJxDZQ5HI', 'qvqNNF9QHFY']
  },
  'Extensión de muñeca con barra': {
    query: 'sergio orduz extension muneca barra antebrazos',
    candidates: ['MwfgBagUPog', 'kMNLhyFBn8E', 'c_9mxezWbNA', 'ej9gq0bYjWs']
  },
  'Sentadilla frontal con barra': {
    query: 'sergio orduz sentadilla frontal barra tecnica',
    candidates: ['oP-3qImhJ4E', 'uYumuL_G_V0', 'Uwca68QLWV4', 'paElgMRUGLo']
  },
  'Movilidad torácica': {
    query: 'sergio orduz movilidad toracica columna ejercicio',
    candidates: ['qN4sMFjBJwQ', 'BhWkDCvjBvQ', 'fHnPqQHKNIc']
  },
  'Apertura de caderas (paloma)': {
    query: 'sergio orduz apertura caderas paloma estiramiento',
    candidates: ['nnI3nVWm7kU', 'blSkez-OFIM', 'ZRRfNXTrBkQ']
  },
  'Estiramiento de pecho en marco': {
    query: 'sergio orduz estiramiento pecho puerta marco',
    candidates: ['RcCpXLDECoo', 'g2O0w35a1dU', 'x4X7mvJlXJ8']
  },
  'Estiramiento isquiotibiales': {
    query: 'sergio orduz estiramiento isquiotibiales correcto',
    candidates: ['WqgEFBTJVW4', 'VYMwE3OE3NM', 'I9sX1UZmFAY']
  },
  'Respiración diafragmática': {
    query: 'sergio orduz respiracion diafragmatica tecnica',
    candidates: ['DbDoBzGY3vo', 'kgTL5GnBDy8', 'YFPnPe33oI4']
  },
  'Crunch abdominal en suelo': {
    query: 'sergio orduz crunch abdominal suelo correcto',
    candidates: ['HLAPlJhxqEE', 'Zyx0yzQ9fxc', 'AvkJ6S2Pw4k', 'MKmrqckrV3M']
  },
  'Elevación de piernas en suelo': {
    query: 'sergio orduz elevacion piernas suelo abdomen',
    candidates: ['7uMNfgxbbLU', 'l4kQd9eWclI', 'JB2oyawG9KI', 'wCxkSzRDxMo']
  },
  'Patada trasera de pie': {
    query: 'sergio orduz patada trasera pie gluteo ejercicio',
    candidates: ['wx8hZWWL9kU', 'SEdqd9YoIrg', 'RqF14HCn3lI', 'QOJBpeBH9EY']
  },
  'Sentadilla sumo con mancuerna': {
    query: 'sergio orduz sentadilla sumo mancuerna gluteos',
    candidates: ['XtqCgYKBtTI', 'bEv6CCg2BC8', 'SAzjIAP8etA', 'AvXZBkA96wQ']
  },
  'Superman en suelo': {
    query: 'sergio orduz superman suelo espalda baja gluteos',
    candidates: ['MSO0yVf3Cvw', 'NW3a0PCJCHA', 'Iu_L7lM7yzc', 'rTFPaLNFwpI']
  },
  'Extensión de espalda en suelo': {
    query: 'sergio orduz extension espalda suelo lumbar',
    candidates: ['Yd9tgPAvlQE', '3rPFBKPGHoY', 'MjhP6MxkXwE', 'w4iHDp9MLNA']
  },
  'Curl femoral en suelo': {
    query: 'sergio orduz curl femoral suelo isquiotibiales',
    candidates: ['6JQflLWhKfg', 'cYPSuDd3dMo', 'LYoAqC5QFKM', 'IWPH3gXSZJU']
  },
}

export function getVideoData(exerciseName) {
  return VIDEO_DATA[exerciseName] ?? {
    query: `sergio orduz ${exerciseName} ejercicio correcto`,
    candidates: []
  }
}
