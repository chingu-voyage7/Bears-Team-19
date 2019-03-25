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
  const [newAccountBalanceRecord] = await db('balance')
    .returning(['fk_account_id', 'balance', 'date', 'type', 'fk_user_id'])
    .insert({
      fk_user_id: userId,
      balance,
      fk_account_id: accountId,
      date: newDate,
      type: 'account',
    })

  // Get last record of total balance table
  const oldTotal = await db('balance')
    .select()
    .where({ fk_user_id: userId, type: 'total' })
    .orderBy('balance_id', 'desc')
    .limit(1)

  // Use the old balance add add the new accounts balance to it.
  const cleanedBalance =
    oldTotal.length > 0
      ? Number(oldTotal[0].balance) + Number(balance)
      : Number(0 + balance)

  // Add record to total balance table
  await db('balance').insert({
    balance: cleanedBalance,
    date: newDate,
    fk_user_id: userId,
    fk_account_id: accountId,
    type: 'total',
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

  // If there is then do not allow to delete the account.
  const haveTransactions = await db('transactions')
    .select()
    .where({ fk_account_id: accountId })

  if (haveTransactions.length > 0) {
    res
      .status(404)
      .json({ error: 'Can not delete, need to remove transactions first.' })
  } else {
    // If there isn't then remove the account and update all total balance records after it was created with removing the amount from the balance

    //Get total balance
    const [balanceForAccount] = await db('balance')
      .select()
      .where({ fk_account_id: accountId, type: 'account' })

    // Get all total Balance records for user that comes after the accounts initial record and decrement their balance by the balance of the account
    const filteredTotalBalanceForUser = await db('balance')
      .where({ fk_user_id: userId, type: 'total' })
      .andWhere('balance_id', '>', balanceForAccount.balance_id)
      .decrement({ balance: balanceForAccount.balance })
      .returning([
        'balance',
        'balance_id',
        'type',
        'date',
        'fk_user_id',
        'fk_transaction_id',
        'fk_account_id',
      ])

    // Remove the balance records for both account and total
    await db('balance')
      .del()
      .where({ fk_account_id: accountId, fk_user_id: userId })

    // Remove The account Record
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
  }
})

module.exports = router
