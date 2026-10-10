import { Search, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { notifications } from '../data/mockData'

export default function Topbar({ title, subtitle }) {
  const { currentUser, switchRole } = useAuth()
  const { teamMembers } = useData()
  const navigate = useNavigate()
  const unread = notifications.filter((n) => n.unread).length

  return (
    <header className="h-16 sticky top-0 z-10 flex items-center justify-between gap-4 px-4 lg:px-8 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-secondary truncate">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 truncate">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-64">
          <Search size={15} className="text-slate-400" />
          <input
            placeholder="Search clients, posts..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={() => navigate('/notifications')}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
          )}
        </button>

        <select
          value={currentUser?.id}
          onChange={(e) => switchRole(e.target.value)}
          title="Switch role (demo)"
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 outline-none max-w-[180px]"
        >
          {teamMembers.map((u) => (
            <option key={u.id} value={u.id}>{u.name} — {u.role}</option>
          ))}
        </select>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
          style={{ backgroundColor: currentUser?.avatarColor }}
        >
          {currentUser?.name.split(' ').map((n) => n[0]).join('')}
        </div>
      </div>
    </header>
  )
}
