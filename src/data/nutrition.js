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

// ─── building blocks ─────────────────────────────────────────────────────────

const BREAKFASTS = {
  training: {
    id: 'bf_training', slot: 'breakfast', label: 'Desayuno', time: '7:30', icon: '🌅',
    name: 'Avena proteica con plátano',
    mealPrep: false, prepTime: 10,
    ingredients: [
      { item: 'Avena',         amount: '80',  unit: 'g' },
      { item: 'Leche entera',  amount: '300', unit: 'ml' },
      { item: 'Plátano',       amount: '1',   unit: 'und.' },
      { item: 'Miel',          amount: '10',  unit: 'g' },
      { item: 'Canela',        amount: 'al gusto', unit: '' },
    ],
    macros: { kcal: 530, protein: 18, carbs: 90, fat: 10 },
    steps: [
      'Calienta la leche en un cazo a fuego medio.',
      'Agrega la avena y cocina 4-5 min removiendo sin parar.',
      'Sirve con el plátano en rodajas, miel y una pizca de canela.',
    ],
  },
  legs: {
    id: 'bf_legs', slot: 'breakfast', label: 'Desayuno', time: '7:30', icon: '🌅',
    name: 'Tortitas de avena con huevos',
    mealPrep: false, prepTime: 15,
    ingredients: [
      { item: 'Avena',    amount: '100', unit: 'g' },
      { item: 'Huevos',   amount: '3',   unit: 'und.' },
      { item: 'Leche',    amount: '100', unit: 'ml' },
      { item: 'Plátano',  amount: '1',   unit: 'und.' },
      { item: 'Miel',     amount: '10',  unit: 'g' },
    ],
    macros: { kcal: 620, protein: 30, carbs: 82, fat: 18 },
    steps: [
      'Tritura avena, huevos y leche en licuadora hasta obtener masa homogénea.',
      'Cocina tortitas de 2-3 min por lado en sartén antiadherente.',
      'Sirve con plátano en rodajas y miel.',
    ],
  },
  rest: {
    id: 'bf_rest', slot: 'breakfast', label: 'Desayuno', time: '8:00', icon: '🌅',
    name: 'Yogur griego con granola y fresas',
    mealPrep: false, prepTime: 3,
    ingredients: [
      { item: 'Yogur griego 0%',     amount: '250', unit: 'g' },
      { item: 'Granola o avena tostada', amount: '30', unit: 'g' },
      { item: 'Fresas',              amount: '100', unit: 'g' },
      { item: 'Miel',                amount: '10',  unit: 'g' },
    ],
    macros: { kcal: 380, protein: 22, carbs: 52, fat: 7 },
    steps: [
      'Sirve el yogur en un bol.',
      'Agrega la granola, las fresas laminadas y la miel.',
    ],
  },
}

const SNACKS_AM = {
  training: {
    id: 'sa_training', slot: 'snack_am', label: 'Media mañana', time: '10:30', icon: '🥚',
    name: 'Huevos duros con manzana',
    mealPrep: false, prepTime: 12,
    ingredients: [
      { item: 'Huevos',   amount: '3', unit: 'und.' },
      { item: 'Manzana',  amount: '1', unit: 'und.' },
    ],
    macros: { kcal: 280, protein: 19, carbs: 20, fat: 13 },
    steps: [
      'Hierve los huevos 10-11 min. Enfría en agua fría antes de pelar.',
      'Acompaña con la manzana en gajos.',
    ],
  },
  legs: {
    id: 'sa_legs', slot: 'snack_am', label: 'Pre-entreno', time: '10:30', icon: '⚡',
    name: 'Batido de plátano pre-entreno',
    mealPrep: false, prepTime: 3,
    ingredients: [
      { item: 'Plátanos', amount: '2',   unit: 'und.' },
      { item: 'Leche',    amount: '300', unit: 'ml' },
      { item: 'Avena',    amount: '30',  unit: 'g' },
      { item: 'Miel',     amount: '10',  unit: 'g' },
    ],
    macros: { kcal: 390, protein: 14, carbs: 72, fat: 6 },
    steps: [
      'Mezcla todos los ingredientes en licuadora 30 segundos.',
      'Consume 30-60 min antes del entrenamiento de piernas.',
    ],
  },
  rest: {
    id: 'sa_rest', slot: 'snack_am', label: 'Media mañana', time: '10:30', icon: '☕',
    name: 'Frutos secos con café con leche',
    mealPrep: false, prepTime: 2,
    ingredients: [
      { item: 'Nueces',          amount: '20',  unit: 'g' },
      { item: 'Almendras',       amount: '15',  unit: 'g' },
      { item: 'Café con leche',  amount: '200', unit: 'ml' },
    ],
    macros: { kcal: 270, protein: 10, carbs: 10, fat: 21 },
    steps: [
      'Sirve los frutos secos en un bol pequeño.',
      'Acompaña con el café con leche.',
    ],
  },
}

