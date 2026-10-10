import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter username and password')
      return
    }
    const success = login(username, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold">A</div>
          <span className="text-white font-semibold text-lg">Anra Social CRM</span>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-card p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-secondary">Sign in</h2>
            <p className="text-xs text-slate-400 mt-1">Enter your credentials to access the system</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
