import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import TabBar from './components/TabBar'
import HomeScreen from './screens/HomeScreen'
import WeekScreen from './screens/WeekScreen'
import ConfigScreen from './screens/ConfigScreen'
import DetailScreen from './screens/DetailScreen'
import LoginScreen from './screens/LoginScreen'
import OnboardingScreen from './screens/OnboardingScreen'

function ProtectedLayout() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/semana" element={<WeekScreen />} />
        <Route path="/config" element={<ConfigScreen />} />
        <Route path="/ejercicio/:dayIdx/:exIdx" element={<DetailScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <TabBar />
    </div>
  )
}

export default function App() {
  const { user, loading } = useAuth()
  const [onboarded, setOnboarded] = useState(() => !!localStorage.getItem('fithome_onboarded'))

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <path d="M18 4a14 14 0 1114 14" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    )
  }

  if (!onboarded) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingScreen onFinish={() => setOnboarded(true)} />} />
      </Routes>
    )
  }

  return <ProtectedLayout />
}
