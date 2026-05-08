const PECHO_TRICEPS = [
  {
    name: 'Press de suelo con barra', sets: '4×8 · 30 kg', badge: 'Pecho',
    muscles: 'Pectoral mayor · Tríceps · Deltoides ant.',
    steps: [
      'Acuéstate en el suelo, rodillas dobladas. Barra sobre el pecho, agarre a anchura de hombros.',
      'Baja la barra hasta que los codos toquen el suelo. Pausa de 1 segundo.',
      'Empuja explosivamente hasta extender los brazos. Aprieta el pecho arriba.'
    ]
  },
  {
    name: 'Press de suelo con mancuernas', sets: '3×10 · 15 kg c/u', badge: 'Pecho',
    muscles: 'Pectoral mayor · Tríceps · Estabilizadores',
    steps: [
      'Acostado en el suelo, mancuernas a la altura del pecho, codos a 45°.',
      'Baja controlado hasta que los codos apoyen levemente en el suelo.',
      'Empuja hacia arriba juntando ligeramente las mancuernas en la cima.'
    ]
  },
  {
    name: 'Apertura con mancuernas en suelo', sets: '3×12 · 15 kg c/u', badge: 'Pecho',
    muscles: 'Pectoral mayor · Pectoral menor · Coracobraquial',
    steps: [
      'Acostado, mancuernas sobre el pecho con codos ligeramente doblados, palmas enfrentadas.',
      'Abre los brazos en arco hacia los lados hasta que los codos toquen el suelo.',
      'Vuelve al centro apretando el pecho como si abrazaras un árbol. No bloquees los codos.'
    ]
  },
  {
    name: 'Fondos en silla', sets: '4×15 · Peso corporal', badge: 'Tríceps',
    muscles: 'Tríceps braquial · Deltoides ant. · Pecho inf.',
    steps: [
      'Manos en el borde de una silla firme, pies en el suelo con rodillas a 90°.',
      'Baja flexionando los codos hasta ~90°. Mantén la espalda cerca de la silla.',
      'Empuja hacia arriba extendiendo los brazos completamente. Pausa arriba.'
    ]
  },
  {
    name: 'Press francés en suelo con barra', sets: '3×12 · 15 kg', badge: 'Tríceps',
    muscles: 'Tríceps braquial (cabeza larga) · Ancóneo',
    steps: [
      'Acostado en el suelo, barra sobre la frente con agarre cerrado (~30 cm entre manos).',
      'Dobla solo los codos bajando la barra hacia la frente. Los hombros no se mueven.',
      'Extiende los codos explosivamente hacia arriba. Máximo aislamiento del tríceps.'
    ]
  },
  {
    name: 'Extensión de tríceps sobre cabeza', sets: '3×12 · 15 kg', badge: 'Tríceps',
    muscles: 'Tríceps braquial (cabeza larga) · Ancóneo',
    steps: [
      'Sentado en silla firme, sujeta una mancuerna con ambas manos sobre la cabeza, brazos extendidos.',
      'Dobla los codos bajando la mancuerna detrás de la cabeza. Codos apuntando al frente.',
      'Extiende hacia arriba contrayendo el tríceps. Mantén el core activo para no arquear.'
    ]
  }
]

const ESPALDA_BICEPS = [
  {
    name: 'Remo con barra inclinado', sets: '4×8 · 30 kg', badge: 'Espalda',
    muscles: 'Dorsal ancho · Romboides · Trapecio medio',
    steps: [
      'De pie, inclínate ~45° con espalda recta. Agarra la barra a anchura de caderas.',
      'Tira la barra hacia el abdomen bajo, codos pegados y hacia atrás.',
      'Baja controlado hasta estirar los brazos completamente. Siente el estiramiento dorsal.'
    ]
  },
  {
    name: 'Remo con mancuerna un brazo', sets: '3×10 c/lado · 15 kg', badge: 'Espalda',
    muscles: 'Dorsal ancho · Romboides · Bíceps',
    steps: [
      'Apoya rodilla y mano en el sofá o cama, espalda paralela al suelo.',
      'Agarra la mancuerna y tira hacia la cadera con el codo pegado al torso.',
      'Baja controlado y repite. Cambia de lado sin rotar la cadera.'
    ]
  },
  {
    name: 'Peso muerto rumano con barra', sets: '3×10 · 30 kg', badge: 'Espalda',
    muscles: 'Isquiotibiales · Glúteos · Erector espinal',
    steps: [
      'De pie, barra frente a los muslos, agarre prono a anchura de caderas.',
      'Empuja las caderas hacia atrás bajando la barra por las piernas, espalda recta.',
      'Siente el estiramiento en isquiotibiales. Vuelve empujando las caderas al frente.'
    ]
  },
  {
    name: 'Curl de bíceps con barra', sets: '3×12 · 20 kg', badge: 'Bíceps',
    muscles: 'Bíceps braquial · Braquiorradial',
    steps: [
      'De pie, barra con supinación a la anchura de caderas.',
      'Flexiona los codos subiendo la barra hacia el pecho. No balancees el torso.',
      'Baja en 3 segundos controlando la fase excéntrica. Estira completamente.'
    ]
  },
  {
    name: 'Curl martillo con mancuernas', sets: '3×12 · 15 kg c/u', badge: 'Bíceps',
    muscles: 'Bíceps · Braquiorradial · Braquial',
    steps: [
      'De pie, mancuernas en posición neutra (pulgar hacia arriba).',
      'Flexiona un codo subiendo la mancuerna, mantén el otro extendido.',
      'Alterna sin balancear. Fase de bajada lenta (3 seg).'
    ]
  },
  {
    name: 'Curl de concentración', sets: '3×12 c/lado · 15 kg', badge: 'Bíceps',
    muscles: 'Bíceps braquial (cabeza larga) · Braquial',
    steps: [
      'Sentado, codo apoyado en el interior del muslo, mancuerna colgando.',
      'Flexiona el codo subiendo la mancuerna hacia el hombro. Sin mover el torso.',
      'Baja lento y controlado. Máximo aislamiento y contracción del bíceps.'
    ]
  }
]

