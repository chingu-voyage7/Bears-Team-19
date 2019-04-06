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
  const [{ account_id: accountId, current_balance: currentBalance }] = await db(
    'accounts',
  )
    .returning(['account_id', 'account_name', 'current_balance'])
    .insert({
      fk_user_id: userId,
      account_name: account,
      current_balance: balance,
    })

  // Get the categoryId for 'New Account'
  const [categories] = await db('categories')
    .select()
    .where({ category: 'New Account' })

  // Check if category exists in categories
  let categoryId
  if (!categories) {
    ;[categoryId] = await db('categories')
      .returning('category_id')
      .insert({ category: 'New Account' })
  } else {
    categoryId = categories.category_id
  }

  // Transaction info.
  const transactionInfo = {
    fk_user_id: userId,
    amount: balance,
    type: 'income',
    fk_account_id: accountId,
    date: newDate,
    fk_category_id: categoryId,
  }
  // Make transaction for start balance.
  await db('transactions').insert(transactionInfo)

  // console.log(transaction)
  // Add record to accounts balance table
  // const [newAccountBalanceRecord] = await db('balance')
  //   .returning(['fk_account_id', 'balance', 'date', 'type', 'fk_user_id'])
  //   .insert({
  //     fk_user_id: userId,
  //     balance,
  //     fk_account_id: accountId,
  //     date: newDate,
  //     type: 'account',
  //   })

  // Get last record of total balance table
  // const oldTotal = await db('balance')
  //   .select()
  //   .where({ fk_user_id: userId, type: 'total' })
  //   .orderBy('balance_id', 'desc')
  //   .limit(1)

  // Use the old balance add add the new accounts balance to it.
  // const cleanedBalance =
  //   oldTotal.length > 0
  //     ? Number(oldTotal[0].balance) + Number(balance)
  //     : Number(0 + balance)

  // Add record to total balance table
  // await db('balance').insert({
  //   balance: cleanedBalance,
  //   date: newDate,
  //   fk_user_id: userId,
  //   fk_account_id: accountId,
  //   type: 'total',
  // })

  res.json({
    message: 'Accounts created',
    accountId,
    currentBalance,
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

    return
  }
  // If there isn't then remove the account and update all total balance records after it was created with removing the amount from the balance

  // Remove The account Record
  const result = await db('accounts')
    .del()
    .where({ account_id: accountId, fk_user_id: userId })

  if (!result) {
    res.status(404).json({ error: 'Not authorized' })
    return
  }
  res.json({
    message: 'Account deleted',
    accountId,
  })
})

module.exports = router
