import { useState } from 'react'
import Layout from '../components/Layout'
import { Card, Progress, StatusBadge } from '../components/UI'
import { useData } from '../context/DataContext'

export default function Posts() {
  const { posts, clients } = useData()
  const [clientFilter, setClientFilter] = useState('all')

  const filtered = posts.filter((p) => clientFilter === 'all' || p.clientId === clientFilter)
  const doneCount = filtered.filter((p) => p.status === 'Uploaded').length

  return (
    <Layout title="Posts" subtitle="Overview of all posts across clients">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 outline-none"
        >
          <option value="all">All Clients</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
        </select>

        <div className="flex items-center gap-3 min-w-[180px]">
          <span className="text-sm text-secondary font-medium whitespace-nowrap">
            {doneCount} / {filtered.length} done
          </span>
          <div className="w-32">
            <Progress value={doneCount} max={filtered.length || 1} color="#16A34A" />
          </div>
        </div>
      </div>

      <Card className="divide-y divide-slate-50">
        {filtered.map((p) => (
          <div key={p.id} className="w-full flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className={`text-sm ${p.status === 'Uploaded' ? 'text-slate-400 line-through' : 'text-secondary'}`}>{p.title}</p>
              <p className="text-[11px] text-slate-400">{p.clientName} · {p.platform} · {p.date}</p>
            </div>
            <StatusBadge status={p.status} />
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-400 px-4 py-6">No posts for this client.</p>}
      </Card>
    </Layout>
  )
}
