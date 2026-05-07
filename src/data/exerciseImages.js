// Stable exercise reference images from Wikimedia Commons
// Used as fallback when no YouTube video is available
export const EXERCISE_IMAGES = {
  'Press de suelo con barra':
    'https://upload.wikimedia.org/wikipedia/commons/e/e4/One_arm_barbell_floor_press_1.svg',
  'Press de suelo con mancuernas':
    'https://upload.wikimedia.org/wikipedia/commons/0/01/Bench_press_dumbbell_1.svg',
  'Press militar sentado con barra':
    'https://upload.wikimedia.org/wikipedia/commons/d/d7/Seated_military_press_1.svg',
  'Press lateral con mancuernas':
    'https://upload.wikimedia.org/wikipedia/commons/d/d8/DumbbellLateralRaise.JPG',
  'Fondos en silla':
    'https://upload.wikimedia.org/wikipedia/commons/d/d0/Bench-dips-1.png',
  'Plancha abdominal':
    'https://upload.wikimedia.org/wikipedia/commons/e/ee/Plank.jpg',
  'Remo con barra inclinado':
    'https://upload.wikimedia.org/wikipedia/commons/e/e1/Barbell_row.jpg',
  'Remo con mancuerna un brazo':
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Rear_deltoid_row_dumbbell_1.svg',
  'Curl de bíceps con barra':
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Wide_grip_standing_biceps_curl_with_barbell_2.svg',
  'Curl martillo con mancuernas':
    'https://upload.wikimedia.org/wikipedia/commons/0/06/Bicep_hammer_curl_with_dumbbell_1.svg',
  'Curl de concentración':
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Concentration_curls_with_dumbbell_1.svg',
  'Plancha lateral':
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Side_Plank.jpg',
  'Sentadilla goblet con barra':
    'https://upload.wikimedia.org/wikipedia/commons/e/e6/Squats.gif',
  'Peso muerto con barra':
    'https://upload.wikimedia.org/wikipedia/commons/2/2e/Deadlift_illustration.jpg',
  'Hip thrust con barra':
    'https://upload.wikimedia.org/wikipedia/commons/3/34/Glute-bridge.png',
  'Zancada estática con mancuernas':
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/Barbell_lunges_1.svg',
  'Sentadilla isométrica en pared':
    'https://upload.wikimedia.org/wikipedia/commons/c/c4/Airline_position.svg',
  'Ab rollout con barra':
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Ab_rollout_with_barbell_1.svg',
  'Apertura con mancuernas en suelo':
    'https://upload.wikimedia.org/wikipedia/commons/c/ce/Dumbbell_flys_1.svg',
  'Press francés en suelo con barra':
    'https://upload.wikimedia.org/wikipedia/commons/2/26/Lying_triceps_extension_with_dumbbells_1.svg',
  'Extensión de tríceps sobre cabeza':
    'https://upload.wikimedia.org/wikipedia/commons/f/ff/Seated_overhead_triceps_extension_with_barbell_1.svg',
  'Peso muerto rumano con barra':
    'https://upload.wikimedia.org/wikipedia/commons/e/e8/Romanian-deadlift-1.png',
  'Encogimientos con barra':
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Shoulder_shrugs_1.svg',
  'Curl de muñeca con barra':
    'https://upload.wikimedia.org/wikipedia/commons/2/29/Exercise_Wrist_Curls.png',
  'Extensión de muñeca con barra':
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Wrist_curl_flexion_to_strengthen_UCL.JPG',
  'Sentadilla frontal con barra':
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Front_squat_with_barbell_1.svg',
  'Movilidad torácica':
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Diaphragmatic_breathing.gif',
  'Apertura de caderas (paloma)':
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Eka_Pada_Rajakapotasana_-_One_Legged_Royal_Pigeon_Pose.jpg',
  'Estiramiento de pecho en marco':
    'https://upload.wikimedia.org/wikipedia/commons/3/35/Plank_exercise.svg',
  'Estiramiento isquiotibiales':
    'https://upload.wikimedia.org/wikipedia/commons/3/32/Hamstring_stretch-CDC_strength_training_for_older_adults.gif',
  'Respiración diafragmática':
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Diaphragmatic_breathing.gif',
  'Crunch abdominal en suelo':
    'https://upload.wikimedia.org/wikipedia/commons/1/11/Crunches_1.svg',
  'Elevación de piernas en suelo':
    'https://upload.wikimedia.org/wikipedia/commons/5/50/Legraises.gif',
  'Patada trasera de pie':
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Superman_exercise%2C_isometric_back_hyperextension.png',
  'Sentadilla sumo con mancuerna':
    'https://upload.wikimedia.org/wikipedia/commons/9/95/Wide_stance_squat_with_barbell_1.svg',
  'Superman en suelo':
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Superman_exercise%2C_isometric_back_hyperextension.png',
  'Extensión de espalda en suelo':
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Hyperextensions_1.svg',
  'Curl femoral en suelo':
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Lying_leg_curl_machine_1.svg',
}

export function getExerciseImage(exerciseName) {
  return EXERCISE_IMAGES[exerciseName] ?? null
}
