const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')

const router = express.Router()

// Get all accountbalancelogs
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Get all accounts for that user.
  // const logs = await db('accountbalance')
  //   .innerJoin('accounts', 'fk_account_id', 'account_id')
  //   .whereIn('accountbalance.fk_user_id', [userId])
  //   .select()
  //   .orderBy('date', 'desc')

  const totalBalance = await db('balance')
    .select()
    .where({ fk_user_id: userId, type: 'total' })

  res.json({
    message: 'Total Balance',
    totalBalance,
  })
})

module.exports = router
