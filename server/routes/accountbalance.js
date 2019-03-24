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

  const accountBalance = await db('accountbalance')
    .select()
    .where({ fk_user_id: userId })

  res.json({
    message: 'Account Balance',
    accountBalance,
  })
})

module.exports = router
