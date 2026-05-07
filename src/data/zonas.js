export const ZONAS = [
  {
    id: 'abdomen',
    name: 'Abdomen plano',
    sub: 'Core · Recto abdominal · Oblicuos',
    color: '#F97316',
    exercises: [
      {
        name: 'Crunch abdominal en suelo',
        sets: '3×20 · Peso corporal',
        muscles: 'Recto abdominal · Oblicuos',
        steps: [
          'Acostado boca arriba, rodillas dobladas a 90°. Manos tras la cabeza sin forzar el cuello.',
          'Contrae el abdomen y eleva los hombros del suelo. Exhala en la contracción.',
          'Baja controlado sin apoyar completamente. Mantén tensión constante en el core.'
        ]
      },
      {
        name: 'Plancha abdominal',
        sets: '3×30 seg · Peso corporal',
        muscles: 'Core · Recto abdominal · Transverso',
        steps: [
          'Apoya antebrazos y puntas de pies. Cuerpo recto de cabeza a talones.',
          'Activa el abdomen, glúteos y piernas simultáneamente. Respira de forma continua.',
          'Mantén la posición sin hundir caderas ni elevar glúteos. Mira al suelo.'
        ]
      },
      {
        name: 'Elevación de piernas en suelo',
        sets: '3×15 · Peso corporal',
        muscles: 'Recto abdominal inferior · Flexores de cadera',
        steps: [
          'Acostado boca arriba, manos bajo los glúteos, piernas juntas y extendidas.',
          'Eleva las piernas hasta 90° manteniendo la espalda baja pegada al suelo.',
          'Baja lento sin tocar el suelo. Repite controlando la fase excéntrica.'
        ]
      }
    ]
  },
  {
    id: 'gluteos',
    name: 'Glúteos firmes',
    sub: 'Glúteo mayor · Glúteo medio · Isquiotibiales',
    color: '#F59E0B',
    exercises: [
      {
        name: 'Hip thrust con barra',
        sets: '4×12 · 30 kg',
        muscles: 'Glúteo mayor y medio · Isquiotibiales',
        steps: [
          'Espalda apoyada en el sofá o cama, barra sobre caderas (con toalla protectora).',
          'Pies planos a anchura de caderas. Empuja las caderas explosivamente hacia arriba.',
          'Aprieta glúteos en la cima 1 segundo. Baja controlado sin tocar el suelo.'
        ]
      },
      {
        name: 'Patada trasera de pie',
        sets: '3×15 c/lado · Peso corporal',
        muscles: 'Glúteo mayor · Isquiotibiales',
        steps: [
          'De pie frente a una silla o pared para apoyo. Peso en una pierna, core activo.',
          'Lleva la pierna hacia atrás y arriba contrayendo el glúteo. Torso estable, sin rotar.',
          'Baja controlado. Completa todas las reps de un lado antes de cambiar.'
        ]
      },
      {
        name: 'Sentadilla sumo con mancuerna',
        sets: '3×15 · 20 kg',
        muscles: 'Glúteos · Aductores · Cuádriceps',
        steps: [
          'Pies separados más que los hombros, puntas hacia afuera 45°. Mancuerna colgando al centro con ambas manos.',
          'Desciende hasta que los muslos estén paralelos al suelo. Rodillas en línea con los pies.',
          'Sube empujando con los talones y apretando los glúteos en la posición alta.'
        ]
      }
    ]
  },
  {
    id: 'espalda',
    name: 'Espalda definida',
    sub: 'Dorsal ancho · Romboides · Erector espinal',
    color: '#4589FF',
    exercises: [
      {
        name: 'Remo con barra inclinado',
        sets: '4×8 · 30 kg',
        muscles: 'Dorsal ancho · Romboides · Trapecio medio',
        steps: [
          'De pie, inclínate ~45° con espalda recta. Agarra la barra a anchura de caderas.',
          'Tira la barra hacia el abdomen bajo, codos pegados y hacia atrás. Retrae las escápulas.',
          'Baja controlado hasta estirar los brazos completamente. Siente el estiramiento dorsal.'
        ]
      },
      {
        name: 'Superman en suelo',
        sets: '3×15 · Peso corporal',
        muscles: 'Erector espinal · Glúteos · Romboides',
        steps: [
          'Boca abajo, brazos extendidos al frente, piernas juntas. Cuerpo completamente recto.',
          'Eleva simultáneamente brazos, pecho y piernas del suelo apretando la espalda baja y glúteos.',
          'Mantén 2 segundos arriba. Baja lento sin usar impulso. Controla cada repetición.'
        ]
      },
      {
        name: 'Extensión de espalda en suelo',
        sets: '3×15 · Peso corporal',
        muscles: 'Erector espinal · Multífidos · Glúteos',
        steps: [
          'Boca abajo, manos en las sienes o bajo la frente. Piernas juntas y extendidas.',
          'Eleva el torso del suelo contrayendo la espalda baja. Sin hiperextender el cuello.',
          'Baja lento y repite. Progresión: mantener 1-2 segundos arriba en cada rep.'
        ]
      }
    ]
  },
  {
    id: 'pecho',
    name: 'Pecho y busto',
    sub: 'Pectoral mayor · Pectoral menor · Tríceps',
    color: '#EC4899',
    exercises: [
      {
        name: 'Press de suelo con barra',
        sets: '4×8 · 30 kg',
        muscles: 'Pectoral mayor · Tríceps · Deltoides ant.',
        steps: [
          'Acuéstate en el suelo, rodillas dobladas. Barra sobre el pecho, agarre a anchura de hombros.',
          'Baja la barra hasta que los codos toquen el suelo. Pausa de 1 segundo.',
          'Empuja explosivamente hasta extender los brazos. Aprieta el pecho arriba.'
        ]
      },
      {
        name: 'Apertura con mancuernas en suelo',
        sets: '3×12 · 15 kg c/u',
        muscles: 'Pectoral mayor · Pectoral menor · Coracobraquial',
        steps: [
          'Acostado, mancuernas sobre el pecho con codos ligeramente doblados, palmas enfrentadas.',
          'Abre los brazos en arco hacia los lados hasta que los codos toquen el suelo.',
          'Vuelve al centro apretando el pecho como si abrazaras un árbol. No bloquees los codos.'
        ]
      },
      {
        name: 'Fondos en silla',
        sets: '4×15 · Peso corporal',
        muscles: 'Tríceps braquial · Deltoides ant. · Pecho inf.',
        steps: [
          'Manos en el borde de una silla firme, pies en el suelo con rodillas a 90°.',
          'Baja flexionando los codos hasta ~90°. Mantén la espalda cerca de la silla.',
          'Empuja hacia arriba extendiendo los brazos completamente. Pausa arriba.'
        ]
      }
    ]
  },
  {
    id: 'piernas',
    name: 'Piernas definidas',
    sub: 'Cuádriceps · Isquiotibiales · Gemelos',
    color: '#22C55E',
    exercises: [
      {
        name: 'Sentadilla frontal con barra',
        sets: '4×10 · 30 kg',
        muscles: 'Cuádriceps · Glúteos · Core',
        steps: [
          'Barra apoyada en los deltoides frontales, codos altos. Pies a anchura de hombros.',
          'Baja controlado hasta muslos paralelos al suelo. Torso completamente erguido.',
          'Sube empujando el suelo sin inclinar el torso. Rodillas en línea con los pies.'
        ]
      },
      {
        name: 'Zancada estática con mancuernas',
        sets: '3×10 c/lado · 15 kg c/u',
        muscles: 'Glúteos · Cuádriceps · Isquiotibiales',
        steps: [
          'Posición de zancada fija. Mancuernas a los lados del cuerpo, core activo.',
          'Baja la rodilla trasera hacia el suelo lentamente en 3 segundos.',
          'Sube empujando con el pie delantero. Sin desplazarte. Cambia de pierna al finalizar.'
        ]
      },
      {
        name: 'Curl femoral en suelo',
        sets: '3×15 · Peso corporal',
        muscles: 'Isquiotibiales · Glúteos · Gemelos',
        steps: [
          'Boca abajo, piernas extendidas. Apoya la frente en los brazos cruzados.',
          'Flexiona ambas rodillas subiendo los talones hacia los glúteos de forma lenta y controlada.',
          'Baja en 3 segundos manteniendo las caderas pegadas al suelo. Sin usar impulso.'
        ]
      }
    ]
  }
]
