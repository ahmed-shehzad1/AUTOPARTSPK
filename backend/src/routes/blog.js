const express = require('express')
const prisma = require('../db')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// GET /api/blog — public, published posts only
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog posts.' })
  }
})

// GET /api/blog/:slug — public, single post
router.get('/:slug', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } })
    if (!post || !post.published) return res.status(404).json({ error: 'Post not found.' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post.' })
  }
})

// GET /api/blog-admin/all — admin only, includes unpublished
router.get('/admin/all', requireAuth, async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts.' })
  }
})

// GET /api/blog-admin/:id — admin only, fetch by ID for editing
router.get('/admin/:id', requireAuth, async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } })
    if (!post) return res.status(404).json({ error: 'Post not found.' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post.' })
  }
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const { slug, title, category, excerpt, content, readTime, published } = req.body
    if (!slug || !title || !content) {
      return res.status(400).json({ error: 'Slug, title, and content are required.' })
    }
    const post = await prisma.blogPost.create({
      data: { slug, title, category, excerpt, content, readTime, published: published ?? true },
    })
    res.status(201).json(post)
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'A post with this slug already exists.' })
    res.status(500).json({ error: 'Failed to create post.' })
  }
})

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post.' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post.' })
  }
})

module.exports = router