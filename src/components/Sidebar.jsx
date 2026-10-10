import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, CalendarDays, CheckSquare,
  BarChart3, ScrollText, Bell, Settings, UserPlus
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ALL_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Graphic Designer', 'Social Media Marketer'] },
  { to: '/clients', label: 'Clients', icon: Users, roles: ['Admin'] },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, roles: ['Admin', 'Graphic Designer', 'Social Media Marketer'] },
  { to: '/posts', label: 'Posts', icon: CheckSquare, roles: ['Admin'] },
  { to: '/approval', label: 'Approval', icon: CheckSquare, roles: ['Admin'] },
  { to: '/team', label: 'Team', icon: UserPlus, roles: ['Admin'] },
  { to: '/reports', label: 'Reports', icon: BarChart3, roles: ['Admin'] },
  { to: '/audit-logs', label: 'Audit Logs', icon: ScrollText, roles: ['Admin'] },
  { to: '/notifications', label: 'Notifications', icon: Bell, roles: ['Admin', 'Graphic Designer', 'Social Media Marketer'] },
  { to: '/settings', label: 'Settings', icon: Settings, roles: ['Admin'] }
]

export default function Sidebar() {
  const { currentUser } = useAuth()
  const items = ALL_ITEMS.filter((item) => item.roles.includes(currentUser?.role))

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 bg-white h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">A</div>
        <div>
          <p className="text-sm font-semibold text-secondary leading-none">Anra Social CRM</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Agency Workflow</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-secondary'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <div className="rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-xs font-medium text-secondary">{currentUser?.role}</p>
          <p className="text-[11px] text-slate-400">Signed in as {currentUser?.name}</p>
        </div>
      </div>
    </aside>
  )
}