const SNACKS_PM = {
  training: {
    id: 'sp_training', slot: 'snack_pm', label: 'Merienda', time: '17:00', icon: '🫙',
    name: 'Yogur griego con nueces y miel',
    mealPrep: false, prepTime: 2,
    ingredients: [
      { item: 'Yogur griego 0%', amount: '200', unit: 'g' },
      { item: 'Nueces',          amount: '25',  unit: 'g' },
      { item: 'Miel',            amount: '10',  unit: 'g' },
    ],
    macros: { kcal: 305, protein: 21, carbs: 21, fat: 16 },
    steps: [
      'Sirve el yogur en un bol.',
      'Agrega las nueces picadas y rocía la miel.',
    ],
  },
  legs: {
    id: 'sp_legs', slot: 'snack_pm', label: 'Post-entreno', time: '17:30', icon: '🥤',
    name: 'Batido de recuperación',
    mealPrep: false, prepTime: 3,
    ingredients: [
      { item: 'Leche entera', amount: '300', unit: 'ml' },
      { item: 'Plátano',      amount: '1',   unit: 'und.' },
      { item: 'Avena',        amount: '40',  unit: 'g' },
      { item: 'Cacao puro',   amount: '5',   unit: 'g' },
    ],
    macros: { kcal: 395, protein: 16, carbs: 68, fat: 8 },
    steps: [
      'Mezcla en licuadora hasta obtener textura cremosa.',
      'Consume dentro de los 30 min post-entrenamiento.',
    ],
  },
  rest: {
    id: 'sp_rest', slot: 'snack_pm', label: 'Merienda', time: '17:00', icon: '🍎',
    name: 'Manzana con queso fresco',
    mealPrep: false, prepTime: 2,
    ingredients: [
      { item: 'Manzana grande', amount: '1',  unit: 'und.' },
      { item: 'Queso fresco',   amount: '80', unit: 'g' },
    ],
    macros: { kcal: 200, protein: 9, carbs: 26, fat: 6 },
    steps: [
      'Corta la manzana en gajos.',
      'Sirve junto al queso fresco.',
    ],
  },
}

// ─── meal-prep lunches (2 days each) ─────────────────────────────────────────

