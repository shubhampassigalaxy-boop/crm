import { Router } from 'express'
import { supabaseAdmin } from '../supabaseAdmin.js'

const router = Router()

// GET /api/clients — list all clients with their active package
router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select('*, packages(*)')
    .order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// GET /api/clients/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('clients')
    .select('*, packages(*), posts(*)')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ error: error.message })
  res.json(data)
})

// POST /api/clients — create a new client
router.post('/', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('clients').insert(req.body).select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
})

// PUT /api/clients/:id — update a client
router.put('/:id', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('clients')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// DELETE /api/clients/:id
router.delete('/:id', async (req, res) => {
  const { error } = await supabaseAdmin.from('clients').delete().eq('id', req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.status(204).send()
})

export default router
