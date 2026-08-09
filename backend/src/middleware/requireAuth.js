const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' })
  }
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
    req.adminUser = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token. Please log in again.' })
  }
}

module.exports = requireAuth