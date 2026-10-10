import { useMemo, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, CheckSquare, Square, Video, Image as ImageIcon, CalendarCheck } from 'lucide-react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import Layout from '../components/Layout'
import { Card, StatusBadge } from '../components/UI'
import { STATUS_COLORS } from '../data/mockData'
import { useData } from '../context/DataContext'

// Reels/Videos get a video icon, everything else (Post/Story/Carousel etc.) is treated as a creative/design piece
const isReel = (type) => /reel|video/i.test(type || '')
const toDateStr = (d) => format(d, 'yyyy-MM-dd')

function TypeIcon({ type, size = 11, className = '' }) {
  return isReel(type)
    ? <Video size={size} className={className} />
    : <ImageIcon size={size} className={className} />
}

function BulkScheduleBar({ client, onMark }) {
  const [startDate, setStartDate] = useState(client.startDate)
  const [endDate, setEndDate] = useState(client.endDate)
  const [type, setType] = useState('Post')
  const [platform, setPlatform] = useState('Instagram')
  const [done, setDone] = useState(false)

  const submit = () => {
    if (!startDate || !endDate || startDate > endDate) return
    onMark({ startDate, endDate, type, platform })
    setDone(true)
    setTimeout(() => setDone(false), 1800)
  }

  return (
    <Card className="p-4 mb-4">
      <p className="text-xs font-semibold text-secondary flex items-center gap-1.5 mb-3">
        <CalendarCheck size={14} className="text-primary" /> Bulk scheduled? Tick a whole date range as posted in one go
      </p>
      <div className="flex items-end gap-2 flex-wrap">
        <div>
          <label className="text-[11px] font-medium text-slate-500">From</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="block border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-primary mt-1" />
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-500">To</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="block border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-primary mt-1" />
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-500">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="block border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-primary mt-1 bg-white">
            <option>Post</option>
            <option>Reel</option>
            <option>Story</option>
            <option>Carousel</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-medium text-slate-500">Platform</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}
            className="block border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-primary mt-1 bg-white">
            <option>Instagram</option>
            <option>Facebook</option>
            <option>LinkedIn</option>
          </select>
        </div>
        <button
          onClick={submit}
          className="flex items-center gap-1.5 bg-primary hover:bg-primary-600 text-white text-xs font-medium rounded-lg px-3.5 py-2 transition-colors"
        >
          <CheckSquare size={14} /> Mark range as posted
        </button>
        {done && <span className="text-xs text-success font-medium">Done — calendar updated ✓</span>}
      </div>
    </Card>
  )
}

