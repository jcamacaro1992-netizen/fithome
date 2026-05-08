import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { AppProvider, useApp } from './contexts/AppContext'
import TabBar from './components/TabBar'
import HomeScreen from './screens/HomeScreen'
import WeekScreen from './screens/WeekScreen'
import ZonasScreen from './screens/ZonasScreen'
import ConfigScreen from './screens/ConfigScreen'
import NutricionScreen from './screens/NutricionScreen'
import DetailScreen from './screens/DetailScreen'
import LoginScreen from './screens/LoginScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import AdminScreen from './screens/AdminScreen'

const Spinner = () => (
  <div style={{
    minHeight: '100dvh', background: 'var(--bg)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <path d="M18 4a14 14 0 1114 14" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  </div>
)

function ProtectedLayout() {
  const { ready } = useApp()

  if (!ready) return <Spinner />

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/semana" element={<WeekScreen />} />
        <Route path="/zonas" element={<ZonasScreen />} />
        <Route path="/config" element={<ConfigScreen />} />
        <Route path="/nutricion" element={<NutricionScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
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

  if (loading) return <Spinner />

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

  return (
    <AppProvider user={user}>
      <ProtectedLayout />
    </AppProvider>
  )
}
