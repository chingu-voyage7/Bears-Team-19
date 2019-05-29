const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const {
  isValidAccount,
  isValidDate,
  amountIsLowerThanBalance,
  isNotNewAccountTransaction,
} = require('../helpers/helpers')
const db = require('../database/database.js')

const router = express.Router()

// GET TRANSACTIONS
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const transWithCat = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.fk_user_id', [userId])
    .orderBy('date', 'desc', 'created_at', 'desc')
    .column(
      {
        transId: 'trans_id',
      },
      'amount',
      'date',
      'type',
      'category',
      {
        authorid: 'transactions.fk_user_id',
      },
      {
        accountId: 'fk_account_id',
      },
      {
        accountName: 'account_name',
      },
    )
  res.json({ message: 'Got transactions', transWithCat })
})

// CREATE TRANSACTION
router.post('/', isAuthenticated, async (req, res, next) => {
  const { amount, type, accountId, date, category: categoryField } = req.body
  const { userId } = req

  // Check so account is valid
  const isValid = await isValidAccount(accountId, userId)

  if (!isValid) {
    res.status(401).json({
      error: `Transaction not created. Account is not valid.`,
    })
    return
  }

  // Get the date and balance for the account
  const [
    { created_at: accountDate, current_balance: accountBalance },
  ] = await db('accounts')
    .select()
    .where({ account_id: accountId })

  // Check so date isn't before the account was created.
  const accountComesBeforeTransaction = isValidDate(date, accountDate)

  // Check so accountbalance isn't lower than the expense if the transaction is an expense.
  let isPositiveBalance = true

  if (type === 'expense') {
    isPositiveBalance = amountIsLowerThanBalance(amount, accountBalance)
  }

  if (!accountComesBeforeTransaction || !isPositiveBalance) {
    res.status(401).json({
      error: `Transaction not created. Something went wrong.`,
    })
    return
  }
  // Set amount to positive or negative
  let amountWithSign = 0
  type === 'expense'
    ? (amountWithSign = Number(`-${amount}`))
    : (amountWithSign = Number(amount))

  // get all categories
  const [allCategories] = await db
    .select()
    .from('categories')
    .whereIn('category', [categoryField])

  // Check if category exists in categories
  let categoryId
  if (!allCategories) {
    ;[categoryId] = await db('categories')
      .returning('category_id')
      .insert({ category: categoryField })
  } else {
    categoryId = allCategories.category_id
  }

  // create transaction
  const transactionInfo = {
    fk_user_id: userId,
    amount: amountWithSign,
    type,
    fk_account_id: accountId,
    date,
    fk_category_id: categoryId,
  }

  // Inset into database
  const [transaction] = await db('transactions')
    .returning(['trans_id', 'fk_category_id'])
    .insert(transactionInfo)

  await db('accounts')
    .increment('current_balance', amountWithSign)
    .where({ account_id: accountId })

  res.json({
    message: 'Created transaction',
    transaction,
  })
})

// UPDATE TRANSACTION
router.patch('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const {
    transId,
    amount,
    date,
    accountId,
    type,
    category: categoryField,
  } = req.body

  let amountWithSign = 0
  type === 'expense'
    ? (amountWithSign = Number(`-${amount}`))
    : (amountWithSign = Number(amount))

  // Get old transaction
  const [
    {
      fk_user_id: authorid,
      fk_account_id: oldAccountId,
      amount: oldAmount,
      type: oldType,
      date: oldTransactionDate,
    },
  ] = await db('transactions')
    .where({ trans_id: transId })
    .select()

  // Check so account is valid
  const isValid = await isValidAccount(accountId, userId)

  if (!isValid) {
    res.status(401).json({
      error: `Transaction not updated. Account is not valid.`,
    })
    return
  }

  // Check if the transaction is an account creation transaction
  const isNotAccountCreation = await isNotNewAccountTransaction(transId)
  if (!isNotAccountCreation) {
    res.status(401).json({
      error: `Transaction not updated. Cannot update account creation transaction.`,
    })
    return
  }

  // Get the date and balance for the account
  const [
    { created_at: accountDate, current_balance: accountBalance },
  ] = await db('accounts')
    .select()
    .where({ account_id: accountId })

  // Check so date isn't before the account was created.
  const accountComesBeforeTransaction = isValidDate(date, accountDate)

  // Check so accountbalance isn't lower than the expense if the transaction is an expense.
  let isPositiveBalance = true

  if (type === 'expense') {
    isPositiveBalance = amountIsLowerThanBalance(amount, accountBalance)
  }

  if (!accountComesBeforeTransaction || !isPositiveBalance) {
    res.status(401).json({
      error: `Transaction not created. Something went wrong.`,
    })
    return
  }
  // get all categories
  const [allCategories] = await db
    .select()
    .from('categories')
    .whereIn('category', [categoryField])

  // Check if category exists in categories
  let categoryId
  if (!allCategories) {
    ;[categoryId] = await db('categories')
      .returning('category_id')
      .insert({ category: categoryField })
  } else {
    categoryId = allCategories.category_id
  }

  // Remove old amount from current balance for old account
  await db('accounts')
    .decrement({ current_balance: oldAmount })
    .where({ account_id: oldAccountId })

  // Add amount to balance of the transactions account
  await db('accounts')
    .where({ account_id: accountId })
    .increment({
      current_balance: amountWithSign,
    })

  const updateDetails = {
    amount: amountWithSign,
    date,
    fk_account_id: accountId,
    type,
    fk_category_id: categoryId,
  }

  // Update the transaction with new data
  const [updatedTransaction] = await db('transactions')
    .update(updateDetails)
    .returning([
      'trans_id',
      'amount',
      'fk_account_id',
      'type',
      'fk_category_id',
      'date',
      'fk_user_id',
    ])
    .where({ trans_id: transId })

  res.json({
    message: 'Updated transaction',
    updatedTransaction,
  })
})

// DELETE TRANSACTION
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { transId } = req.body

  // Get the transaction
  const [transWithCat] = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.trans_id', [transId])
    .orderBy('date', 'desc')
    .column(
      {
        transId: 'trans_id',
      },
      'amount',
      'date',
      'type',
      'category',
      {
        authorid: 'transactions.fk_user_id',
      },
      {
        accountId: 'fk_account_id',
      },
      {
        accountName: 'account_name',
      },
    )
  // Get all transactions for that user
  const transactions = await db('transactions')
    .select()
    .where({ fk_user_id: userId, fk_account_id: transWithCat.accountId })

  // Check if there are more than one transaction for that user.
  if (transactions.length > 1 && transWithCat.category === 'New Account') {
    // Refuse deletion until user removes all transactions before the first one.
    res.status(404).json({
      error:
        'Cannot delete account creation transaction until other transactions are removed.',
    })
    return
  }

  // Remove transaction amount from accounts balance
  await db('accounts')
    .decrement({ current_balance: transWithCat.amount })
    .where({ account_id: transWithCat.accountId })

  // Remove the transaction record
  const result = await db('transactions')
    .del()
    .where({ trans_id: transId, fk_user_id: userId })

  if (!result) {
    res.status(404).json({ error: 'Not authorized' })
    return
  }

  res.json({ message: 'Deleted transaction', transId })
})

module.exports = router
