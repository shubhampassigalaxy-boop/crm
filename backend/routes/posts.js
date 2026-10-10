import { Router } from 'express'
import { supabaseAdmin } from '../supabaseAdmin.js'

const router = Router()

// GET /api/posts?clientId=&status=&from=&to=
router.get('/', async (req, res) => {
  let query = supabaseAdmin.from('posts').select('*, clients(company_name)')
  if (req.query.clientId) query = query.eq('client_id', req.query.clientId)
  if (req.query.status) query = query.eq('status', req.query.status)
  if (req.query.from) query = query.gte('scheduled_date', req.query.from)
  if (req.query.to) query = query.lte('scheduled_date', req.query.to)

  const { data, error } = await query.order('scheduled_date', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// POST /api/posts — schedule a new post
router.post('/', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('posts').insert(req.body).select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
})

// PATCH /api/posts/:id/status — move a post through the workflow
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body
  const allowed = ['Design Pending', 'Ready for Review', 'Approved', 'Uploaded', 'Missed']
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' })

  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })

  // Log to audit trail
  await supabaseAdmin.from('audit_logs').insert({
    post_id: req.params.id,
    action: `Status changed to ${status}`,
    modified_at: new Date().toISOString()
  })

  res.json(data)
})

// POST /api/posts/:id/duplicate — duplicate previous month's post
router.post('/:id/duplicate', async (req, res) => {
  const { data: original, error: fetchError } = await supabaseAdmin
    .from('posts').select('*').eq('id', req.params.id).single()
  if (fetchError) return res.status(404).json({ error: fetchError.message })

  const { id, created_at, updated_at, ...rest } = original
  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert({ ...rest, scheduled_date: req.body.newDate, status: 'Design Pending' })
    .select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
})

export default router
