const express = require('express')
const prisma = require('../db')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()


// Company Info — single record
router.get('/company', async (req, res) => {
  try {
    const info = await prisma.companyInfo.findUnique({ where: { id: 'singleton' } })
    console.log('CompanyInfo query result:', info)
    res.json(info)
  } catch (err) {
    console.error('CompanyInfo query FAILED:', err)
    res.status(500).json({ error: 'Failed to fetch company info.' })
  }
})


router.put('/company', requireAuth, async (req, res) => {
  try {
    const info = await prisma.companyInfo.update({
      where: { id: 'singleton' },
      data: req.body,
    })
    res.json(info)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update company info.' })
  }
})


// Site Stats
router.get('/stats', async (req, res) => {
  const stats = await prisma.siteStat.findMany({ orderBy: { order: 'asc' } })
  res.json(stats)
})


router.put('/stats/:id', requireAuth, async (req, res) => {
  try {
    const stat = await prisma.siteStat.update({
      where: { id: req.params.id },
      data: { label: req.body.label, value: req.body.value },
    })
    res.json(stat)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update stat.' })
  }
})


module.exports = router
