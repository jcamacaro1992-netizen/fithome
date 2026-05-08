export default function RestDay({ dayName, note }) {
  const tips = [
    { icon: '💧', text: 'Mantente bien hidratado durante todo el día.' },
    { icon: '😴', text: '7-9 horas de sueño aceleran la recuperación muscular.' },
    { icon: '🧘', text: 'Estiramientos suaves o caminata ligera están bien.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Main rest card */}
      <div style={{
        background: 'var(--card)',
        border: '1px solid rgba(167,139,250,0.18)',
        borderRadius: 'var(--r2)',
        overflow: 'hidden',
        display: 'flex'
      }}>
        {/* Left purple bar */}
        <div style={{ width: 4, flexShrink: 0, background: '#A78BFA' }} />

        <div style={{
          flex: 1, padding: 'clamp(14px,4vw,20px) clamp(14px,4vw,18px)',
          display: 'flex', alignItems: 'center', gap: 14
        }}>
          {/* Icon */}
          <div style={{
            width: 'clamp(44px,12vw,56px)', height: 'clamp(44px,12vw,56px)',
            borderRadius: 14, flexShrink: 0,
            background: 'rgba(167,139,250,0.1)',
            border: '1px solid rgba(167,139,250,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12"
                stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 6L18 6L18 8" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V12.5L14 14.5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
              color: '#A78BFA', letterSpacing: '0.02em', lineHeight: 1, marginBottom: 5
            }}>DESCANSO TOTAL</div>
            <div style={{
              fontSize: 'clamp(0.72rem, 2.2vw, 0.78rem)',
              color: 'var(--muted)', lineHeight: 1.5
            }}>{note}</div>
          </div>
        </div>
      </div>

      {/* Recovery tips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: '0.7rem',
          letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--muted)'
        }}>CONSEJOS DE RECUPERACIÓN</span>

        {tips.map((tip, i) => (
          <div key={i} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r)',
            padding: 'clamp(10px,2.5vw,13px) clamp(12px,3vw,16px)',
            display: 'flex', alignItems: 'center', gap: 12
          }}>
            <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}>{tip.icon}</span>
            <span style={{ fontSize: 'clamp(0.76rem, 2.3vw, 0.82rem)', color: 'var(--text2)', lineHeight: 1.45 }}>
              {tip.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
