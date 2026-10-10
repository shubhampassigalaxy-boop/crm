import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title={title} subtitle={subtitle} />
        <main className="p-4 lg:p-8 max-w-[1400px]">{children}</main>
      </div>
    </div>
  )
}
