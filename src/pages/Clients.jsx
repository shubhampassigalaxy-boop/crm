import { useState } from 'react'
import { Plus, ExternalLink, X, Eye, EyeOff, Facebook, Instagram, Copy, Check, Edit2, Trash2 } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, Progress } from '../components/UI'
import { useData } from '../context/DataContext'
import { daysUntil } from '../data/mockData'

const toUrl = (link) => {
  if (!link) return ''
  return /^https?:\/\//i.test(link) ? link : `https://${link}`
}

function AddClientModal({ onClose, onAdd, teamMembers }) {
  const designers = teamMembers.filter((m) => m.role === 'Graphic Designer')
  const marketers = teamMembers.filter((m) => m.role === 'Social Media Marketer')

  const [form, setForm] = useState({
    companyName: '', clientName: '', phone: '', email: '', website: '',
    instagram: '', facebook: '', accessWith: '',
    packageName: 'Standard', totalMonthlyPosts: 12, startDate: '2026-07-20', endDate: '2026-08-19',
    assignedDesigner: designers[0]?.name || '—', assignedMarketer: marketers[0]?.name || '—',
    facebookUsername: '', facebookPassword: '',
    instagramUsername: '', instagramPassword: ''
  })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.companyName) return
    onAdd({ ...form, totalMonthlyPosts: Number(form.totalMonthlyPosts) })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary">Add Client</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-secondary"><X size={17} /></button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Company Name</label>
              <input value={form.companyName} onChange={set('companyName')} required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="e.g. Widgets Cafe" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Client Contact Name</label>
              <input value={form.clientName} onChange={set('clientName')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="e.g. Suresh Kumar" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Phone</label>
              <input value={form.phone} onChange={set('phone')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="+91 ..." />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Email</label>
              <input type="email" value={form.email} onChange={set('email')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="client@email.com" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Website</label>
            <input value={form.website} onChange={set('website')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="example.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1"><Instagram size={12} className="text-[#E1306C]" /> Instagram Page Link</label>
              <input value={form.instagram} onChange={set('instagram')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="instagram.com/yourpage" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1"><Facebook size={12} className="text-[#1877F2]" /> Facebook Page Link</label>
              <input value={form.facebook} onChange={set('facebook')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="facebook.com/yourpage" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Access With</label>
            <input value={form.accessWith} onChange={set('accessWith')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="Name of person who has Facebook page access" />
          </div>

          <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/60">
            <p className="text-xs font-semibold text-secondary flex items-center gap-1.5 mb-2">
              <Instagram size={13} className="text-[#E1306C]" /> Instagram Login
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500">Username</label>
                <input value={form.instagramUsername} onChange={set('instagramUsername')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page username / email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Password</label>
                <input type="text" value={form.instagramPassword} onChange={set('instagramPassword')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page password" />
              </div>
            </div>
          </div>

          <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/60">
            <p className="text-xs font-semibold text-secondary flex items-center gap-1.5 mb-2">
              <Facebook size={13} className="text-[#1877F2]" /> Facebook Login
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500">Username</label>
                <input value={form.facebookUsername} onChange={set('facebookUsername')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page username / email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Password</label>
                <input type="text" value={form.facebookPassword} onChange={set('facebookPassword')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page password" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Package Name</label>
              <input value={form.packageName} onChange={set('packageName')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Total Monthly Posts</label>
              <input type="number" min="1" value={form.totalMonthlyPosts} onChange={set('totalMonthlyPosts')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Start Date</label>
              <input type="date" value={form.startDate} onChange={set('startDate')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">End Date</label>
              <input type="date" value={form.endDate} onChange={set('endDate')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Assign Designer</label>
              <select value={form.assignedDesigner} onChange={set('assignedDesigner')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white">
                <option value="—">Unassigned</option>
                {designers.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Assign Marketer</label>
              <select value={form.assignedMarketer} onChange={set('assignedMarketer')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white">
                <option value="—">Unassigned</option>
                {marketers.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg py-2.5 mt-2 transition-colors">
            Add Client
          </button>
        </form>
      </div>
    </div>
  )
}

function EditClientModal({ onClose, onUpdate, client, teamMembers }) {
  const designers = teamMembers.filter((m) => m.role === 'Graphic Designer')
  const marketers = teamMembers.filter((m) => m.role === 'Social Media Marketer')

  const [form, setForm] = useState({
    companyName: client.companyName || '',
    clientName: client.clientName || '',
    phone: client.phone || '',
    email: client.email || '',
    website: client.website || '',
    instagram: client.instagram || '',
    facebook: client.facebook || '',
    accessWith: client.accessWith || '',
    packageName: client.packageName || 'Standard',
    totalMonthlyPosts: client.totalMonthlyPosts || 12,
    startDate: client.startDate || '2026-07-20',
    endDate: client.endDate || '2026-08-19',
    assignedDesigner: client.assignedDesigner || '—',
    assignedMarketer: client.assignedMarketer || '—',
    facebookUsername: client.facebookUsername || '',
    facebookPassword: client.facebookPassword || '',
    instagramUsername: client.instagramUsername || '',
    instagramPassword: client.instagramPassword || ''
  })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.companyName) return
    onUpdate(client.id, { ...form, totalMonthlyPosts: Number(form.totalMonthlyPosts) })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary">Edit Client</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-secondary"><X size={17} /></button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Company Name</label>
              <input value={form.companyName} onChange={set('companyName')} required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="e.g. Widgets Cafe" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Client Contact Name</label>
              <input value={form.clientName} onChange={set('clientName')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="e.g. Suresh Kumar" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Phone</label>
              <input value={form.phone} onChange={set('phone')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="+91 ..." />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Email</label>
              <input type="email" value={form.email} onChange={set('email')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="client@email.com" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Website</label>
            <input value={form.website} onChange={set('website')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="example.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1"><Instagram size={12} className="text-[#E1306C]" /> Instagram Page Link</label>
              <input value={form.instagram} onChange={set('instagram')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="instagram.com/yourpage" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1"><Facebook size={12} className="text-[#1877F2]" /> Facebook Page Link</label>
              <input value={form.facebook} onChange={set('facebook')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="facebook.com/yourpage" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Access With</label>
            <input value={form.accessWith} onChange={set('accessWith')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" placeholder="Name of person who has Facebook page access" />
          </div>

          <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/60">
            <p className="text-xs font-semibold text-secondary flex items-center gap-1.5 mb-2">
              <Instagram size={13} className="text-[#E1306C]" /> Instagram Login
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500">Username</label>
                <input value={form.instagramUsername} onChange={set('instagramUsername')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page username / email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Password</label>
                <input type="text" value={form.instagramPassword} onChange={set('instagramPassword')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page password" />
              </div>
            </div>
          </div>

          <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/60">
            <p className="text-xs font-semibold text-secondary flex items-center gap-1.5 mb-2">
              <Facebook size={13} className="text-[#1877F2]" /> Facebook Login
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500">Username</label>
                <input value={form.facebookUsername} onChange={set('facebookUsername')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page username / email" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Password</label>
                <input type="text" value={form.facebookPassword} onChange={set('facebookPassword')}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white" placeholder="page password" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Package Name</label>
              <input value={form.packageName} onChange={set('packageName')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Total Monthly Posts</label>
              <input type="number" min="1" value={form.totalMonthlyPosts} onChange={set('totalMonthlyPosts')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Start Date</label>
              <input type="date" value={form.startDate} onChange={set('startDate')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">End Date</label>
              <input type="date" value={form.endDate} onChange={set('endDate')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Assign Designer</label>
              <select value={form.assignedDesigner} onChange={set('assignedDesigner')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white">
                <option value="—">Unassigned</option>
                {designers.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Assign Marketer</label>
              <select value={form.assignedMarketer} onChange={set('assignedMarketer')}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary mt-1 bg-white">
                <option value="—">Unassigned</option>
                {marketers.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg py-2.5 mt-2 transition-colors">
            Update Client
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Clients() {
  const { clients, addClient, updateClient, deleteClient, teamMembers } = useData()
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [revealed, setRevealed] = useState({})
  const [copied, setCopied] = useState(null)

  const toggleReveal = (id) => setRevealed((prev) => ({ ...prev, [id]: !prev[id] }))

  const copyText = (id, text) => {
    if (!text) return
    navigator.clipboard?.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1200)
  }

  const filtered = clients.filter((c) =>
    c.companyName.toLowerCase().includes(query.toLowerCase()) ||
    (c.clientName || '').toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Layout title="Clients" subtitle={`${clients.length} clients under management`}>
      <div className="flex items-center justify-between mb-4 gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clients..."
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary w-64 bg-white"
        />
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-primary hover:bg-primary-600 text-white text-sm font-medium rounded-lg px-3.5 py-2 transition-colors"
        >
          <Plus size={15} /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => {
          const remaining = c.totalMonthlyPosts - c.usedPosts
          const expiringSoon = daysUntil(c.endDate) <= 7
          return (
            <Card key={c.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: `${c.brandColor}1A` }}
                  >
                    {c.logo}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-secondary">{c.companyName}</p>
                    <p className="text-[11px] text-slate-400">{c.clientName || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingClient(c)
                      setShowEdit(true)
                    }}
                    className="text-slate-400 hover:text-primary p-1 rounded hover:bg-slate-50"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${c.companyName}?`)) {
                        deleteClient(c.id)
                      }
                    }}
                    className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-slate-50"
                  >
                    <Trash2 size={14} />
                  </button>
                  <span className={`status-pill ${expiringSoon ? 'bg-red-50 text-danger' : 'bg-green-50 text-success'}`}>
                    {expiringSoon ? `${daysUntil(c.endDate)}d left` : 'Active'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 mb-3 text-[11px] text-slate-500 flex-wrap">
                {c.website && (
                  <a href={toUrl(c.website)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <ExternalLink size={11} /> {c.website}
                  </a>
                )}
                {c.instagram && (
                  <a href={toUrl(c.instagram)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#E1306C]">
                    <Instagram size={11} /> Instagram
                  </a>
                )}
                {c.facebook && (
                  <a href={toUrl(c.facebook)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#1877F2]">
                    <Facebook size={11} /> Facebook
                  </a>
                )}
                <span>·</span>
                <span>{c.packageName}</span>
              </div>

              {(c.facebookUsername || c.facebookPassword) && (
                <div className="mb-3 border border-slate-100 rounded-lg p-2.5 bg-slate-50/60">
                  <p className="text-[11px] font-semibold text-secondary flex items-center gap-1.5 mb-1.5">
                    <Facebook size={12} className="text-[#1877F2]" /> Facebook Login
                  </p>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Username</span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      {c.facebookUsername || '—'}
                      <button onClick={() => copyText(`${c.id}-u`, c.facebookUsername)} className="text-slate-400 hover:text-primary">
                        {copied === `${c.id}-u` ? <Check size={11} /> : <Copy size={11} />}
                      </button>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Password</span>
                    <span className="flex items-center gap-1.5 text-slate-600 font-mono">
                      {revealed[c.id] ? (c.facebookPassword || '—') : '••••••••'}
                      <button onClick={() => toggleReveal(c.id)} className="text-slate-400 hover:text-primary">
                        {revealed[c.id] ? <EyeOff size={11} /> : <Eye size={11} />}
                      </button>
                      <button onClick={() => copyText(`${c.id}-p`, c.facebookPassword)} className="text-slate-400 hover:text-primary">
                        {copied === `${c.id}-p` ? <Check size={11} /> : <Copy size={11} />}
                      </button>
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500">Posts used</span>
                  <span className="font-medium text-secondary">{c.usedPosts}/{c.totalMonthlyPosts}</span>
                </div>
                <Progress value={c.usedPosts} max={c.totalMonthlyPosts} color={remaining <= 2 ? '#DC2626' : '#2563EB'} />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50">
                <span>Designer: <span className="text-slate-600">{c.assignedDesigner}</span></span>
                <span>Marketer: <span className="text-slate-600">{c.assignedMarketer}</span></span>
              </div>
            </Card>
          )
        })}
        {filtered.length === 0 && <p className="text-sm text-slate-400 col-span-full">No clients match your search.</p>}
      </div>

      {showAdd && (
        <AddClientModal onClose={() => setShowAdd(false)} onAdd={addClient} teamMembers={teamMembers} />
      )}
      {showEdit && editingClient && (
        <EditClientModal onClose={() => setShowEdit(false)} onUpdate={updateClient} client={editingClient} teamMembers={teamMembers} />
      )}
    </Layout>
  )
}
