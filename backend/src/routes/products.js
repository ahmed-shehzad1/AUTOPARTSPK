const express = require('express')
const prisma = require('../db')

const router = express.Router()

const PRODUCT_INCLUDE = {
  category: true,
  images: true,
  crossReferences: true,
  fitments: { include: { model: { include: { make: true } } } },
}

// GET /api/products — paginated list with filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 12
    const { category, make, model, search, featured } = req.query

    const where = {
  AND: [
    category && category !== 'All' ? { category: { name: category } } : {},
    featured === 'true' ? { featured: true } : {},
    search
          ? {
              OR: [
                { name: { contains: search } },
                { partNo: { contains: search } },
              ],
            }
          : {},
        make && make !== 'All'
          ? { fitments: { some: { model: { make: { name: make } } } } }
          : {},
        model && model !== 'All'
          ? { fitments: { some: { model: { name: model } } } }
          : {},
      ],
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: PRODUCT_INCLUDE,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    res.json({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch products.' })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: PRODUCT_INCLUDE,
    })
    if (!product) return res.status(404).json({ error: 'Product not found.' })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch product.' })
  }
})

// POST /api/products — create (admin only, once auth middleware exists)
router.post('/', async (req, res) => {
  try {
    const {
  partNo, name, description, partBrand, condition, stock, featured,
  price, wholesalePrice, wholesaleMinQty, moq, unit, rfqThreshold,
  categoryId, images = [], crossReferences = [], fitments = [],
} = req.body

    if (!partNo || !name || !categoryId) {
      return res.status(400).json({ error: 'partNo, name, and categoryId are required.' })
    }

    const product = await prisma.product.create({
      data: {
        partNo, name, description, partBrand, condition, stock,
        price, wholesalePrice, wholesaleMinQty, moq, unit, rfqThreshold,
        categoryId,
        images: { create: images.map((url) => ({ url })) },
        crossReferences: { create: crossReferences.map((code) => ({ code })) },
        fitments: {
          create: fitments.map((f) => ({
            modelId: f.modelId,
            yearFrom: f.yearFrom,
            yearTo: f.yearTo,
          })),
        },
      },
      include: PRODUCT_INCLUDE,
    })

    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'A product with this part number already exists.' })
    }
    res.status(500).json({ error: 'Failed to create product.' })
  }
})

// PUT /api/products/:id — update
router.put('/:id', async (req, res) => {
  try {
    const { images, crossReferences, fitments, ...fields } = req.body

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: fields,
      include: PRODUCT_INCLUDE,
    })

    res.json(product)
  } catch (err) {
    console.error(err)
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found.' })
    }
    res.status(500).json({ error: 'Failed to update product.' })
  }
})

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (err) {
    console.error(err)
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found.' })
    }
    res.status(500).json({ error: 'Failed to delete product.' })
  }
})

// POST /api/products/:id/images — attach an uploaded image to a product
router.post('/:id/images', async (req, res) => {
  try {
    const image = await prisma.productImage.create({
      data: { url: req.body.url, productId: req.params.id },
    })
    res.status(201).json(image)
  } catch (err) {
    res.status(500).json({ error: 'Failed to attach image.' })
  }
})

// DELETE /api/products/images/:imageId — remove a single image
router.delete('/images/:imageId', async (req, res) => {
  try {
    await prisma.productImage.delete({ where: { id: req.params.imageId } })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image.' })
  }
})

module.exports = router