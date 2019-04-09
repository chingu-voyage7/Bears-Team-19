const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')

const router = express.Router()

// Get all accounts balance over time
router.get('/accounts', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Get all accounts for that user.
  const accounts = await db('accounts')
    .where({ fk_user_id: userId })
    .select()
    .orderBy('created_at', 'asc')

  // For each account
  const accountBalanceOverTime = await Promise.all(
    accounts.map(async account => {
      // Get all transactions for one account
      // const transactions = await db('transactions')
      //   .select()
      //   .where({ fk_account_id: account.account_id })
      //   .orderBy([
      //     { column: 'date', order: 'asc' },
      //     { column: 'created_at', order: 'asc' },
      //   ])

      const transWithCat = await db('transactions')
        .innerJoin('categories', 'fk_category_id', 'category_id')
        .whereIn('transactions.fk_account_id', [account.account_id])
        .orderBy([
          { column: 'transactions.date', order: 'asc' },
          { column: 'transactions.created_at', order: 'asc' },
        ])
        .column(
          {
            transId: 'trans_id',
          },
          'amount',
          'date',
          'type',
          'category',
          {
            userId: 'transactions.fk_user_id',
          },
          {
            accountId: 'fk_account_id',
          },
        )
      // For each transaction
      const balanceOverTime = await transWithCat.reduce((prev, curr) => {
        if (prev.length === 0) {
          const balance = {
            date: curr.date,
            balance: curr.amount,
            accountId: curr.accountId,
            accountName: account.account_name,
            transactionId: curr.transId,
            userId: curr.userId,
            type: curr.type,
            category: curr.category,
          }
          return [balance]
        }
        // Get last entry of prev
        const [last] = prev.slice(-1)

        const newBalance = {
          date: curr.date,
          balance: last.balance + curr.amount,
          accountId: curr.accountId,
          accountName: account.account_name,
          transactionId: curr.transId,
          userId: curr.userId,
          type: curr.type,
          category: curr.category,
        }

        return [...prev, newBalance]
      }, [])
      return {
        accountId: account.account_id,
        balanceOverTime,
      }
    }),
  )

  res.json({
    message: 'Account Balance',
    accountBalanceOverTime,
  })
})

// Get total balance over time for a user
router.get('/total', isAuthenticated, async (req, res, next) => {
  const { userId } = req

  // Get all transactions for user

  const transWithCat = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.fk_user_id', [userId])
    .orderBy([
      { column: 'transactions.date', order: 'asc' },
      { column: 'transactions.created_at', order: 'asc' },
    ])
    .column(
      {
        transId: 'trans_id',
      },
      'amount',
      'date',
      'type',
      'category',
      {
        userId: 'transactions.fk_user_id',
      },
      {
        accountId: 'fk_account_id',
      },
      { accountName: 'account_name' },
    )
  // For each transaction
  const balanceOverTime = await transWithCat.reduce((prev, curr) => {
    if (prev.length === 0) {
      const balance = {
        date: curr.date,
        balance: curr.amount,
        accountId: curr.accountId,
        transactionId: curr.transId,
        userId: curr.userId,
        type: curr.type,
        category: curr.category,
        accountName: curr.accountName,
      }
      return [balance]
    }
    // Get last entry of prev
    const [last] = prev.slice(-1)

    const newBalance = {
      date: curr.date,
      balance: last.balance + curr.amount,
      accountId: curr.accountId,
      transactionId: curr.transId,
      userId: curr.userId,
      type: curr.type,
      category: curr.category,
      accountName: curr.accountName,
    }

    return [...prev, newBalance]
  }, [])

  res.json({
    message: 'Total Balance',
    balanceOverTime,
  })
})
module.exports = router
