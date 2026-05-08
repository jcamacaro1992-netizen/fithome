const SLIDES = [
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke="var(--accent)" strokeWidth="2" opacity="0.2"/>
        <path d="M28 12C28 12 14 20 14 31C14 38.732 20.268 45 28 45C35.732 45 42 38.732 42 31C42 20 28 12 28 12Z" stroke="var(--accent)" strokeWidth="2.5" fill="none"/>
        <path d="M21 33L25.5 28.5L29.5 32.5L36 25" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Bienvenido a FitHome',
    body: 'Rutina de fuerza para casa: mancuernas 15 kg, barra 10 kg + discos. Sin saltos, sin gimnasio.'
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke="var(--accent)" strokeWidth="2" opacity="0.2"/>
        <rect x="14" y="20" width="28" height="22" rx="4" stroke="var(--accent)" strokeWidth="2.2"/>
        <path d="M20 17v6M36 17v6M14 30h28" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"/>
        <rect x="20" y="36" width="5" height="5" rx="1.5" fill="var(--accent)"/>
      </svg>
    ),
    title: 'Lun–Dom estructurado',
    body: 'Pecho · Tríceps, Espalda · Bíceps, Piernas y días de descanso. Todo balanceado para maximizar la recuperación.'
  },
  {
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke="var(--accent)" strokeWidth="2" opacity="0.2"/>
        <rect x="16" y="18" width="24" height="15" rx="3" stroke="var(--accent)" strokeWidth="2"/>
        <path d="M22 33v5M34 33v5M19 38h18" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M23 25l3 3 5-5" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Registra cada serie',
    body: 'Marca tus series, ajusta peso y repeticiones, ve tus videos tutoriales y sigue tu progreso semana a semana.'
  }
]

export default function OnboardingScreen({ onFinish }) {
  function finish() {
    localStorage.setItem('fithome_onboarded', '1')
    if (onFinish) onFinish()
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0 0 40px'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {SLIDES.map((slide, i) => (
          <div key={i} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 28px',
            textAlign: 'center',
            borderBottom: i < SLIDES.length - 1 ? '1px solid var(--border)' : 'none'
          }}>
            <div style={{ marginBottom: '16px' }}>{slide.icon}</div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'var(--text)',
              marginBottom: '8px',
              letterSpacing: '0.02em'
            }}>
              {slide.title}
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '280px' }}>
              {slide.body}
            </p>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 24px' }}>
        <button className="btn-accent" onClick={finish}>
          Empezar
        </button>
      </div>
    </div>
  )
}
