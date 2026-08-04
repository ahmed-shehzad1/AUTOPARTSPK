const express = require('express')
const prisma = require('../db')

const router = express.Router()

// ---- Wholesale Inquiries ----

router.get('/wholesale', async (req, res) => {
  try {
    const status = req.query.status
    const where = status && status !== 'All' ? { status } : {}
    const inquiries = await prisma.wholesaleInquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    res.json(inquiries)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wholesale inquiries.' })
  }
})

router.post('/wholesale', async (req, res) => {
  try {
    const { businessName, contactName, phone, email, city, volume, categories, message } = req.body
    if (!businessName || !contactName || !phone) {
      return res.status(400).json({ error: 'Business name, contact name, and phone are required.' })
    }
    const inquiry = await prisma.wholesaleInquiry.create({
      data: {
        businessName, contactName, phone,
        email: email || null,
        city: city || null,
        volume: volume || null,
        categories: Array.isArray(categories) ? categories.join(', ') : (categories || ''),
        message: message || null,
      },
    })
    res.status(201).json(inquiry)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit inquiry.' })
  }
})

router.patch('/wholesale/:id', async (req, res) => {
  try {
    const inquiry = await prisma.wholesaleInquiry.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    })
    res.json(inquiry)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry.' })
  }
})

// ---- Contact Messages ----

router.get('/contact', async (req, res) => {
  try {
    const status = req.query.status
    const where = status && status !== 'All' ? { status } : {}
    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact messages.' })
  }
})

router.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Name, phone, and message are required.' })
    }
    const contactMessage = await prisma.contactMessage.create({
      data: { name, phone, email: email || null, subject: subject || null, message },
    })
    res.status(201).json(contactMessage)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send message.' })
  }
})

router.patch('/contact/:id', async (req, res) => {
  try {
    const message = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    })
    res.json(message)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message.' })
  }
})

module.exports = router