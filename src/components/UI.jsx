import { STATUS_COLORS } from '../data/mockData'

export function StatCard({ icon: Icon, label, value, hint, accent = '#2563EB' }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-2xl font-semibold text-secondary mt-1">{value}</p>
        {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
      </div>
      {Icon && (
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}1A` }}>
          <Icon size={17} style={{ color: accent }} />
        </div>
      )}
    </div>
  )
}

export function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' }
  return (
    <span className="status-pill" style={{ backgroundColor: c.bg, color: c.text }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
      {status}
    </span>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-card ${className}`}>
      {children}
    </div>
  )
}

export function Progress({ value, max, color = '#2563EB' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}
