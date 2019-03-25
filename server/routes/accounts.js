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

  const newDate = new Date()
  // Create account
  const [{ account_id: accountId }] = await db('accounts')
    .returning(['account_id'])
    .insert({ fk_user_id: userId, account_name: account })
  // Add record to accounts balance table
  const [newAccountBalanceRecord] = await db('accountbalance')
    .returning(['fk_account_id', 'balance', 'date', 'fk_user_id'])
    .insert({
      fk_user_id: userId,
      balance,
      fk_account_id: accountId,
      date: newDate,
    })

  // Get last record of total balance table
  const oldTotal = await db('totalbalance')
    .select()
    .where({ fk_user_id: userId })
    .orderBy('totalbalance_id', 'desc')
    .limit(1)

  // Use the old balance add add the new accounts balance to it.
  const cleanedBalance =
    oldTotal.length > 0
      ? Number(oldTotal[0].balance) + Number(balance)
      : Number(0 + balance)

  // Add record to total balance table
  await db('totalbalance').insert({
    balance: cleanedBalance,
    date: newDate,
    fk_user_id: userId,
    fk_account_id: accountId,
  })

  res.json({
    message: 'Accounts created',
    accountId,
    balance: newAccountBalanceRecord,
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

  await db('accountbalance')
    .del()
    .where({ fk_account_id: accountId, fk_user_id: userId })
  await db('totalbalance')
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
