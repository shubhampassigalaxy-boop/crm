import { Router } from 'express'
import { supabaseAdmin } from '../supabaseAdmin.js'

const router = Router()

// GET /api/notifications?userId=
router.get('/', async (req, res) => {
  let query = supabaseAdmin.from('notifications').select('*').order('created_at', { ascending: false })
  if (req.query.userId) query = query.eq('user_id', req.query.userId)
  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// PATCH /api/notifications/:id/read
router.patch('/:id/read', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('notifications')
    .update({ is_read: true })
    .eq('id', req.params.id)
    .select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

export default router
