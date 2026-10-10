import { useState } from 'react'
import Layout from '../components/Layout'
import { Card } from '../components/UI'

function Toggle({ label, hint, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div>
        <p className="text-sm text-secondary">{label}</p>
        {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${on ? 'bg-primary' : 'bg-slate-200'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-4.5 translate-x-4' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  return (
    <Layout title="Settings" subtitle="Roles, notifications, branding, and appearance">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-secondary mb-1">Notifications</h3>
          <p className="text-[11px] text-slate-400 mb-2">Choose how the team gets alerted</p>
          <Toggle label="Email notifications" hint="Package expiry, approvals, daily reminders" defaultOn />
          <Toggle label="WhatsApp notifications" hint="Send critical alerts via WhatsApp" />
          <Toggle label="Daily reminder digest" hint="9:00 AM summary of pending tasks" defaultOn />
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-secondary mb-1">Appearance</h3>
          <p className="text-[11px] text-slate-400 mb-2">Personalize the workspace</p>
          <Toggle label="Dark mode" hint="Switch the interface to a dark theme" />
          <div className="py-3">
            <p className="text-sm text-secondary mb-2">Agency branding</p>
            <div className="flex items-center gap-2">
              {['#2563EB', '#16A34A', '#F59E0B', '#DC2626', '#7C3AED'].map((c) => (
                <button key={c} className="w-7 h-7 rounded-full border-2 border-white shadow" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-secondary mb-1">Roles & Permissions</h3>
          <p className="text-[11px] text-slate-400 mb-3">Manage what each role can access</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] text-slate-400 border-b border-slate-100">
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Access Level</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Admin', 'Full access — manage users, clients, packages, approvals, audit logs'],
                ['Manager', 'Read-only dashboard, approvals, reports'],
                ['Graphic Designer', 'Assigned clients, design uploads, calendar'],
                ['Social Media Marketer', 'Approved posts, upload links, assigned clients']
              ].map(([role, desc]) => (
                <tr key={role} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 text-secondary font-medium w-48">{role}</td>
                  <td className="py-2.5 text-slate-500">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Layout>
  )
}
