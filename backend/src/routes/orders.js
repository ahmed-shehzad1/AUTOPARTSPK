const express = require('express')
const prisma = require('../db')

const router = express.Router()

// GET /api/orders — paginated list
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 15
    const status = req.query.status

    const where = status && status !== 'All' ? { status } : {}

    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.order.count({ where }),
    ])

    res.json({ items, total, page, totalPages: Math.ceil(total / pageSize) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch orders.' })
  }
})

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    })
    if (!order) return res.status(404).json({ error: 'Order not found.' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order.' })
  }
})

// POST /api/orders — create (called by the storefront checkout)
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, city, paymentMethod, subtotal, items } = req.body

    if (!customerName || !phone || !address || !city || !items?.length) {
      return res.status(400).json({ error: 'Missing required order fields.' })
    }

    const orderNumber = `AMA-${Date.now().toString().slice(-8)}`

    const order = await prisma.order.create({
      data: {
        orderNumber, customerName, phone, address, city, paymentMethod, subtotal,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            partNo: i.partNo,
            qty: i.qty,
            unitPrice: i.unitPrice,
          })),
        },
      },
      include: { items: true },
    })

    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create order.' })
  }
})

// PATCH /api/orders/:id — update status
router.patch('/:id', async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    })
    res.json(order)
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Order not found.' })
    res.status(500).json({ error: 'Failed to update order.' })
  }
})
module.exports = router