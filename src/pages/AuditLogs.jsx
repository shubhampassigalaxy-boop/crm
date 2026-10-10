import Layout from '../components/Layout'
import { Card } from '../components/UI'
import { auditLogs } from '../data/mockData'

export default function AuditLogs() {
  return (
    <Layout title="Audit Logs" subtitle="Full history of client, post, and approval activity">
      <Card className="p-0 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="text-left text-[11px] text-slate-400 border-b border-slate-100 bg-slate-50">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Post</th>
              <th className="px-4 py-3 font-medium">Designer</th>
              <th className="px-4 py-3 font-medium">Marketer</th>
              <th className="px-4 py-3 font-medium">Approved By</th>
              <th className="px-4 py-3 font-medium">Created At</th>
              <th className="px-4 py-3 font-medium">Modified At</th>
              <th className="px-4 py-3 font-medium">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3 text-secondary font-medium">{log.client}</td>
                <td className="px-4 py-3 text-slate-600">{log.post}</td>
                <td className="px-4 py-3 text-slate-500">{log.designer}</td>
                <td className="px-4 py-3 text-slate-500">{log.marketer}</td>
                <td className="px-4 py-3 text-slate-500">{log.approvedBy}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{log.createdAt}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{log.modifiedAt}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{log.completedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Layout>
  )
}
