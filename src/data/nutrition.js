// Connects nutrition to the training day type
export const DAY_TYPE = {
  'Pecho · Tríceps':                 'training',
  'Espalda · Bíceps':                'training',
  'Piernas · Trapecio · Antebrazos': 'legs',
  'Descanso total':                  'rest',
}

export const MACRO_TARGETS = {
  training: { kcal: 2200, protein: 155, carbs: 235, fat: 72,
    label: 'Día de entrenamiento', color: '#4589FF',
    note: 'Alta proteína para recuperación y construcción muscular.' },
  legs: { kcal: 2400, protein: 145, carbs: 290, fat: 70,
    label: 'Día de piernas', color: '#F59E0B',
    note: 'Más carbohidratos para el día más exigente de la semana.' },
  rest: { kcal: 1850, protein: 130, carbs: 195, fat: 65,
    label: 'Día de descanso', color: '#A78BFA',
    note: 'Comidas ligeras para facilitar la recuperación y el descanso.' },
}

export const WATER_GLASSES = 8   // 250 ml each = 2 L

export const MEAL_PLANS = {
  training: [
    {
      id: 'tr_breakfast', slot: 'breakfast', label: 'Desayuno', time: '7:30', icon: '🌅',
      name: 'Avena proteica con plátano',
      mealPrep: false, prepTime: 10,
      ingredients: [
        { item: 'Avena', amount: '80', unit: 'g' },
        { item: 'Leche entera', amount: '300', unit: 'ml' },
        { item: 'Plátano', amount: '1', unit: 'und.' },
        { item: 'Miel', amount: '10', unit: 'g' },
        { item: 'Canela', amount: 'al gusto', unit: '' },
      ],
      macros: { kcal: 530, protein: 18, carbs: 90, fat: 10 },
      steps: [
        'Calienta la leche en un cazo a fuego medio.',
        'Agrega la avena y cocina 4-5 min removiendo sin parar.',
        'Sirve con el plátano en rodajas, miel y una pizca de canela.',
      ],
    },
    {
      id: 'tr_snack_am', slot: 'snack_am', label: 'Media mañana', time: '10:30', icon: '🥚',
      name: 'Huevos duros con manzana',
      mealPrep: false, prepTime: 12,
      ingredients: [
        { item: 'Huevos', amount: '3', unit: 'und.' },
        { item: 'Manzana', amount: '1', unit: 'und.' },
      ],
      macros: { kcal: 280, protein: 19, carbs: 20, fat: 13 },
      steps: [
        'Hierve los huevos 10-11 min. Enfría en agua fría antes de pelar.',
        'Acompaña con la manzana en gajos.',
      ],
    },
    {
      id: 'tr_lunch', slot: 'lunch', label: 'Almuerzo', time: '13:30', icon: '🍗',
      name: 'Arroz con pollo al limón',
      mealPrep: true, portions: 4, fridgeDays: 4, prepTime: 35,
      ingredients: [
        { item: 'Pechuga de pollo', amount: '180', unit: 'g' },
        { item: 'Arroz blanco', amount: '130', unit: 'g (seco)' },
        { item: 'Brócoli', amount: '200', unit: 'g' },
        { item: 'Aceite de oliva', amount: '1 cdta', unit: '' },
        { item: 'Limón, ajo, sal, pimentón', amount: 'al gusto', unit: '' },
      ],
      macros: { kcal: 565, protein: 50, carbs: 65, fat: 10 },
      steps: [
        'Cocina el arroz (doble de agua, ~20 min). Reserva.',
        'Sazona el pollo con ajo, pimentón, limón y sal.',
        'Cocina a la plancha 5-6 min por lado hasta dorar.',
        'Cuece el brócoli al vapor 5 min. Mantén un poco crocante.',
        '🔄 Meal Prep: Divide todo en 4 recipientes. Nevera hasta 4 días.',
      ],
    },
    {
      id: 'tr_snack_pm', slot: 'snack_pm', label: 'Merienda', time: '17:00', icon: '🫙',
      name: 'Yogur griego con nueces y miel',
      mealPrep: false, prepTime: 2,
      ingredients: [
        { item: 'Yogur griego 0%', amount: '200', unit: 'g' },
        { item: 'Nueces', amount: '25', unit: 'g' },
        { item: 'Miel', amount: '10', unit: 'g' },
      ],
      macros: { kcal: 305, protein: 21, carbs: 21, fat: 16 },
      steps: [
        'Sirve el yogur en un bol.',
        'Agrega las nueces picadas y rocía la miel.',
      ],
    },
    {
      id: 'tr_dinner', slot: 'dinner', label: 'Cena', time: '20:00', icon: '🐟',
      name: 'Salmón a la plancha con espinacas',
      mealPrep: false, prepTime: 15,
      ingredients: [
        { item: 'Filete de salmón', amount: '200', unit: 'g' },
        { item: 'Espinacas', amount: '150', unit: 'g' },
        { item: 'Tomate cherry', amount: '100', unit: 'g' },
        { item: 'Aceite de oliva, limón, eneldo', amount: 'al gusto', unit: '' },
      ],
      macros: { kcal: 470, protein: 41, carbs: 7, fat: 28 },
      steps: [
        'Sazona el salmón con limón, eneldo y sal.',
        'Cocina en sartén caliente 4 min por lado.',
        'Saltea las espinacas con ajo en aceite 2 min.',
        'Sirve con tomates cherry al lado.',
      ],
    },
  ],

  legs: [
    {
      id: 'lg_breakfast', slot: 'breakfast', label: 'Desayuno', time: '7:30', icon: '🌅',
      name: 'Tortitas de avena con huevos',
      mealPrep: false, prepTime: 15,
      ingredients: [
        { item: 'Avena', amount: '100', unit: 'g' },
        { item: 'Huevos', amount: '3', unit: 'und.' },
        { item: 'Leche', amount: '100', unit: 'ml' },
        { item: 'Plátano', amount: '1', unit: 'und.' },
        { item: 'Miel', amount: '10', unit: 'g' },
      ],
      macros: { kcal: 620, protein: 30, carbs: 82, fat: 18 },
      steps: [
        'Tritura avena, huevos y leche en licuadora hasta obtener masa homogénea.',
        'Cocina tortitas de 2-3 min por lado en sartén antiadherente.',
        'Sirve con plátano en rodajas y miel.',
      ],
    },
    {
      id: 'lg_snack_am', slot: 'snack_am', label: 'Pre-entreno', time: '10:30', icon: '⚡',
      name: 'Batido de plátano pre-entreno',
      mealPrep: false, prepTime: 3,
      ingredients: [
        { item: 'Plátanos', amount: '2', unit: 'und.' },
        { item: 'Leche', amount: '300', unit: 'ml' },
        { item: 'Avena', amount: '30', unit: 'g' },
        { item: 'Miel', amount: '10', unit: 'g' },
      ],
      macros: { kcal: 390, protein: 14, carbs: 72, fat: 6 },
      steps: [
        'Mezcla todos los ingredientes en licuadora 30 segundos.',
        'Consume 30-60 min antes del entrenamiento de piernas.',
      ],
    },
    {
      id: 'lg_lunch', slot: 'lunch', label: 'Almuerzo', time: '13:30', icon: '🍝',
      name: 'Pasta con pollo y salsa de tomate',
      mealPrep: true, portions: 3, fridgeDays: 3, prepTime: 30,
      ingredients: [
        { item: 'Pasta (seca)', amount: '130', unit: 'g' },
        { item: 'Pechuga de pollo', amount: '160', unit: 'g' },
        { item: 'Tomate triturado', amount: '200', unit: 'g' },
        { item: 'Ajo', amount: '2', unit: 'dientes' },
        { item: 'Aceite oliva, orégano, sal', amount: 'al gusto', unit: '' },
      ],
      macros: { kcal: 595, protein: 46, carbs: 82, fat: 11 },
      steps: [
        'Cuece la pasta al dente. Escurre y reserva.',
        'Sofríe ajo en aceite, agrega tomate triturado y cocina 10 min.',
        'Cocina el pollo en tiras y agrega a la salsa.',
        'Mezcla pasta con pollo y salsa. Ajusta sazón.',
        '🔄 Meal Prep: Divide en 3 recipientes. Nevera hasta 3 días.',
      ],
    },
    {
      id: 'lg_snack_pm', slot: 'snack_pm', label: 'Post-entreno', time: '17:30', icon: '🥤',
      name: 'Batido de recuperación',
      mealPrep: false, prepTime: 3,
      ingredients: [
        { item: 'Leche entera', amount: '300', unit: 'ml' },
        { item: 'Plátano', amount: '1', unit: 'und.' },
        { item: 'Avena', amount: '40', unit: 'g' },
        { item: 'Cacao puro', amount: '5', unit: 'g' },
      ],
      macros: { kcal: 395, protein: 16, carbs: 68, fat: 8 },
      steps: [
        'Mezcla en licuadora hasta obtener textura cremosa.',
        'Consume dentro de los 30 min post-entrenamiento.',
      ],
    },
    {
      id: 'lg_dinner', slot: 'dinner', label: 'Cena', time: '20:00', icon: '🫘',
      name: 'Lentejas estofadas con huevo',
      mealPrep: false, prepTime: 20,
      ingredients: [
        { item: 'Lentejas cocidas (lata)', amount: '200', unit: 'g' },
        { item: 'Huevos', amount: '2', unit: 'und.' },
        { item: 'Zanahoria', amount: '1', unit: 'und.' },
        { item: 'Tomate', amount: '1', unit: 'und.' },
        { item: 'Cebolla, aceite, pimentón', amount: 'al gusto', unit: '' },
      ],
      macros: { kcal: 420, protein: 26, carbs: 52, fat: 12 },
      steps: [
        'Sofríe cebolla y zanahoria rallada 5 min.',
        'Agrega tomate picado y pimentón. Cocina 3 min.',
        'Añade las lentejas con 100 ml de agua. Cocina 10 min.',
        'Sirve con los huevos cocidos encima.',
      ],
    },
  ],

  rest: [
    {
      id: 'rs_breakfast', slot: 'breakfast', label: 'Desayuno', time: '8:00', icon: '🌅',
      name: 'Yogur griego con granola y fresas',
      mealPrep: false, prepTime: 3,
      ingredients: [
        { item: 'Yogur griego 0%', amount: '250', unit: 'g' },
        { item: 'Granola o avena tostada', amount: '30', unit: 'g' },
        { item: 'Fresas', amount: '100', unit: 'g' },
        { item: 'Miel', amount: '10', unit: 'g' },
      ],
      macros: { kcal: 380, protein: 22, carbs: 52, fat: 7 },
      steps: [
        'Sirve el yogur en un bol.',
        'Agrega la granola, las fresas laminadas y la miel.',
      ],
    },
    {
      id: 'rs_snack_am', slot: 'snack_am', label: 'Media mañana', time: '10:30', icon: '☕',
      name: 'Frutos secos con café con leche',
      mealPrep: false, prepTime: 2,
      ingredients: [
        { item: 'Nueces', amount: '20', unit: 'g' },
        { item: 'Almendras', amount: '15', unit: 'g' },
        { item: 'Café con leche', amount: '200', unit: 'ml' },
      ],
      macros: { kcal: 270, protein: 10, carbs: 10, fat: 21 },
      steps: [
        'Sirve los frutos secos en un bol pequeño.',
        'Acompaña con el café con leche.',
      ],
    },
    {
      id: 'rs_lunch', slot: 'lunch', label: 'Almuerzo', time: '13:30', icon: '🥗',
      name: 'Ensalada mediterránea de garbanzos y atún',
      mealPrep: false, prepTime: 10,
      ingredients: [
        { item: 'Garbanzos cocidos', amount: '200', unit: 'g' },
        { item: 'Atún en agua (lata)', amount: '1', unit: 'lata (80 g)' },
        { item: 'Tomate', amount: '2', unit: 'und.' },
        { item: 'Pepino', amount: '1', unit: 'und.' },
        { item: 'Lechuga variada', amount: '2', unit: 'puñados' },
        { item: 'Aceite oliva + limón', amount: '1 cdta', unit: '' },
      ],
      macros: { kcal: 475, protein: 36, carbs: 48, fat: 14 },
      steps: [
        'Escurre los garbanzos y el atún.',
        'Pica tomate, pepino y lechuga.',
        'Mezcla todo y aliña con aceite y limón.',
      ],
    },
    {
      id: 'rs_snack_pm', slot: 'snack_pm', label: 'Merienda', time: '17:00', icon: '🍎',
      name: 'Manzana con queso fresco',
      mealPrep: false, prepTime: 2,
      ingredients: [
        { item: 'Manzana grande', amount: '1', unit: 'und.' },
        { item: 'Queso fresco', amount: '80', unit: 'g' },
      ],
      macros: { kcal: 200, protein: 9, carbs: 26, fat: 6 },
      steps: [
        'Corta la manzana en gajos.',
        'Sirve junto al queso fresco.',
      ],
    },
    {
      id: 'rs_dinner', slot: 'dinner', label: 'Cena', time: '20:00', icon: '🍳',
      name: 'Tortilla de espinacas con ensalada',
      mealPrep: false, prepTime: 12,
      ingredients: [
        { item: 'Huevos', amount: '3', unit: 'und.' },
        { item: 'Espinacas', amount: '100', unit: 'g' },
        { item: 'Tomate', amount: '1', unit: 'und.' },
        { item: 'Cebolla', amount: '¼', unit: 'und.' },
        { item: 'Aceite de oliva', amount: '1 cdta', unit: '' },
        { item: 'Lechuga variada', amount: '1', unit: 'puñado' },
      ],
      macros: { kcal: 365, protein: 22, carbs: 11, fat: 26 },
      steps: [
        'Saltea espinacas con cebolla 3 min. Añade sal.',
        'Bate los huevos y mezcla con las espinacas.',
        'Cocina la tortilla 2-3 min por lado a fuego medio.',
        'Sirve con ensalada de tomate y lechuga.',
      ],
    },
  ],
}

