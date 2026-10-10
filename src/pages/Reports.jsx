import { Download, FileSpreadsheet } from 'lucide-react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import Layout from '../components/Layout'
import { Card } from '../components/UI'
import { useData } from '../context/DataContext'

const COLORS = ['#2563EB', '#16A34A', '#F59E0B', '#DC2626', '#7C3AED']

export default function Reports() {
  const { clients, posts, teamMembers: users } = useData()
  const statusBreakdown = Object.entries(
    posts.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const trend = [
    { week: 'Wk 1', posts: 18 }, { week: 'Wk 2', posts: 24 },
    { week: 'Wk 3', posts: 21 }, { week: 'Wk 4', posts: 29 }
  ]

  const designers = users.filter((u) => u.role === 'Graphic Designer').map((u) => ({
    name: u.name,
    completed: posts.filter((p) => p.designer === u.name && (p.status === 'Uploaded' || p.status === 'Approved')).length,
    pending: posts.filter((p) => p.designer === u.name && p.status === 'Design Pending').length
  }))

  return (
    <Layout title="Reports" subtitle="Client, employee, and monthly performance">
      <div className="flex items-center justify-end gap-2 mb-4">
        <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg px-3.5 py-2 transition-colors">
          <Download size={14} /> Export PDF
        </button>
        <button className="flex items-center gap-1.5 text-sm font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg px-3.5 py-2 transition-colors">
          <FileSpreadsheet size={14} /> Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-secondary mb-4">Post Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {statusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-secondary mb-4">Monthly Post Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="posts" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5 mb-4">
        <h3 className="text-sm font-semibold text-secondary mb-4">Designer Performance</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] text-slate-400 border-b border-slate-100">
              <th className="pb-2 font-medium">Designer</th>
              <th className="pb-2 font-medium">Completed</th>
              <th className="pb-2 font-medium">Pending</th>
            </tr>
          </thead>
          <tbody>
            {designers.map((d) => (
              <tr key={d.name} className="border-b border-slate-50 last:border-0">
                <td className="py-2.5 text-secondary">{d.name}</td>
                <td className="py-2.5 text-success font-medium">{d.completed}</td>
                <td className="py-2.5 text-warning font-medium">{d.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-secondary mb-4">Client-wise Summary</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] text-slate-400 border-b border-slate-100">
              <th className="pb-2 font-medium">Client</th>
              <th className="pb-2 font-medium">Package</th>
              <th className="pb-2 font-medium">Used / Total</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 last:border-0">
                <td className="py-2.5 text-secondary">{c.companyName}</td>
                <td className="py-2.5 text-slate-500">{c.packageName}</td>
                <td className="py-2.5 text-slate-500">{c.usedPosts} / {c.totalMonthlyPosts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Layout>
  )
}
