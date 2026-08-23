const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const prisma = require('../db')

const router = express.Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function issueToken(customer) {
  return jwt.sign(
    { customerId: customer.id, type: 'customer' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

function toSafeCustomer(c) {
  const { password, ...safe } = c
  return safe
}

// POST /api/customer-auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, accountType, businessName } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' })
    }
    if (accountType === 'business' && !businessName) {
      return res.status(400).json({ error: 'Business name is required for a business account.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existing = await prisma.customer.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const customer = await prisma.customer.create({
      data: {
        name, email: normalizedEmail, phone: phone || null,
        password: hashed, accountType: accountType || 'individual',
        businessName: businessName || null,
      },
    })

    res.status(201).json({ token: issueToken(customer), customer: toSafeCustomer(customer) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed.' })
  }
})

// POST /api/customer-auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const normalizedEmail = (email || '').trim().toLowerCase()
    const customer = await prisma.customer.findUnique({ where: { email: normalizedEmail } })

    if (!customer) {
      return res.status(401).json({ error: 'No account found with this email.' })
    }
    if (!customer.password) {
      return res.status(401).json({ error: 'This account uses Google Sign-In. Please log in with Google.' })
    }

    const valid = await bcrypt.compare(password, customer.password)
    if (!valid) {
      return res.status(401).json({ error: 'Incorrect password.' })
    }

    res.json({ token: issueToken(customer), customer: toSafeCustomer(customer) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed.' })
  }
})

// POST /api/customer-auth/google — verifies the real Google ID token server-side
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body
    if (!credential) return res.status(400).json({ error: 'No credential provided.' })

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()

    const email = payload.email.trim().toLowerCase()
    let customer = await prisma.customer.findUnique({ where: { email } })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: payload.name,
          email,
          avatar: payload.picture || null,
          authProvider: 'google',
        },
      })
    }

    res.json({ token: issueToken(customer), customer: toSafeCustomer(customer) })
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: 'Google sign-in verification failed.' })
  }
})

// GET /api/customer-auth/me
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided.' })
  }
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
    if (decoded.type !== 'customer') return res.status(401).json({ error: 'Invalid token type.' })

    const customer = await prisma.customer.findUnique({ where: { id: decoded.customerId } })
    if (!customer) return res.status(401).json({ error: 'Account no longer exists.' })

    res.json(toSafeCustomer(customer))
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
})

router.put('/profile', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided.' })
  }
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
    const { avatar, address, bio, phone, accountType, businessName } = req.body

    if (accountType === 'business' && !businessName) {
      return res.status(400).json({ error: 'Business name is required for a business account.' })
    }

    const customer = await prisma.customer.update({
      where: { id: decoded.customerId },
      data: {
        avatar, address, bio, phone,
        accountType: accountType || undefined,
        businessName: accountType === 'business' ? businessName : null,
        profileComplete: true,
      },
    })

    res.json(toSafeCustomer(customer))
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
})

module.exports = router