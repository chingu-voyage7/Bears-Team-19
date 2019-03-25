const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const { isValidBudgetAndAccount } = require('../helpers/helpers')
const db = require('../database/database.js')

const router = express.Router()

// GET TRANSACTIONS
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const transWithCat = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('budgets', 'fk_budget_id', 'budget_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.fk_user_id', [userId])
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
        budgetId: 'fk_budget_id',
      },
      {
        accountId: 'fk_account_id',
      },
      {
        budgetName: 'budget_name',
      },
      {
        accountName: 'account_name',
      },
    )
  res.json({ message: 'Got transactions', transWithCat })
})

// CREATE TRANSACTION
router.post('/', isAuthenticated, async (req, res, next) => {
  const {
    amount,
    type,
    accountId,
    date,
    category: categoryField,
    budgetId,
  } = req.body
  const { userId } = req

  const isValid = await isValidBudgetAndAccount(accountId, budgetId, userId)
  if (!isValid) {
    res.status(401).json({
      error: `Transaction not created, budget or account doesn't exist or doesn't belong to you.`,
    })
  } else {
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

    // Get the balance of the account
    const [{ balance: oldAccountBalance }] = await db('accountbalance')
      .select('balance', 'accountbalance_id')
      .where({ fk_account_id: accountId })
      .orderBy('accountbalance_id', 'desc')
      .limit(1)

    // Get the total balance
    const [{ balance: oldTotalBalance }] = await db('totalbalance')
      .select('balance', 'totalbalance_id')
      .where({ fk_user_id: userId })
      .orderBy('totalbalance_id', 'desc')
      .limit(1)

    // Create new balance for account and total based on new transaction
    const accountBalanceAfterAmount = Number(oldAccountBalance) + amountWithSign
    const totalBalanceAfterAmount = Number(oldTotalBalance) + amountWithSign

    // create transaction
    const transactionInfo = {
      fk_user_id: userId,
      amount: amountWithSign,
      type,
      fk_account_id: accountId,
      fk_budget_id: budgetId,
      date,
      fk_category_id: categoryId,
    }

    // Inset into database
    const [transaction] = await db('transactions')
      .returning(['trans_id', 'fk_category_id'])
      .insert(transactionInfo)

    // Add new account balance record.
    await db('accountbalance')
      .returning([
        'accountbalance_id',
        'fk_account_id',
        'balance',
        'date',
        'fk_user_id',
      ])
      .insert({
        fk_user_id: userId,
        balance: accountBalanceAfterAmount,
        fk_account_id: accountId,
        fk_transaction_id: transaction.trans_id,
        date,
      })

    // Add new total balance record
    await db('totalbalance')
      .returning([
        'totalbalance_id',
        'balance',
        'fk_user_id',
        'date',
        'fk_account_id',
        'fk_transaction_id',
      ])
      .insert({
        fk_user_id: userId,
        balance: totalBalanceAfterAmount,
        fk_account_id: accountId,
        fk_transaction_id: transaction.trans_id,
        date,
      })

    res.json({
      message: 'Created transaction',
      transaction,
    })
  }
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
    budgetId,
  } = req.body

  let amountWithSign = 0
  type === 'expense'
    ? (amountWithSign = Number(`-${amount}`))
    : (amountWithSign = Number(amount))

  const [
    {
      fk_user_id: authorid,
      fk_account_id: oldAccountID,
      amount: oldAmount,
      type: oldType,
    },
  ] = await db('transactions')
    .where({ trans_id: transId })
    .select()
  console.log(transId)
  // Check so the user is the owner of the transaction
  if (userId !== authorid) {
    res.status(404).json({ message: 'Not authorized' })
  } else {
    const isValid = await isValidBudgetAndAccount(accountId, budgetId, userId)
    if (!isValid) {
      res.status(401).json({
        error: `Transaction not updated, budget or account doesn't exist or doesn't belong to you.`,
      })
    } else {
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

      const [{ balance, balancelog_id }] = await db('balancelog')
        .select()
        .where({ fk_transaction_id: transId })

      const cleanedBalance = balance - oldAmount

      const balanceAfterAmount = cleanedBalance + amountWithSign

      // Update accounts balance
      await db('balancelog')
        .update({ balance: balanceAfterAmount })
        .where({ balancelog_id, fk_user_id: userId })

      const updateDetails = {
        amount: amountWithSign,
        date,
        fk_account_id: accountId,
        fk_budget_id: budgetId,
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
          'fk_budget_id',
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
    }
  }
})

// DELETE TRANSACTION
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { transId } = req.body

  // Remove the account balance record corresponding to the transaction
  await db('accountbalance')
    .del()
    .where({ fk_transaction_id: transId })

  // Remove the total balance record corresponding to the transaction
  await db('totalbalance')
    .del()
    .where({ fk_transaction_id: transId })

  const result = await db('transactions')
    .del()
    .where({ trans_id: transId, fk_user_id: userId })

  if (!result) {
    res.status(404).json({ error: 'Not authorized' })
  }
  res.json({ message: 'Deleted transaction', transId })
})

module.exports = router
