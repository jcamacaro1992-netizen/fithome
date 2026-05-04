export default function RestDay({ dayName, note }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      <div style={{
        width: 80, height: 80,
        borderRadius: '50%',
        background: 'rgba(167,139,250,0.12)',
        border: '1.5px solid rgba(167,139,250,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M18 8C12.48 8 8 12.48 8 18C8 23.52 12.48 28 18 28C23.52 28 28 23.52 28 18"
            stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M22 8L28 8L28 14" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 13V18L21 21" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: '1.6rem',
          color: '#A78BFA',
          letterSpacing: '0.02em',
          marginBottom: '6px'
        }}>
          {dayName} · Descanso
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '240px' }}>
          {note}
        </p>
      </div>
    </div>
  )
}