// Batch-cooking guide (prepare on Sunday / day off)
export const MEAL_PREP_GUIDE = [
  {
    id: 'prep_arroz_pollo',
    name: 'Arroz con pollo al limón',
    usedOn: 'Mar · Mié · Vie · Sáb',
    serves: 4, totalTime: 35, fridgeDays: 4,
    ingredients: [
      { item: 'Pechuga de pollo', amount: '720 g', note: '4 × 180 g' },
      { item: 'Arroz blanco', amount: '520 g', note: '4 × 130 g' },
      { item: 'Brócoli', amount: '800 g', note: '' },
      { item: 'Aceite de oliva', amount: '4 cdtas', note: '' },
      { item: 'Limones', amount: '2 und.', note: '' },
      { item: 'Ajo, sal, pimentón', amount: 'abundante', note: '' },
    ],
    steps: [
      'Cocina todo el arroz a la vez (doble de agua, 20 min). Reserva.',
      'Sazona los 4 pollos juntos con ajo, pimentón, limón y sal.',
      'Cocina en horno a 200 °C 25 min o en plancha en tandas.',
      'Cuece el brócoli al vapor 5-6 min. Mantén un poco al dente.',
      'Divide en 4 recipientes: pollo + arroz + brócoli.',
      '✅ Nevera hasta 4 días. Calienta 2-3 min en microondas.',
    ],
  },
  {
    id: 'prep_pasta_pollo',
    name: 'Pasta con pollo y tomate',
    usedOn: 'Jue (día de piernas)',
    serves: 3, totalTime: 30, fridgeDays: 3,
    ingredients: [
      { item: 'Pasta', amount: '390 g', note: '3 × 130 g' },
      { item: 'Pechuga de pollo', amount: '480 g', note: '3 × 160 g' },
      { item: 'Tomate triturado', amount: '600 g', note: '' },
      { item: 'Ajo', amount: '4 dientes', note: '' },
      { item: 'Aceite oliva, orégano', amount: 'al gusto', note: '' },
    ],
    steps: [
      'Cuece toda la pasta en olla grande. Escurre y reserva.',
      'Sofríe ajo en aceite. Agrega tomate y cocina 10 min.',
      'Cocina el pollo en tiras hasta dorar. Mezcla con la salsa.',
      'Combina pasta con la salsa de pollo.',
      '✅ Divide en 3 recipientes. Nevera hasta 3 días.',
    ],
  },
]

