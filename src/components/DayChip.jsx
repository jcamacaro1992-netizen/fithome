export default function DayChip({ label, active, rest, progress = 0, onClick }) {
  const done = progress >= 1
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 6px',
        borderRadius: '14px',
        border: active
          ? '1.5px solid var(--accent)'
          : '1.5px solid transparent',
        background: active ? 'var(--accent-dim)' : 'transparent',
        cursor: 'pointer',
        minWidth: '44px',
        transition: 'all 0.15s'
      }}
    >
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.04em',
          color: active ? 'var(--accent)' : rest ? 'var(--purple)' : 'var(--text2)',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </span>

      {/* Progress dot */}
      <div style={{
        width: 6, height: 6, borderRadius: '50%',
        background: done
          ? 'var(--success)'
          : rest
            ? 'var(--purple)'
            : active
              ? 'var(--accent)'
              : 'var(--faint)'
      }} />
    </button>
  )
}
