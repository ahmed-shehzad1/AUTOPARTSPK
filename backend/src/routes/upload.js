const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${unique}${path.extname(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB cap
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'))
    }
    cb(null, true)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' })
  res.status(201).json({ url: `/uploads/${req.file.filename}` })
})

module.exports = router