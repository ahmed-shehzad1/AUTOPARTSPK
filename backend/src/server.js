const express = require('express')
const cors = require('cors')
const productsRouter = require('./routes/products')
const catalogRouter = require('./routes/catalog')
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
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})