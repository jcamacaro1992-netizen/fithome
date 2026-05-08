import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[FitHome] Uncaught error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        textAlign: 'center'
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '16px',
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="1.8"/>
          </svg>
        </div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: '1.4rem',
          color: 'var(--text)', marginBottom: '8px'
        }}>
          Algo salió mal
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '28px', maxWidth: '280px' }}>
          Hubo un error inesperado. Recarga la app para continuar.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-accent"
          style={{ maxWidth: '200px' }}
        >
          Recargar app
        </button>
      </div>
    )
  }
}
