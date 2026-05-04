import { useNavigate } from 'react-router-dom'

export default function NavHeader({ title, badge, badgeColor }) {
  const navigate = useNavigate()
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          width: 36, height: 36,
          borderRadius: '50%',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0
        }}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M7 1L1 7L7 13" stroke="var(--text2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <span style={{
        flex: 1,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: '1.1rem',
        color: 'var(--text)',
        letterSpacing: '0.02em'
      }}>
        {title}
      </span>

      {badge && (
        <span className={`badge badge-${badge.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}`}
          style={{ color: badgeColor }}
        >
          {badge}
        </span>
      )}
    </div>
  )
}
