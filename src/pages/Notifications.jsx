import { Clock, AlertTriangle, CheckSquare, Bell } from 'lucide-react'
import Layout from '../components/Layout'
import { Card } from '../components/UI'
import { notifications } from '../data/mockData'

const ICONS = { expiry: AlertTriangle, pending: Clock, approval: CheckSquare, overdue: Bell }
const COLORS = { expiry: '#DC2626', pending: '#F59E0B', approval: '#2563EB', overdue: '#DC2626' }

export default function Notifications() {
  return (
    <Layout title="Notification Center" subtitle={`${notifications.filter((n) => n.unread).length} unread`}>
      <Card className="divide-y divide-slate-50">
        {notifications.map((n) => {
          const Icon = ICONS[n.type] || Bell
          return (
            <div key={n.id} className={`flex items-start gap-3 p-4 ${n.unread ? 'bg-primary-50/30' : ''}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${COLORS[n.type]}1A` }}>
                <Icon size={15} style={{ color: COLORS[n.type] }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-secondary">{n.message}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
            </div>
          )
        })}
      </Card>
    </Layout>
  )
}
