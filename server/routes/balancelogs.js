const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')

const router = express.Router()

// Get all balancelogs
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Get all accounts for that user.
  const logs = await db('balancelog')
    .select()
    .where({ fk_user_id: userId })

  res.json({
    message: 'Balancelogs',
    logs,
  })
})

module.exports = router
