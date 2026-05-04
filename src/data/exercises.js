export const DAYS = [
  {
    label: 'Lun', name: 'Lunes',
    focus: 'Descanso total', rest: true,
    note: 'Recuperación completa. Hidratación, sueño y descanso.',
    exercises: []
  },
  {
    label: 'Mar', name: 'Martes',
    focus: 'Empuje superior',
    note: 'Pecho, hombros y tríceps. Todo desde el suelo o sentado — sin impacto.',
    exercises: [
      {
        name: 'Press de suelo con barra', sets: '4×8 · 30 kg', badge: 'Pecho',
        muscles: 'Pecho · Tríceps · Hombros ant.',
        steps: [
          'Acuéstate en el suelo, rodillas dobladas. Barra sobre el pecho, agarre a anchura de hombros.',
          'Baja la barra hasta que los codos toquen el suelo. Rango controlado.',
          'Empuja explosivamente hasta extender los brazos. Pausa arriba.'
        ]
      },
      {
        name: 'Press de suelo con mancuernas', sets: '3×10 · 15 kg c/u', badge: 'Pecho',
        muscles: 'Pecho · Tríceps · Estabilizadores',
        steps: [
          'Acostado en el suelo, mancuernas a la altura del pecho, codos a 45°.',
          'Baja controlado hasta que los codos apoyen levemente en el suelo.',
          'Empuja hacia arriba juntando ligeramente las mancuernas en la cima.'
        ]
      },
      {
        name: 'Press militar sentado con barra', sets: '3×10 · 20 kg', badge: 'Hombros',
        muscles: 'Deltoides · Tríceps · Trapecio sup.',
        steps: [
          'Sentado en una silla firme, barra a la altura de la clavícula.',
          'Empuja la barra verticalmente hasta extender los brazos sobre la cabeza.',
          'Baja controlado hasta el inicio. Sin arquear la espalda baja.'
        ]
      },
      {
        name: 'Press lateral con mancuernas', sets: '3×12 · 15 kg c/u', badge: 'Hombros',
        muscles: 'Deltoides medial · Trapecio sup.',
        steps: [
          'De pie, mancuernas a los costados del cuerpo, codos ligeramente doblados.',
          'Eleva los brazos lateralmente hasta la altura del hombro. No más arriba.',
          'Baja lento y controlado en 3 segundos. No uses impulso.'
        ]
      },
      {
        name: 'Fondos en silla', sets: '3×12 · Peso corporal', badge: 'Tríceps',
        muscles: 'Tríceps · Deltoides ant. · Pecho inf.',
        steps: [
          'Manos en el borde de una silla firme, pies en el suelo con rodillas a 90°.',
          'Baja flexionando los codos hasta ~90°. No hundas los hombros.',
          'Empuja hacia arriba extendiendo los brazos completamente.'
        ]
      },
      {
        name: 'Plancha abdominal', sets: '3×45 seg', badge: 'Core',
        muscles: 'Core · Glúteos · Hombros',
        steps: [
          'Apóyate en antebrazos y puntas de pies sobre colchoneta.',
          'Cuerpo recto de cabeza a talones, abdomen fuertemente contraído.',
          'Respira con normalidad. No dejes caer la cadera ni subas el trasero.'
        ]
      }
    ]
  },
  {
    label: 'Mié', name: 'Miércoles',
    focus: 'Tirón + Bíceps',
    note: 'Espalda y bíceps con remos. Sin necesidad de barra fija.',
    exercises: [
      {
        name: 'Remo con barra inclinado', sets: '4×8 · 30 kg', badge: 'Espalda',
        muscles: 'Dorsal · Romboides · Trapecio medio',
        steps: [
          'De pie, inclínate ~45° con espalda recta. Agarra la barra a anchura de caderas.',
          'Tira la barra hacia el abdomen bajo, codos pegados al cuerpo.',
          'Baja controlado hasta estirar los brazos completamente.'
        ]
      },
      {
        name: 'Remo con mancuerna un brazo', sets: '3×10 c/lado · 15 kg', badge: 'Espalda',
        muscles: 'Dorsal · Romboides · Bíceps',
        steps: [
          'Apoya rodilla y mano en el sofá o cama, espalda paralela al suelo.',
          'Agarra la mancuerna y tira hacia la cadera con el codo pegado al torso.',
          'Baja controlado y repite. Cambia de lado sin rotar la cadera.'
        ]
      },
      {
        name: 'Curl de bíceps con barra', sets: '3×12 · 20 kg', badge: 'Bíceps',
        muscles: 'Bíceps braquial · Braquiorradial',
        steps: [
          'De pie, barra con supinación a la anchura de caderas.',
          'Flexiona los codos subiendo la barra hacia el pecho. No balancees el torso.',
          'Baja en 3 segundos controlando la fase excéntrica.'
        ]
      },
      {
        name: 'Curl martillo mancuernas', sets: '3×12 · 15 kg c/u', badge: 'Bíceps',
        muscles: 'Bíceps · Braquiorradial · Antebrazo',
        steps: [
          'De pie, mancuernas en posición neutra (pulgar hacia arriba).',
          'Flexiona un codo subiendo la mancuerna, mantén el otro extendido.',
          'Alterna sin balancear. Fase de bajada lenta (3 seg).'
        ]
      },
      {
        name: 'Curl de concentración', sets: '3×12 c/lado · 15 kg', badge: 'Bíceps',
        muscles: 'Bíceps braquial (cabeza larga)',
        steps: [
          'Sentado, codo apoyado en el interior del muslo, mancuerna colgando.',
          'Flexiona el codo subiendo la mancuerna hacia el hombro. Sin mover el torso.',
          'Baja lento y controlado. Máximo aislamiento del bíceps.'
        ]
      },
      {
        name: 'Plancha lateral', sets: '3×30 seg c/lado', badge: 'Core',
        muscles: 'Oblicuos · Cuadrado lumbar · Glúteo med.',
        steps: [
          'Apóyate en un antebrazo, pies apilados sobre colchoneta.',
          'Eleva las caderas formando una línea recta de cabeza a pies.',
          'Mantén sin rotar la pelvis. Cambia de lado.'
        ]
      }
    ]
  },
  {
    label: 'Jue', name: 'Jueves',
    focus: 'Piernas + Glúteos',
    note: 'Tren inferior intenso. Sin saltos — controlado para el departamento.',
    exercises: [
      {
        name: 'Sentadilla goblet con barra', sets: '4×10 · 30 kg', badge: 'Piernas',
        muscles: 'Cuádriceps · Glúteos · Isquiotibiales',
        steps: [
          'Sujeta la barra frente al pecho. Pies a anchura de hombros, puntas ligeramente afuera.',
          'Baja lentamente hasta muslos paralelos al suelo. Rodillas en línea con pies.',
          'Sube empujando el suelo. Pausa controlada abajo — sin rebotar.'
        ]
      },
      {
        name: 'Peso muerto con barra', sets: '4×6 · 40 kg', badge: 'Global',
        muscles: 'Isquiotibiales · Glúteos · Espalda baja',
        steps: [
          'Barra frente a las espinillas. Agarre a anchura de caderas, espalda recta.',
          'Empuja el suelo con los pies y extiende caderas hasta quedar erguido.',
          'Baja controlado manteniendo la barra pegada al cuerpo.'
        ]
      },
      {
        name: 'Hip thrust con barra', sets: '4×12 · 30 kg', badge: 'Glúteos',
        muscles: 'Glúteos mayor y medio · Isquiotibiales',
        steps: [
          'Espalda apoyada en el sofá o cama, barra sobre caderas (con toalla).',
          'Pies planos a anchura de caderas. Empuja las caderas hacia arriba.',
          'Aprieta glúteos en la cima 1 seg. Baja controlado.'
        ]
      },
      {
        name: 'Zancada estática con mancuernas', sets: '3×10 c/lado · 15 kg c/u', badge: 'Glúteos',
        muscles: 'Glúteos · Cuádriceps · Isquiotibiales',
        steps: [
          'Posición de zancada fija. Mancuernas a los lados del cuerpo.',
          'Baja la rodilla trasera hacia el suelo lentamente (3 segundos).',
          'Sube empujando con el pie delantero. Sin desplazarte.'
        ]
      },
      {
        name: 'Sentadilla isométrica en pared', sets: '3×40 seg', badge: 'Piernas',
        muscles: 'Cuádriceps · Glúteos · Gemelos',
        steps: [
          'Espalda pegada a la pared, muslos paralelos al suelo, rodillas a 90°.',
          'Manos en los muslos o cruzadas. Sin bajar — posición fija.',
          'Aguanta el tiempo respirando con normalidad.'
        ]
      },
      {
        name: 'Ab rollout con barra', sets: '3×10', badge: 'Core',
        muscles: 'Recto abdominal · Serrato · Dorsales',
        steps: [
          'De rodillas sobre colchoneta, agarra la barra con las dos manos.',
          'Rueda la barra hacia adelante extendiendo los brazos, caderas bajas.',
          'Contrae el abdomen para volver a la posición inicial.'
        ]
      }
    ]
  },
  {
    label: 'Vie', name: 'Viernes',
    focus: 'Movilidad activa',
    note: 'Sin carga. Movilidad, estiramientos y respiración.',
    exercises: [
      {
        name: 'Movilidad torácica', sets: '3×10 rep', badge: 'Columna',
        muscles: 'Columna torácica · Dorsales · Intercostales',
        steps: [
          'A cuatro patas, lleva un codo detrás de la cabeza.',
          'Rota el torso llevando ese codo hacia el techo. Mantén 2 seg.',
          'Vuelve al inicio y repite. Cambia de lado.'
        ]
      },
      {
        name: 'Apertura de caderas (paloma)', sets: '2×40 seg c/lado', badge: 'Movilidad',
        muscles: 'Glúteo mayor · Piriforme · Flexores cadera',
        steps: [
          'En el suelo, lleva una pierna doblada frente a ti y extiende la otra atrás.',
          'Baja el torso hacia el suelo apoyando los antebrazos.',
          'Mantén la posición respirando profundo para relajar la cadera.'
        ]
      },
      {
        name: 'Estiramiento de pecho en marco', sets: '3×30 seg', badge: 'Flexibilidad',
        muscles: 'Pectoral mayor · Deltoides ant.',
        steps: [
          'Párate junto al marco de una puerta. Antebrazo apoyado a 90°.',
          'Gira el cuerpo hacia afuera hasta sentir el estiramiento en el pecho.',
          'Mantén 30 seg. Cambia de brazo.'
        ]
      },
      {
        name: 'Estiramiento isquiotibiales', sets: '3×30 seg c/lado', badge: 'Flexibilidad',
        muscles: 'Isquiotibiales · Glúteo mayor',
        steps: [
          'Sentado en el suelo, una pierna extendida y la otra doblada.',
          'Inclínate desde la cadera hacia la pierna extendida, espalda recta.',
          'Mantén la posición 30 seg. No redondees la espalda.'
        ]
      },
      {
        name: 'Respiración diafragmática', sets: '5 minutos', badge: 'Recuperación',
        muscles: 'Diafragma · Sistema nervioso parasimpático',
        steps: [
          'Acostado boca arriba, una mano en el pecho y otra en el abdomen.',
          'Inhala 4 seg por la nariz expandiendo solo el abdomen.',
          'Exhala lento 6-8 seg por la boca. Activa la recuperación.'
        ]
      }
    ]
  },
  {
    label: 'Sáb', name: 'Sábado',
    focus: 'Fuerza total',
    note: 'Cargas máximas. Descanso completo 2-3 min entre series.',
    exercises: [
      {
        name: 'Peso muerto con barra', sets: '5×5 · 40 kg', badge: 'Fuerza',
        muscles: 'Isquiotibiales · Glúteos · Espalda baja',
        steps: [
          'Barra frente a las espinillas. Agarre firme a anchura de caderas.',
          'Empuja el suelo y extiende caderas. Barra pegada al cuerpo en todo momento.',
          'Baja controlado. Resetea la posición entre reps si es necesario.'
        ]
      },
      {
        name: 'Press de suelo con barra', sets: '5×5 · 30 kg', badge: 'Fuerza',
        muscles: 'Pecho · Tríceps · Hombros ant.',
        steps: [
          'Acostado en el suelo. Barra sobre el pecho, agarre a anchura de hombros.',
          'Baja hasta que los codos toquen el suelo. Pausa de 1 seg.',
          'Empuja explosivamente hasta extender los brazos.'
        ]
      },
      {
        name: 'Sentadilla frontal con barra', sets: '5×5 · 30 kg', badge: 'Fuerza',
        muscles: 'Cuádriceps · Core · Glúteos',
        steps: [
          'Barra apoyada en los deltoides frontales, codos altos. Pies a anchura de hombros.',
          'Baja controlado hasta muslos paralelos. Torso erguido.',
          'Sube empujando el suelo sin inclinar el torso hacia adelante.'
        ]
      },
      {
        name: 'Remo con barra inclinado', sets: '5×5 · 35 kg', badge: 'Fuerza',
        muscles: 'Dorsal · Romboides · Trapecio medio',
        steps: [
          'Inclinado ~45°, agarre prono a anchura de caderas.',
          'Tira la barra hasta el abdomen bajo. Codos pegados y hacia atrás.',
          'Baja controlado. Espalda recta durante toda la serie.'
        ]
      },
      {
        name: 'Press militar sentado con barra', sets: '5×5 · 25 kg', badge: 'Fuerza',
        muscles: 'Deltoides · Tríceps · Trapecio sup.',
        steps: [
          'Sentado en silla firme, barra a la altura de la clavícula.',
          'Empuja verticalmente hasta extender los brazos. Sin arquear la lumbar.',
          'Baja lento y controlado hasta la posición inicial.'
        ]
      }
    ]
  },
  {
    label: 'Dom', name: 'Domingo',
    focus: 'Descanso total', rest: true,
    note: 'Recuperación completa. Hidratación, sueño y descanso.',
    exercises: []
  }
]

export function getBadgeClass(badge) {
  return `badge badge-${badge.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}`
}
