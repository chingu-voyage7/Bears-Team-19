const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')
const { getAccountsWithBalance } = require('../helpers/helpers')

const router = express.Router()

// Get account

// Get all accounts
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req

  const accountsWithBalance = await getAccountsWithBalance(userId)

  res.json({
    message: 'Accounts',
    accountsWithBalance,
  })
})

// Create account
router.post('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { account, balance } = req.body

  // Create account
  const [{ account_id }] = await db('accounts')
    .returning(['account_id'])
    .insert({ fk_user_id: userId, account_name: account })
  const [newBalanceLog] = await db('balancelog')
    .returning(['fk_account_id', 'balance', 'date', 'fk_user_id'])
    .insert({
      fk_user_id: userId,
      balance,
      fk_account_id: account_id,
      date: new Date(),
    })
  res.json({
    message: 'Accounts created',
    account_id,
    balance: newBalanceLog,
  })
})

// Update account
router.patch('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Update account
  const { accountId, accountName } = req.body
  const [updatedAccount] = await db('accounts')
    .update({ account_name: accountName })
    .where({ account_id: accountId, fk_user_id: userId })
    .returning(['account_id', 'account_name'])

  res.json({
    message: 'Account updated',
    updatedAccount,
  })
})

// Delete account
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { accountId } = req.body

  await db('balancelog')
    .del()
    .where({ fk_account_id: accountId, fk_user_id: userId })
  await db('transactions')
    .del()
    .where({ fk_account_id: accountId, fk_user_id: userId })

  const result = await db('accounts')
    .del()
    .where({ account_id: accountId, fk_user_id: userId })

  if (!result) {
    res.status(404).json({ error: 'Not authorized' })
  }
  res.json({
    message: 'Account deleted',
    accountId,
  })
})

module.exports = router
