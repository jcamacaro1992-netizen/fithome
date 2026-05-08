import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  {
    path: '/',
    label: 'Hoy',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="14" rx="3"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.7"/>
        <path d="M7 3v4M15 3v4M3 10h16"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.7" strokeLinecap="round"/>
        <rect x="7" y="13" width="3" height="3" rx="1"
          fill={active ? '#fff' : 'rgba(141,163,190,0.7)'}/>
      </svg>
    )
  },
  {
    path: '/semana',
    label: 'Semana',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 11h14M4 16h9"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    path: '/zonas',
    label: 'Zonas',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <ellipse cx="11" cy="5" rx="3" ry="3.2" stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.6"/>
        <rect x="7.5" y="9" width="7" height="5" rx="1.5" stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.6"/>
        <rect x="8" y="14.5" width="2.5" height="5" rx="1.2" stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.6"/>
        <rect x="11.5" y="14.5" width="2.5" height="5" rx="1.2" stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.6"/>
        <path d="M7.5 10.5L4.5 12M14.5 10.5L17.5 12" stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    path: '/nutricion',
    label: 'Nutrición',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C7.5 3 5 6 5 9c0 4 3 6 4 9h4c1-3 4-5 4-9 0-3-2.5-6-6-6z"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.65" strokeLinejoin="round"/>
        <path d="M8.5 13.5h5M9 16h4"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 3v3M8.5 5.5L11 7M13.5 5.5L11 7"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    path: '/config',
    label: 'Ajustes',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="3"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.7"/>
        <path d="M11 3v2M11 17v2M3 11h2M17 11h2M5.64 5.64l1.42 1.42M14.94 14.94l1.42 1.42M5.64 16.36l1.42-1.42M14.94 7.06l1.42-1.42"
          stroke={active ? '#fff' : 'rgba(141,163,190,0.7)'} strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    )
  }
]

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      display: 'flex'
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '4px', padding: '10px 8px',
              background: 'transparent', border: 'none',
              cursor: 'pointer', position: 'relative'
            }}
          >
            {active && (
              <div style={{
                position: 'absolute', top: '7px',
                width: 44, height: 32,
                borderRadius: '10px',
                background: 'var(--accent)',
              }} />
            )}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {tab.icon(active)}
            </div>
            <span style={{
              fontSize: '0.62rem',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, letterSpacing: '0.05em',
              textTransform: 'uppercase', position: 'relative', zIndex: 1,
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
