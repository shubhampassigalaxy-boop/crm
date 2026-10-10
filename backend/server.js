import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import clientsRouter from './routes/clients.js'
import postsRouter from './routes/posts.js'
import notificationsRouter from './routes/notifications.js'
import reportsRouter from './routes/reports.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'anra-social-crm-api' }))

app.use('/api/clients', clientsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/notifications', notificationsRouter)
app.use('/api/reports', reportsRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Anra CRM API running on port ${PORT}`))
