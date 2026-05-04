export default function ProgressBar({ value = 0, color = 'var(--accent)', height = 4 }) {
  const pct = Math.min(1, Math.max(0, value)) * 100
  return (
    <div
      style={{ height, borderRadius: height, background: 'var(--border2)', overflow: 'hidden' }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          borderRadius: height,
          transition: 'width 0.4s ease'
        }}
      />
    </div>
  )
}