export default function CalendarPage() {
  const { posts, clients, togglePostDone, togglePostForDay, bulkMarkPosted } = useData()
  const [cursor, setCursor] = useState(new Date('2026-07-20'))
  const [clientFilter, setClientFilter] = useState(clients[0]?.id || 'all')

  // Keep the selected client valid if the client list changes
  useEffect(() => {
    if (clientFilter !== 'all' && !clients.some((c) => c.id === clientFilter)) {
      setClientFilter(clients[0]?.id || 'all')
    }
  }, [clients]) // eslint-disable-line react-hooks/exhaustive-deps

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor))
    const end = endOfWeek(endOfMonth(cursor))
    return eachDayOfInterval({ start, end })
  }, [cursor])

  const filteredPosts = posts.filter((p) => clientFilter === 'all' || p.clientId === clientFilter)
  const activeClient = clients.find((c) => c.id === clientFilter)

  const postsForDay = (day) => filteredPosts.filter((p) => isSameDay(new Date(p.date), day))

  // For a single selected client, every in-month day within their package window gets its
  // own checkbox — even days that don't have a post record yet — so all 30/30 days are tickable.
  const dayInClientWindow = (day) => {
    if (!activeClient) return false
    const dateStr = toDateStr(day)
    return dateStr >= activeClient.startDate && dateStr <= activeClient.endDate
  }

  return (
    <Layout
      title={activeClient ? `${activeClient.companyName} — Calendar` : 'Content Calendar'}
      subtitle="Each client has their own calendar — tick a day's reel or creative as posted"
    >
      {/* Per-client tabs — switching tabs shows that client's own separate calendar */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => setClientFilter(c.id)}
            className={`shrink-0 flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 border transition-colors ${
              clientFilter === c.id
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{c.logo}</span> {c.companyName}
          </button>
        ))}
        <button
          onClick={() => setClientFilter('all')}
          className={`shrink-0 text-xs font-medium rounded-lg px-3 py-1.5 border transition-colors ${
            clientFilter === 'all'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Clients
        </button>
      </div>

      {activeClient && (
        <BulkScheduleBar
          client={activeClient}
          onMark={({ startDate, endDate, type, platform }) => bulkMarkPosted(activeClient.id, { startDate, endDate, type, platform })}
        />
      )}

      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button onClick={() => setCursor(subMonths(cursor, 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            <ChevronLeft size={15} />
          </button>
          <h2 className="text-sm font-semibold text-secondary w-32 text-center">{format(cursor, 'MMMM yyyy')}</h2>
          <button onClick={() => setCursor(addMonths(cursor, 1))} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 flex-wrap">
          <span className="flex items-center gap-1"><Video size={12} /> Reel</span>
          <span className="flex items-center gap-1"><ImageIcon size={12} /> Creative / Post</span>
          <span className="text-slate-300">|</span>
          {Object.entries(STATUS_COLORS).map(([label, c]) => (
            <span key={label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.dot }} /> {label}
            </span>
          ))}
        </div>
      </div>

      <Card className="p-3 overflow-x-auto">
        <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-lg overflow-hidden min-w-[840px]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="bg-slate-50 text-center text-[11px] font-medium text-slate-400 py-2">{d}</div>
          ))}
          {days.map((day) => {
            const dayPosts = postsForDay(day)
            const inMonth = isSameMonth(day, cursor)
            const isToday = isSameDay(day, new Date('2026-07-20'))
            const dateStr = toDateStr(day)
            const showEmptyCheckbox = activeClient && inMonth && dayPosts.length === 0 && dayInClientWindow(day)
            return (
              <div key={day.toISOString()} className={`bg-white min-h-[100px] p-1.5 ${!inMonth ? 'opacity-40' : ''}`}>
                <div className={`text-xs mb-1 w-5 h-5 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-white font-semibold' : 'text-slate-500'}`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayPosts.slice(0, 3).map((p) => {
                    const c = STATUS_COLORS[p.status]
                    const done = p.status === 'Uploaded'
                    return (
                      <button
                        key={p.id}
                        onClick={() => togglePostDone(p.id)}
                        title={`${p.title} (${p.type}) — click to mark ${done ? 'not posted' : 'posted'}`}
                        className="w-full flex items-center gap-1 text-[10px] rounded px-1.5 py-1 truncate hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: c.bg, color: c.text }}
                      >
                        {done
                          ? <CheckSquare size={11} className="shrink-0" />
                          : <Square size={11} className="shrink-0" />}
                        <TypeIcon type={p.type} className="shrink-0" />
                        <span className="truncate">{clientFilter === 'all' ? p.title : p.type}</span>
                      </button>
                    )
                  })}
                  {dayPosts.length > 3 && <p className="text-[10px] text-slate-400">+{dayPosts.length - 3} more</p>}

                  {/* Empty day within this client's package window — still gets a checkbox to tick */}
                  {showEmptyCheckbox && (
                    <button
                      onClick={() => togglePostForDay(activeClient.id, dateStr)}
                      title="No post logged yet — click to mark today's post as done"
                      className="w-full flex items-center gap-1 text-[10px] rounded px-1.5 py-1 border border-dashed border-slate-300 text-slate-400 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Square size={11} className="shrink-0" />
                      <span className="truncate">Not posted</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="mt-4 p-5">
        <h3 className="text-sm font-semibold text-secondary mb-3">
          {activeClient ? `${activeClient.companyName}'s posts this month` : "This month's posts"}
        </h3>
        <div className="space-y-2">
          {filteredPosts.map((p) => {
            const done = p.status === 'Uploaded'
            return (
              <button
                key={p.id}
                onClick={() => togglePostDone(p.id)}
                className="w-full flex items-center justify-between py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {done
                    ? <CheckSquare size={17} className="text-success shrink-0" />
                    : <Square size={17} className="text-slate-300 shrink-0" />}
                  <span className="text-xs text-slate-400 w-16 shrink-0">{format(new Date(p.date), 'dd MMM')}</span>
                  <TypeIcon type={p.type} size={14} className="text-slate-400 shrink-0" />
                  <p className={`text-sm truncate ${done ? 'text-slate-400 line-through' : 'text-secondary'}`}>{p.title}</p>
                  <span className="text-xs text-slate-400 shrink-0">{clientFilter === 'all' ? p.clientName : p.platform}</span>
                </div>
                <StatusBadge status={p.status} />
              </button>
            )
          })}
          {filteredPosts.length === 0 && <p className="text-sm text-slate-400 py-4">No posts scheduled for this client yet.</p>}
        </div>
      </Card>
    </Layout>
  )
}
