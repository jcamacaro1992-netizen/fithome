import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  {
    path: '/',
    label: 'Hoy',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="14" rx="3" stroke={active ? '#C6F135' : '#B0B2BA'} strokeWidth="1.7"/>
        <path d="M7 3v4M15 3v4M3 10h16" stroke={active ? '#C6F135' : '#B0B2BA'} strokeWidth="1.7" strokeLinecap="round"/>
        <rect x="7" y="13" width="3" height="3" rx="1" fill={active ? '#C6F135' : '#B0B2BA'}/>
      </svg>
    )
  },
  {
    path: '/semana',
    label: 'Semana',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 11h14M4 16h9" stroke={active ? '#C6F135' : '#B0B2BA'} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    path: '/config',
    label: 'Ajustes',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="3" stroke={active ? '#C6F135' : '#B0B2BA'} strokeWidth="1.7"/>
        <path d="M11 3v2M11 17v2M3 11h2M17 11h2M5.64 5.64l1.42 1.42M14.94 14.94l1.42 1.42M5.64 16.36l1.42-1.42M14.94 7.06l1.42-1.42"
          stroke={active ? '#C6F135' : '#B0B2BA'} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    )
  }
]

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg2)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)'
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s'
            }}
          >
            {tab.icon(active)}
            <span style={{
              fontSize: '0.65rem',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: active ? 'var(--accent)' : 'var(--muted)'
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
