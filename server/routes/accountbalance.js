const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')

const router = express.Router()

// Get all accounts balance over time
router.get('/', isAuthenticated, async (req, res, next) => {
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
      const transactions = await db('transactions')
        .select()
        .where({ fk_account_id: account.account_id })
        .orderBy([
          { column: 'date', order: 'asc' },
          { column: 'created_at', order: 'asc' },
        ])

      // For each transaction
      const withBalance = await transactions.reduce((prev, curr) => {
        if (prev.length === 0) {
          const balance = {
            date: curr.date,
            balance: curr.amount,
            accountId: curr.fk_account_id,
            transactionId: curr.trans_id,
            userId: curr.fk_user_id,
            type: curr.type,
          }
          return [balance]
        }
        // Get last entry of prev
        const [last] = prev.slice(-1)

        const newBalance = {
          date: curr.date,
          balance: last.balance + curr.amount,
          accountId: curr.fk_account_id,
          transactionId: curr.trans_id,
          userId: curr.fk_user_id,
          type: curr.type,
        }

        return [...prev, newBalance]
      }, [])
      return {
        [`account ${account.account_id}`]: {
          accountId: account.account_id,
          accountName: account.account_name,
          withBalance,
        },
      }
    }),
  )

  res.json({
    message: 'Account Balance',
    accountBalanceOverTime,
  })
})

module.exports = router
