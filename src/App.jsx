import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import CalendarPage from './pages/CalendarPage'
import Posts from './pages/Posts'
import Approval from './pages/Approval'
import Team from './pages/Team'
import Reports from './pages/Reports'
import AuditLogs from './pages/AuditLogs'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'

function Protected({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AdminOnly({ children }) {
  const { currentUser, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (currentUser?.role !== 'Admin') return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/clients" element={<AdminOnly><Clients /></AdminOnly>} />
      <Route path="/calendar" element={<Protected><CalendarPage /></Protected>} />
      <Route path="/posts" element={<AdminOnly><Posts /></AdminOnly>} />
      <Route path="/approval" element={<AdminOnly><Approval /></AdminOnly>} />
      <Route path="/team" element={<AdminOnly><Team /></AdminOnly>} />
      <Route path="/reports" element={<AdminOnly><Reports /></AdminOnly>} />
      <Route path="/audit-logs" element={<AdminOnly><AuditLogs /></AdminOnly>} />
      <Route path="/notifications" element={<Protected><Notifications /></Protected>} />
      <Route path="/settings" element={<AdminOnly><Settings /></AdminOnly>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </DataProvider>
  )
}
