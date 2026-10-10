import { createContext, useContext, useState } from 'react'
import { useData } from './DataContext'

const AuthContext = createContext(null)

export const permissionsByRole = {
  Admin: ['manageUsers', 'manageClients', 'assignStaff', 'approve', 'viewReports', 'managePackages', 'viewAuditLogs', 'settings'],
  'Graphic Designer': ['viewAssignedClients', 'uploadDesigns', 'editDesigns', 'markComplete', 'viewCalendar'],
  'Social Media Marketer': ['viewApprovedPosts', 'uploadLinks', 'markUploaded', 'viewAssignedClients'],
  Manager: ['viewDashboard', 'approve', 'viewReports']
}

export function AuthProvider({ children }) {
  const { teamMembers } = useData()
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username, password) => {
    const user = teamMembers.find((u) => u.username === username && u.password === password)
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const can = (permission) => permissionsByRole[currentUser?.role]?.includes(permission)

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, can }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
