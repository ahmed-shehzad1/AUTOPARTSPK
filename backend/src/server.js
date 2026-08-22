const express = require('express')
const cors = require('cors')
const productsRouter = require('./routes/products')
const catalogRouter = require('./routes/catalog')
const path = require('path')
const uploadRouter = require('./routes/upload')
const ordersRouter = require('./routes/orders')
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const inquiriesRouter = require('./routes/inquiries')
const settingsRouter = require('./routes/settings')
const authRouter = require('./routes/auth')
const dashboardRouter = require('./routes/dashboard')
const customerAuthRouter = require('./routes/customerAuth')
const blogRouter = require('./routes/blog')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AutoPartsPK API is running' })
})

const PORT = process.env.PORT || 4000
app.use('/api/products', productsRouter)
app.use('/api', catalogRouter)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/api/upload', uploadRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/inquiries', inquiriesRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/customer-auth', customerAuthRouter)
app.use('/api/blog', blogRouter)
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})