const LUNCHES = {
  arroz: {
    id: 'lu_arroz', slot: 'lunch', label: 'Almuerzo', time: '13:30', icon: '🍗',
    name: 'Arroz con pollo al limón',
    mealPrep: true, portions: 2, fridgeDays: 3, prepTime: 35,
    ingredients: [
      { item: 'Pechuga de pollo',           amount: '180', unit: 'g' },
      { item: 'Arroz blanco',               amount: '130', unit: 'g (seco)' },
      { item: 'Brócoli',                    amount: '200', unit: 'g' },
      { item: 'Aceite de oliva',            amount: '1 cdta', unit: '' },
      { item: 'Limón, ajo, sal, pimentón',  amount: 'al gusto', unit: '' },
    ],
    macros: { kcal: 565, protein: 50, carbs: 65, fat: 10 },
    steps: [
      'Cocina el arroz (doble de agua, ~20 min). Reserva.',
      'Sazona el pollo con ajo, pimentón, limón y sal.',
      'Cocina a la plancha 5-6 min por lado hasta dorar.',
      'Cuece el brócoli al vapor 5 min. Mantén un poco crocante.',
      '🔄 Meal Prep: Divide en 2 recipientes. Lunes y Martes.',
    ],
  },
  pure: {
    id: 'lu_pure', slot: 'lunch', label: 'Almuerzo', time: '13:30', icon: '🥔',
    name: 'Puré de patata con salsa boloñesa',
    mealPrep: true, portions: 2, fridgeDays: 3, prepTime: 35,
    ingredients: [
      { item: 'Patatas',            amount: '300', unit: 'g' },
      { item: 'Carne picada',       amount: '150', unit: 'g' },
      { item: 'Tomate triturado',   amount: '150', unit: 'g' },
      { item: 'Leche entera',       amount: '80',  unit: 'ml' },
      { item: 'Mantequilla',        amount: '10',  unit: 'g' },
      { item: 'Cebolla, ajo, aceite, orégano', amount: 'al gusto', unit: '' },
    ],
    macros: { kcal: 580, protein: 44, carbs: 62, fat: 16 },
    steps: [
      'Cuece las patatas peladas en agua con sal 20 min hasta tiernas.',
      'Escurre y aplasta con mantequilla y leche. Ajusta de sal.',
      'Sofríe ajo y cebolla 5 min. Agrega la carne picada y dora bien.',
      'Añade tomate triturado y orégano. Cocina 10 min a fuego medio.',
      '🔄 Meal Prep: Divide en 2 recipientes (puré + salsa separados). Miércoles y Jueves.',
    ],
  },
  pasta: {
    id: 'lu_pasta', slot: 'lunch', label: 'Almuerzo', time: '13:30', icon: '🍝',
    name: 'Pasta con pollo y salsa de tomate',
    mealPrep: true, portions: 2, fridgeDays: 3, prepTime: 30,
    ingredients: [
      { item: 'Pasta (seca)',                      amount: '130', unit: 'g' },
      { item: 'Pechuga de pollo',                  amount: '160', unit: 'g' },
      { item: 'Tomate triturado',                  amount: '200', unit: 'g' },
      { item: 'Ajo',                               amount: '2',   unit: 'dientes' },
      { item: 'Aceite oliva, orégano, sal',        amount: 'al gusto', unit: '' },
    ],
    macros: { kcal: 595, protein: 46, carbs: 82, fat: 11 },
    steps: [
      'Cuece la pasta al dente. Escurre y reserva.',
      'Sofríe ajo en aceite, agrega tomate triturado y cocina 10 min.',
      'Cocina el pollo en tiras y agrega a la salsa.',
      'Mezcla pasta con pollo y salsa. Ajusta sazón.',
      '🔄 Meal Prep: Divide en 2 recipientes. Viernes y Sábado.',
    ],
  },
}

// ─── 2 rotating dinners ───────────────────────────────────────────────────────

