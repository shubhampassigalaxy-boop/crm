import { useState } from 'react'
import { Check, X, MessageSquare } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, StatusBadge } from '../components/UI'
import { useData } from '../context/DataContext'

export default function Approval() {
  const { posts } = useData()
  const pending = posts.filter((p) => p.status === 'Ready for Review')
  const [notes, setNotes] = useState({})

  return (
    <Layout title="Approval Module" subtitle={`${pending.length} designs waiting on your review`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pending.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-secondary">{p.title}</p>
                <p className="text-[11px] text-slate-400">{p.clientName} · {p.designer}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="w-full h-40 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 text-xs mb-3">
              Design preview
            </div>

            <div className="flex items-start gap-2 mb-3">
              <MessageSquare size={14} className="text-slate-400 mt-2 shrink-0" />
              <textarea
                rows={2}
                placeholder="Approval notes..."
                value={notes[p.id] || ''}
                onChange={(e) => setNotes((n) => ({ ...n, [p.id]: e.target.value }))}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-success hover:opacity-90 rounded-lg py-2 transition-opacity">
                <Check size={14} /> Approve
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg py-2 transition-colors">
                Request Changes
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-danger bg-red-50 hover:bg-red-100 rounded-lg transition-colors shrink-0">
                <X size={15} />
              </button>
            </div>
          </Card>
        ))}
        {pending.length === 0 && <p className="text-sm text-slate-400">Nothing pending approval right now.</p>}
      </div>
    </Layout>
  )
}
