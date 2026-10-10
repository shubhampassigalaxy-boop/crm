import { useState } from 'react'
import { UserPlus, X, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import { Card } from '../components/UI'
import { useData } from '../context/DataContext'

const ROLES = ['Admin', 'Graphic Designer', 'Social Media Marketer', 'Manager']

function AddMemberModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.username || !form.password) return
    onAdd(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary">Add Team Member</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-secondary"><X size={17} /></button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-500">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1"
              placeholder="e.g. Kavita Singh"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1"
              placeholder="kavita@anrasolutions.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Username</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1"
              placeholder="Login username"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Password</label>
            <input
              type="text"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1"
              placeholder="Login password"
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg py-2.5 mt-2 transition-colors">
            Add Member
          </button>
        </form>
      </div>
    </div>
  )
}

function AssignModal({ member, clients, onClose, onAssign }) {
  const isDesigner = member.role === 'Graphic Designer'
  const isMarketer = member.role === 'Social Media Marketer'
  const [selected, setSelected] = useState(
    clients.filter((c) =>
      (isDesigner && c.assignedDesigner === member.name) ||
      (isMarketer && c.assignedMarketer === member.name)
    ).map((c) => c.id)
  )

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const save = () => {
    clients.forEach((c) => {
      const shouldAssign = selected.includes(c.id)
      if (isDesigner) {
        onAssign(c.id, { designerName: shouldAssign ? member.name : (c.assignedDesigner === member.name ? '—' : c.assignedDesigner) })
      } else if (isMarketer) {
        onAssign(c.id, { marketerName: shouldAssign ? member.name : (c.assignedMarketer === member.name ? '—' : c.assignedMarketer) })
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-secondary">Assign {member.name}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-secondary"><X size={17} /></button>
        </div>
        {!isDesigner && !isMarketer ? (
          <p className="text-xs text-slate-400 mt-3">Only Graphic Designers and Social Media Marketers can be assigned to clients.</p>
        ) : (
          <>
            <p className="text-[11px] text-slate-400 mb-3">Pick which clients {member.name} works on</p>
            <div className="max-h-64 overflow-y-auto space-y-1 mb-4">
              {clients.map((c) => (
                <label key={c.id} className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(c.id)}
                    onChange={() => toggle(c.id)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-secondary">{c.companyName}</span>
                </label>
              ))}
            </div>
            <button onClick={save} className="w-full bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg py-2.5 transition-colors">
              Save Assignment
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function Team() {
  const { teamMembers, addTeamMember, removeTeamMember, clients, assignClientStaff } = useData()
  const [showAdd, setShowAdd] = useState(false)
  const [assigning, setAssigning] = useState(null)

  const clientCountFor = (member) =>
    clients.filter((c) => c.assignedDesigner === member.name || c.assignedMarketer === member.name).length

  return (
    <Layout title="Team" subtitle={`${teamMembers.length} members`}>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg px-3.5 py-2 transition-colors"
        >
          <UserPlus size={15} /> Add Member
        </button>
      </div>

      <Card className="divide-y divide-slate-50">
        {teamMembers.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                style={{ backgroundColor: m.avatarColor }}
              >
                {m.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-secondary truncate">{m.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{m.email} · {m.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {(m.role === 'Graphic Designer' || m.role === 'Social Media Marketer') && (
                <span className="text-[11px] text-slate-400 hidden sm:inline">{clientCountFor(m)} clients</span>
              )}
              <button
                onClick={() => setAssigning(m)}
                className="text-xs font-medium text-primary bg-primary-50 hover:bg-primary-100 rounded-lg px-3 py-1.5 transition-colors"
              >
                Assign
              </button>
              <button
                onClick={() => removeTeamMember(m.id)}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-danger hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </Card>

      {showAdd && (
        <AddMemberModal onClose={() => setShowAdd(false)} onAdd={addTeamMember} />
      )}
      {assigning && (
        <AssignModal member={assigning} clients={clients} onClose={() => setAssigning(null)} onAssign={assignClientStaff} />
      )}
    </Layout>
  )
}
