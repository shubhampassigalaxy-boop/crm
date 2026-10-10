import { Router } from 'express'
import { supabaseAdmin } from '../supabaseAdmin.js'

const router = Router()

// GET /api/reports/client-wise
router.get('/client-wise', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select('id, company_name, packages(total_monthly_posts, end_date), posts(status)')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// GET /api/reports/designer-performance
router.get('/designer-performance', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('designer_id, status, users!posts_designer_id_fkey(name)')
  if (error) return res.status(500).json({ error: error.message })

  const grouped = {}
  for (const row of data) {
    const name = row.users?.name || 'Unassigned'
    grouped[name] ??= { completed: 0, pending: 0 }
    if (row.status === 'Uploaded' || row.status === 'Approved') grouped[name].completed++
    if (row.status === 'Design Pending') grouped[name].pending++
  }
  res.json(grouped)
})

export default router
