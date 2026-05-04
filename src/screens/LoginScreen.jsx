import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LoginScreen() {
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
        setSuccess('Revisa tu correo para confirmar tu cuenta.')
      }
    } catch (err) {
      setError(err.message ?? 'Ocurrió un error.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message ?? 'Error con Google.')
    }
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '36px', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: '20px',
          background: 'var(--accent-dim)',
          border: '1.5px solid var(--accent-glow)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M19 6C19 6 8 13 8 22C8 28.627 12.925 34 19 34C25.075 34 30 28.627 30 22C30 13 19 6 19 6Z"
              stroke="#C6F135" strokeWidth="2.2" fill="none"/>
            <path d="M14 24L17.5 20.5L20.5 23.5L25 18" stroke="#C6F135" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: '2.2rem',
          letterSpacing: '0.04em',
          color: 'var(--accent)',
          marginBottom: '4px'
        }}>
          FitHome
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
          Tu rutina de entrenamiento en casa
        </p>
      </div>

      {/* Form card */}
      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r2)',
        padding: '24px'
      }}>
        {/* Mode toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--card2)',
          borderRadius: 'var(--r)',
          padding: '3px',
          marginBottom: '20px'
        }}>
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setSuccess('') }}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '10px',
                border: 'none',
                background: mode === m ? 'var(--card)' : 'transparent',
                color: mode === m ? 'var(--text)' : 'var(--muted)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {m === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text2)', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Email
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text2)', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contraseña
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255,69,69,0.1)',
              border: '1px solid rgba(255,69,69,0.3)',
              borderRadius: '10px',
              padding: '10px 12px',
              color: 'var(--red)',
              fontSize: '0.83rem'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: 'rgba(31,209,106,0.1)',
              border: '1px solid rgba(31,209,106,0.3)',
              borderRadius: '10px',
              padding: '10px 12px',
              color: 'var(--success)',
              fontSize: '0.83rem'
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            className="btn-accent"
            disabled={loading}
            style={{ marginTop: '4px', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Cargando…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          margin: '16px 0',
          color: 'var(--faint)', fontSize: '0.78rem'
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          o
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="btn-outline"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continuar con Google
        </button>
      </div>
    </div>
  )
}
