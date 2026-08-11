const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Keep the file in memory instead of writing to disk — we forward it straight to Cloudinary.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'))
    }
    cb(null, true)
  },
})

function uploadBufferToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
    stream.end(buffer)
  })
}

// Product images — admin only
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' })
  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, 'autopartspk/products')
    res.status(201).json({ url: result.secure_url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Image upload failed.' })
  }
})

// Customer avatars — any logged-in visitor can upload their own avatar, no admin needed
router.post('/avatar', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' })
  try {
    const result = await uploadBufferToCloudinary(req.file.buffer, 'autopartspk/avatars')
    res.status(201).json({ url: result.secure_url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Avatar upload failed.' })
  }
})

module.exports = router