const PIERNAS_TRAPECIO_ANTEBRAZOS = [
  {
    name: 'Sentadilla frontal con barra', sets: '4×10 · 30 kg', badge: 'Piernas',
    muscles: 'Cuádriceps · Glúteos · Core',
    steps: [
      'Barra apoyada en los deltoides frontales, codos altos. Pies a anchura de hombros.',
      'Baja controlado hasta muslos paralelos al suelo. Torso completamente erguido.',
      'Sube empujando el suelo sin inclinar el torso. Rodillas en línea con los pies.'
    ]
  },
  {
    name: 'Peso muerto con barra', sets: '4×5 · 40 kg', badge: 'Global',
    muscles: 'Isquiotibiales · Glúteos · Erector espinal',
    steps: [
      'Barra frente a las espinillas. Agarre firme a anchura de caderas, espalda recta.',
      'Empuja el suelo con los pies y extiende caderas. Barra pegada al cuerpo.',
      'Baja controlado. Resetea posición entre reps si es necesario.'
    ]
  },
  {
    name: 'Hip thrust con barra', sets: '4×12 · 30 kg', badge: 'Glúteos',
    muscles: 'Glúteo mayor y medio · Isquiotibiales',
    steps: [
      'Espalda apoyada en el sofá o cama, barra sobre caderas (con toalla).',
      'Pies planos a anchura de caderas. Empuja las caderas hacia arriba.',
      'Aprieta glúteos en la cima 1 seg. Baja controlado.'
    ]
  },
  {
    name: 'Zancada estática con mancuernas', sets: '3×10 c/lado · 15 kg c/u', badge: 'Piernas',
    muscles: 'Glúteos · Cuádriceps · Isquiotibiales',
    steps: [
      'Posición de zancada fija. Mancuernas a los lados del cuerpo.',
      'Baja la rodilla trasera hacia el suelo lentamente (3 seg).',
      'Sube empujando con el pie delantero. Sin desplazarte. Cambia de pierna.'
    ]
  },
  {
    name: 'Encogimientos con barra', sets: '4×15 · 35 kg', badge: 'Trapecio',
    muscles: 'Trapecio superior · Elevador de la escápula',
    steps: [
      'De pie, barra frente a los muslos con agarre prono a anchura de hombros.',
      'Encoge los hombros hacia las orejas lo más arriba posible. Sin doblar los codos.',
      'Baja lento en 2 seg. No gires los hombros — movimiento puramente vertical.'
    ]
  },
  {
    name: 'Curl de muñeca con barra', sets: '3×20 · 10 kg', badge: 'Antebrazos',
    muscles: 'Flexores del antebrazo · Pronador redondo',
    steps: [
      'Sentado, antebrazo apoyado en el muslo con la barra en supinación (palma arriba).',
      'Relaja la muñeca dejando caer la barra hacia abajo controlado.',
      'Flexiona la muñeca subiendo la barra lo más alto posible. Pausa arriba.'
    ]
  },
  {
    name: 'Extensión de muñeca con barra', sets: '3×20 · 10 kg', badge: 'Antebrazos',
    muscles: 'Extensores del antebrazo · Ancóneo',
    steps: [
      'Sentado, antebrazo apoyado en el muslo con la barra en pronación (palma abajo).',
      'Deja caer la barra hacia abajo relajando la muñeca.',
      'Extiende la muñeca subiendo el dorso de la mano lo más posible. Movimiento puro.'
    ]
  }
]

export const DAYS = [
  {
    label: 'Lun', name: 'Lunes',
    focus: 'Descanso total', rest: true,
    note: 'Recuperación activa. Hidratación, estiramientos suaves y sueño.',
    exercises: []
  },
  {
    label: 'Mar', name: 'Martes',
    focus: 'Pecho · Tríceps',
    note: 'Día de empuje. Pecho completo y tríceps desde el suelo — sin impacto.',
    exercises: PECHO_TRICEPS
  },
  {
    label: 'Mié', name: 'Miércoles',
    focus: 'Espalda · Bíceps',
    note: 'Día de tirón. Espalda completa y bíceps con remos y curls.',
    exercises: ESPALDA_BICEPS
  },
  {
    label: 'Jue', name: 'Jueves',
    focus: 'Piernas · Trapecio · Antebrazos',
    note: 'Tren inferior completo + trapecio y agarre. Cargas máximas.',
    exercises: PIERNAS_TRAPECIO_ANTEBRAZOS
  },
  {
    label: 'Vie', name: 'Viernes',
    focus: 'Pecho · Tríceps',
    note: 'Segunda sesión de empuje. Aumenta el peso respecto al martes si puedes.',
    exercises: PECHO_TRICEPS
  },
  {
    label: 'Sáb', name: 'Sábado',
    focus: 'Espalda · Bíceps',
    note: 'Segunda sesión de tirón. Busca el fallo muscular en las últimas series.',
    exercises: ESPALDA_BICEPS
  },
  {
    label: 'Dom', name: 'Domingo',
    focus: 'Descanso total', rest: true,
    note: 'Recuperación completa. Hidratación, sueño y preparación para la semana.',
    exercises: []
  }
]

export function getBadgeClass(badge) {
  return `badge badge-${badge.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}`
}