const DINNERS = {
  A: {
    id: 'dn_A', slot: 'dinner', label: 'Cena', time: '20:00', icon: '🐟',
    name: 'Salmón a la plancha con espinacas',
    mealPrep: false, prepTime: 15,
    ingredients: [
      { item: 'Filete de salmón',              amount: '200', unit: 'g' },
      { item: 'Espinacas',                     amount: '150', unit: 'g' },
      { item: 'Tomate cherry',                 amount: '100', unit: 'g' },
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
  B: {
    id: 'dn_B', slot: 'dinner', label: 'Cena', time: '20:00', icon: '🍗',
    name: 'Pechuga al horno con pimientos',
    mealPrep: false, prepTime: 30,
    ingredients: [
      { item: 'Pechuga de pollo',              amount: '200', unit: 'g' },
      { item: 'Pimiento rojo',                 amount: '1',   unit: 'und.' },
      { item: 'Pimiento verde',                amount: '1',   unit: 'und.' },
      { item: 'Tomate cherry',                 amount: '100', unit: 'g' },
      { item: 'Aceite de oliva, ajo, tomillo, sal', amount: 'al gusto', unit: '' },
    ],
    macros: { kcal: 360, protein: 44, carbs: 10, fat: 14 },
    steps: [
      'Precalienta el horno a 200 °C.',
      'Coloca el pollo en bandeja con los pimientos en tiras y los tomates cherry.',
      'Rocía con aceite, ajo picado, tomillo y sal.',
      'Hornea 25-30 min hasta que el pollo esté dorado y los pimientos tiernos.',
    ],
  },
}

// ─── day plan (index matches DAYS array 0=Lun … 6=Dom) ──────────────────────

export const DAY_PLAN = [
  { type: 'rest',     lunch: 'arroz', dinner: 'A' }, // 0 Lun
  { type: 'training', lunch: 'arroz', dinner: 'B' }, // 1 Mar
  { type: 'training', lunch: 'pure',  dinner: 'A' }, // 2 Mié
  { type: 'legs',     lunch: 'pure',  dinner: 'B' }, // 3 Jue
  { type: 'training', lunch: 'pasta', dinner: 'A' }, // 4 Vie
  { type: 'training', lunch: 'pasta', dinner: 'B' }, // 5 Sáb
  { type: 'rest',     lunch: null,    dinner: null }, // 6 Dom (descanso)
]

export const LUNCH_LABEL = { arroz: 'Arroz', pure: 'Puré', pasta: 'Pasta' }

export function getMealsForDay(dayIdx) {
  const plan = DAY_PLAN[dayIdx] ?? DAY_PLAN[6]
  const { type, lunch, dinner } = plan
  return [
    BREAKFASTS[type],
    SNACKS_AM[type],
    lunch  ? LUNCHES[lunch]  : null,
    SNACKS_PM[type],
    dinner ? DINNERS[dinner] : null,
  ].filter(Boolean)
}

// ─── meal prep guides (one per lunch type, ×2 portions each) ─────────────────

export const MEAL_PREP_GUIDE = [
  {
    id: 'prep_arroz',
    name: 'Arroz con pollo al limón',
    usedOn: 'Lunes · Martes',
    serves: 2, totalTime: 35, fridgeDays: 3,
    ingredients: [
      { item: 'Pechuga de pollo',  amount: '360 g',  note: '2 × 180 g' },
      { item: 'Arroz blanco',      amount: '260 g',  note: '2 × 130 g' },
      { item: 'Brócoli',           amount: '400 g',  note: '' },
      { item: 'Aceite de oliva',   amount: '2 cdtas', note: '' },
      { item: 'Limones',           amount: '1 und.', note: '' },
      { item: 'Ajo, sal, pimentón', amount: 'abundante', note: '' },
    ],
    steps: [
      'Cocina todo el arroz a la vez (doble de agua, 20 min). Reserva.',
      'Sazona ambas pechugas con ajo, pimentón, limón y sal.',
      'Cocina en plancha o sartén 5-6 min por lado. Deja reposar y trocea.',
      'Cuece el brócoli al vapor 5-6 min. Mantén al dente.',
      'Divide en 2 recipientes: pollo + arroz + brócoli.',
      '✅ Nevera hasta 3 días. Calienta 2-3 min en microondas.',
    ],
  },
  {
    id: 'prep_pure',
    name: 'Puré de patata con salsa boloñesa',
    usedOn: 'Miércoles · Jueves',
    serves: 2, totalTime: 35, fridgeDays: 3,
    ingredients: [
      { item: 'Patatas',           amount: '600 g',  note: '2 × 300 g' },
      { item: 'Carne picada',      amount: '300 g',  note: '2 × 150 g' },
      { item: 'Tomate triturado',  amount: '300 g',  note: '' },
      { item: 'Leche entera',      amount: '160 ml', note: '' },
      { item: 'Mantequilla',       amount: '20 g',   note: '' },
      { item: 'Cebolla, ajo, aceite, orégano', amount: 'al gusto', note: '' },
    ],
    steps: [
      'Cuece las patatas peladas en agua con sal 20 min hasta tiernas.',
      'Escurre y aplasta con mantequilla y leche. Ajusta de sal. Reserva.',
      'Sofríe ajo y cebolla 5 min. Agrega toda la carne y dora bien.',
      'Añade tomate triturado y orégano. Cocina 10 min a fuego medio.',
      'Guarda el puré y la salsa en recipientes separados (2 de cada).',
      '✅ Nevera hasta 3 días. Calienta por separado y mezcla al servir.',
    ],
  },
  {
    id: 'prep_pasta',
    name: 'Pasta con pollo y salsa de tomate',
    usedOn: 'Viernes · Sábado',
    serves: 2, totalTime: 30, fridgeDays: 3,
    ingredients: [
      { item: 'Pasta (seca)',       amount: '260 g',  note: '2 × 130 g' },
      { item: 'Pechuga de pollo',   amount: '320 g',  note: '2 × 160 g' },
      { item: 'Tomate triturado',   amount: '400 g',  note: '' },
      { item: 'Ajo',                amount: '3 dientes', note: '' },
      { item: 'Aceite oliva, orégano', amount: 'al gusto', note: '' },
    ],
    steps: [
      'Cuece toda la pasta en olla grande. Escurre y reserva.',
      'Sofríe ajo en aceite. Agrega tomate y cocina 10 min.',
      'Cocina el pollo en tiras hasta dorar. Mezcla con la salsa.',
      'Combina pasta con la salsa de pollo.',
      '✅ Divide en 2 recipientes. Nevera hasta 3 días.',
    ],
  },
]

// ─── weekly shopping list ─────────────────────────────────────────────────────

export const SHOPPING_LIST = [
  {
    category: 'Proteínas', color: '#4589FF',
    items: [
      { id: 's01', item: 'Pechuga de pollo',    amount: '1.5 kg' },
      { id: 's02', item: 'Carne picada',         amount: '600 g' },
      { id: 's03', item: 'Filete de salmón',     amount: '600 g' },
      { id: 's04', item: 'Huevos',               amount: '24 und.' },
      { id: 's05', item: 'Yogur griego 0%',      amount: '1.2 kg' },
      { id: 's06', item: 'Queso fresco',         amount: '200 g' },
    ],
  },
  {
    category: 'Cereales y carbohidratos', color: '#F59E0B',
    items: [
      { id: 's07', item: 'Avena',        amount: '600 g' },
      { id: 's08', item: 'Arroz blanco', amount: '500 g' },
      { id: 's09', item: 'Pasta',        amount: '500 g' },
      { id: 's10', item: 'Granola',      amount: '200 g' },
      { id: 's11', item: 'Patatas',      amount: '1.2 kg' },
    ],
  },
  {
    category: 'Verduras y hortalizas', color: '#22C55E',
    items: [
      { id: 's12', item: 'Brócoli',           amount: '400 g' },
      { id: 's13', item: 'Espinacas',         amount: '400 g' },
      { id: 's14', item: 'Tomate triturado (lata)', amount: '2 latas' },
      { id: 's15', item: 'Tomates frescos',   amount: '4 und.' },
      { id: 's16', item: 'Tomate cherry',     amount: '300 g' },
      { id: 's17', item: 'Pimiento rojo',     amount: '3 und.' },
      { id: 's18', item: 'Pimiento verde',    amount: '3 und.' },
      { id: 's19', item: 'Cebolla',           amount: '2 und.' },
      { id: 's20', item: 'Ajo',               amount: '1 cabeza' },
    ],
  },
  {
    category: 'Frutas', color: '#F97316',
    items: [
      { id: 's21', item: 'Plátanos',   amount: '10 und.' },
      { id: 's22', item: 'Manzanas',   amount: '6 und.' },
      { id: 's23', item: 'Fresas',     amount: '300 g' },
      { id: 's24', item: 'Limones',    amount: '4 und.' },
    ],
  },
  {
    category: 'Lácteos, grasas y extras', color: '#A78BFA',
    items: [
      { id: 's25', item: 'Leche entera',       amount: '3 litros' },
      { id: 's26', item: 'Mantequilla',        amount: '100 g' },
      { id: 's27', item: 'Aceite de oliva',    amount: '500 ml' },
      { id: 's28', item: 'Nueces',             amount: '200 g' },
      { id: 's29', item: 'Almendras',          amount: '100 g' },
      { id: 's30', item: 'Miel',               amount: '250 g' },
      { id: 's31', item: 'Cacao puro en polvo', amount: '100 g' },
    ],
  },
]
