const express = require('express')
const prisma = require('../db')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/summary', requireAuth, async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      pendingOrders,
      totalCategories,
      totalMakes,
      newWholesaleInquiries,
      newContactMessages,
      recentOrders,
      recentWholesale,
      recentContact,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'pending' } }),
      prisma.category.count(),
      prisma.make.count(),
      prisma.wholesaleInquiry.count({ where: { status: 'new' } }),
      prisma.contactMessage.count({ where: { status: 'new' } }),
      prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.wholesaleInquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    ])

    // Merge and sort the two inquiry types into one recent-activity feed
    const recentInquiries = [
      ...recentWholesale.map((i) => ({ id: i.id, type: 'wholesale', name: i.businessName, createdAt: i.createdAt })),
      ...recentContact.map((i) => ({ id: i.id, type: 'contact', name: i.name, createdAt: i.createdAt })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalCategories,
      totalMakes,
      newInquiries: newWholesaleInquiries + newContactMessages,
      recentOrders,
      recentInquiries,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load dashboard summary.' })
  }
})

module.exports = router