// Weekly shopping list
export const SHOPPING_LIST = [
  {
    category: 'Proteínas', color: '#4589FF',
    items: [
      { id: 's01', item: 'Pechuga de pollo', amount: '1.5 kg' },
      { id: 's02', item: 'Filete de salmón', amount: '600 g' },
      { id: 's03', item: 'Atún en agua (lata)', amount: '6 latas' },
      { id: 's04', item: 'Huevos', amount: '30 und.' },
      { id: 's05', item: 'Yogur griego 0%', amount: '1.5 kg' },
      { id: 's06', item: 'Queso fresco', amount: '200 g' },
    ],
  },
  {
    category: 'Cereales y carbohidratos', color: '#F59E0B',
    items: [
      { id: 's07', item: 'Avena', amount: '600 g' },
      { id: 's08', item: 'Arroz blanco', amount: '500 g' },
      { id: 's09', item: 'Pasta', amount: '400 g' },
      { id: 's10', item: 'Granola', amount: '200 g' },
    ],
  },
  {
    category: 'Legumbres', color: '#22C55E',
    items: [
      { id: 's11', item: 'Lentejas cocidas (lata)', amount: '2 latas' },
      { id: 's12', item: 'Garbanzos cocidos (lata)', amount: '2 latas' },
    ],
  },
  {
    category: 'Verduras y hortalizas', color: '#22C55E',
    items: [
      { id: 's13', item: 'Brócoli', amount: '600 g' },
      { id: 's14', item: 'Espinacas', amount: '400 g' },
      { id: 's15', item: 'Tomates', amount: '8 und.' },
      { id: 's16', item: 'Lechuga variada', amount: '1 und.' },
      { id: 's17', item: 'Zanahoria', amount: '4 und.' },
      { id: 's18', item: 'Pepino', amount: '2 und.' },
      { id: 's19', item: 'Cebolla', amount: '2 und.' },
      { id: 's20', item: 'Ajo', amount: '1 cabeza' },
      { id: 's21', item: 'Tomate cherry', amount: '200 g' },
    ],
  },
  {
    category: 'Frutas', color: '#F97316',
    items: [
      { id: 's22', item: 'Plátanos', amount: '10 und.' },
      { id: 's23', item: 'Manzanas', amount: '5 und.' },
      { id: 's24', item: 'Naranjas', amount: '4 und.' },
      { id: 's25', item: 'Fresas', amount: '300 g' },
    ],
  },
  {
    category: 'Lácteos, grasas y extras', color: '#A78BFA',
    items: [
      { id: 's26', item: 'Leche entera', amount: '3 litros' },
      { id: 's27', item: 'Aceite de oliva', amount: '500 ml' },
      { id: 's28', item: 'Nueces', amount: '200 g' },
      { id: 's29', item: 'Almendras', amount: '100 g' },
      { id: 's30', item: 'Miel', amount: '250 g' },
      { id: 's31', item: 'Cacao puro en polvo', amount: '100 g' },
    ],
  },
]
