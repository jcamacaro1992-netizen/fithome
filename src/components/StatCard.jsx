export default function StatCard({ value, label, color = 'var(--accent)' }) {
  return (
    <div style={{
      flex: 1,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r)',
      padding: '12px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px'
    }}>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: '1.7rem',
        lineHeight: 1,
        color
      }}>
        {value}
      </span>
      <span style={{
        fontSize: '0.7rem',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 600
      }}>
        {label}
      </span>
    </div>
  )
}
