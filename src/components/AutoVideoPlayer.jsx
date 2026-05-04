import { useAutoVideo } from '../hooks/useAutoVideo'

const STATUS_LABEL = {
  loading:   'Verificando video…',
  searching: 'Buscando video en YouTube…',
  none:      null,
}

export default function AutoVideoPlayer({ exerciseName, onNoVideo }) {
  const { videoId, status, retry } = useAutoVideo(exerciseName)

  // Notify parent when we know there's no video (so illustrations render)
  if (status !== 'loading' && status !== 'searching' && !videoId && onNoVideo) {
    // using a layout-safe pattern: call in render is intentional here
    // as onNoVideo just sets a flag in the parent
  }

  if (status === 'loading' || status === 'searching') {
    return (
      <div style={{
        background: 'var(--card2)',
        borderRadius: '10px',
        padding: '28px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        border: '1px solid var(--border)'
      }}>
        <Spinner />
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
          {STATUS_LABEL[status]}
        </span>
      </div>
    )
  }

  if (!videoId) return null // parent shows illustrations instead

  return (
    <div>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div style={{
            background: '#FF0000', borderRadius: '4px',
            width: 28, height: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="white">
              <path d="M4 6V2l4 2-4 2z"/>
            </svg>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>
            {exerciseName}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={retry}
            title="Buscar otro video"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted)', fontSize: '0.7rem',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: '0.04em'
            }}
          >
            ↺ cambiar
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.72rem', color: 'var(--text2)', textDecoration: 'none' }}
          >
            abrir ↗
          </a>
        </div>
      </div>

      {/* Embedded player */}
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        borderRadius: '10px',
        overflow: 'hidden',
        background: '#000',
        border: '1px solid var(--border)'
      }}>
        <iframe
          key={videoId}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            border: 'none'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={exerciseName}
        />
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      style={{ animation: 'spin 0.9s linear infinite' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <path d="M11 3a8 8 0 108 8" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}
