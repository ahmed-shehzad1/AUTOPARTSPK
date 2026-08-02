const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// Categories
router.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  res.json(categories)
})

router.post('/categories', async (req, res) => {
  try {
    const category = await prisma.category.create({ data: { name: req.body.name } })
    res.status(201).json(category)
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Category already exists.' })
    res.status(500).json({ error: 'Failed to create category.' })
  }
})

router.delete('/categories/:id', async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category — it may still have products assigned to it.' })
  }
})

// Makes
router.get('/makes', async (req, res) => {
  const makes = await prisma.make.findMany({
    include: { models: true },
    orderBy: { name: 'asc' },
  })
  res.json(makes)
})

router.post('/makes', async (req, res) => {
  try {
    const make = await prisma.make.create({ data: { name: req.body.name } })
    res.status(201).json(make)
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Make already exists.' })
    res.status(500).json({ error: 'Failed to create make.' })
  }
})

router.delete('/makes/:id', async (req, res) => {
  try {
    await prisma.make.delete({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete make.' })
  }
})

// Models (nested under a make)
router.post('/makes/:makeId/models', async (req, res) => {
  try {
    const model = await prisma.model.create({
      data: { name: req.body.name, makeId: req.params.makeId },
    })
    res.status(201).json(model)
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Model already exists for this make.' })
    res.status(500).json({ error: 'Failed to create model.' })
  }
})

router.delete('/models/:id', async (req, res) => {
  try {
    await prisma.model.delete({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete model.' })
  }
})

module.exports = router