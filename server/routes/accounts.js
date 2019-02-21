const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')

const router = express.Router()

// Get account

// Get all accounts
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Get all accounts for that user.
  const accounts = await db('accounts')
    .select()
    .where({ fk_user_id: userId })

  res.json({ message: 'Accounts', accounts })
})

// Create account
router.post('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { account, balance } = req.body

  // Create account
  const newAccount = await db('accounts')
    .returning(['account_id'])
    .insert({ fk_user_id: userId, account_name: account, balance })

  res.json({
    message: 'Accounts created',
    newAccount,
  })
})

// Update account
router.patch('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Update account
  const { accountId, accountName, balance } = req.body
  const updatedAccount = await db('accounts')
    .update({ account_name: accountName, balance })
    .where({ account_id: accountId, fk_user_id: userId })
    .returning(['account_id', 'account_name', 'balance'])

  res.json({
    message: 'Account updated',
    updatedAccount,
  })
})

// Delete account
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { accountId } = req.body

  const result = await db('accounts')
    .del()
    .where({ account_id: accountId, fk_user_id: userId })

  if (!result) {
    res.status(404).json({ error: 'Not authorized' })
  }
  res.json({
    message: 'Account deleted',
  })
})

module.exports = router
