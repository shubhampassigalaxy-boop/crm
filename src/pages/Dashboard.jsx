import { useState } from 'react'
import { Users, Image, UploadCloud, CheckCircle2, ListTodo, AlertTriangle, Calendar, Filter } from 'lucide-react'
import Layout from '../components/Layout'
import { StatCard, Card, StatusBadge } from '../components/UI'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { notifications, daysUntil } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { clients, posts } = useData()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('2026-07')
  const [showFilter, setShowFilter] = useState(false)

  const today = '2026-07-20'
  const todaysPosts = posts.filter((p) => p.date === today)
  const pendingDesigns = todaysPosts.filter((p) => p.status === 'Design Pending').length
  const pendingUploads = posts.filter((p) => p.status === 'Approved').length
  const uploadedToday = todaysPosts.filter((p) => p.status === 'Uploaded').length
  const monthlyRemaining = clients.reduce((sum, c) => sum + (c.totalMonthlyPosts - c.usedPosts), 0)
  const expiringPackages = clients.filter((c) => daysUntil(c.endDate) <= 7)

  // Get all days of selected month for the matrix
  const getDaysOfMonth = (monthStr) => {
    const [year, month] = monthStr.split('-').map(Number)
    const daysInMonth = new Date(year, month, 0).getDate()
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const monthDays = getDaysOfMonth(selectedMonth)

  // Get post status for a client on a specific date
  const getPostStatus = (clientId, date) => {
    const post = posts.find((p) => p.clientId === clientId && p.date === date)
    return post ? post.status : null
  }

  // Filter posts based on selected date and client
  const filteredPosts = posts.filter((p) => {
    const dateMatch = selectedDate ? p.date === selectedDate : true
    const clientMatch = selectedClient ? p.clientId === selectedClient : true
    return dateMatch && clientMatch
  })

  const chartData = clients.map((c) => ({
    name: c.companyName.split(' ')[0],
    used: c.usedPosts,
    remaining: Math.max(0, c.totalMonthlyPosts - c.usedPosts)
  }))

  return (
    <Layout title={`Welcome back, ${currentUser.name.split(' ')[0]}`} subtitle="Here's what's happening across your clients today">
      {/* Filter Section */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-secondary">Post Tracking Filter</h3>
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="text-xs text-primary hover:underline"
          >
            {showFilter ? 'Hide' : 'Show'}
          </button>
        </div>
        {showFilter && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Select Month</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Select Client</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary bg-white"
              >
                <option value="">All Clients</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.companyName}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Clients" value={clients.length} accent="#2563EB" />
        <StatCard icon={Image} label="Today's Pending Designs" value={pendingDesigns} accent="#F59E0B" />
        <StatCard icon={UploadCloud} label="Pending Uploads" value={pendingUploads} accent="#0EA5E9" />
        <StatCard icon={CheckCircle2} label="Uploaded Today" value={uploadedToday} accent="#16A34A" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-secondary">Monthly Post Usage by Client</h3>
            <span className="text-xs text-slate-400">{monthlyRemaining} posts remaining overall</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="used" stackId="a" fill="#2563EB" radius={[0, 0, 0, 0]} name="Used" />
              <Bar dataKey="remaining" stackId="a" fill="#DBEAFE" radius={[4, 4, 0, 0]} name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-warning" />
            <h3 className="text-sm font-semibold text-secondary">Expiring Packages</h3>
          </div>
          <div className="space-y-3">
            {expiringPackages.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg shrink-0">{c.logo}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-secondary truncate">{c.companyName}</p>
                    <p className="text-[11px] text-slate-400">{c.packageName}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-danger shrink-0">{daysUntil(c.endDate)}d left</span>
              </div>
            ))}
            {expiringPackages.length === 0 && <p className="text-xs text-slate-400">No packages expiring soon.</p>}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ListTodo size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-secondary">
              {selectedDate || selectedClient ? 'Filtered Posts' : "Today's Posts"}
            </h3>
          </div>
          <div className="space-y-2">
            {(selectedDate || selectedClient ? filteredPosts : todaysPosts).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm text-secondary truncate">{p.title}</p>
                  <p className="text-[11px] text-slate-400">{p.clientName} · {p.platform} · {p.date}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
            {(selectedDate || selectedClient ? filteredPosts : todaysPosts).length === 0 && (
              <p className="text-xs text-slate-400">No posts found for selected filters.</p>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-secondary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-2.5">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.unread ? 'bg-primary' : 'bg-slate-300'}`} />
                <div className="min-w-0">
                  <p className="text-sm text-secondary">{n.message}</p>
                  <p className="text-[11px] text-slate-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Post Status Matrix */}
      <Card className="p-5 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-secondary">
            Post Status Matrix - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 px-3 font-medium text-slate-600 text-xs sticky left-0 bg-white">Client</th>
                {monthDays.map((date) => (
                  <th key={date} className="text-center py-2 px-2 font-medium text-slate-600 text-xs min-w-[50px]">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-2 px-3 font-medium text-secondary text-xs truncate max-w-[150px] sticky left-0 bg-white">
                    {client.companyName}
                  </td>
                  {monthDays.map((date) => {
                    const status = getPostStatus(client.id, date)
                    return (
                      <td key={date} className="text-center py-2 px-2 min-w-[50px]">
                        {status === 'Uploaded' && (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                        )}
                        {status === 'Approved' && (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">○</span>
                        )}
                        {status === 'Design Pending' && (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 text-xs">!</span>
                        )}
                        {!status && <span className="text-slate-300 text-xs">-</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  )
}
