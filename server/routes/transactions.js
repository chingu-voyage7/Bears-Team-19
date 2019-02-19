const express = require('express')
const db = require('../database/database.js')

const router = express.Router()

// GET TRANSACTIONS
router.get('/', async (req, res, next) => {
  const { uid } = req.headers
  if (!uid) {
    res.status(404).json({ message: 'Not authorized' })
  } else {
    const userResponse = await db('users')
      .where({ uid })
      .select()

    if (!userResponse.length) {
      res.status(404).json({ message: 'Not authorized' })
    } else {
      const [{ user_id }] = userResponse
      const transWithCat = await db('transactions')
        .innerJoin('categories', 'fk_category_id', 'category_id')
        .where({ fk_user_id: user_id })
        .orderBy('trans_id')
        .column(
          'trans_id',
          'amount',
          'fk_account_id',
          'date',
          'type',
          'category',
          {
            authorid: 'fk_user_id',
          },
        )
      res.json({ message: 'Got transactions', transWithCat })
    }
  }
})

// CREATE TRANSACTION
router.post('/', async (req, res, next) => {
  // Get users uid
  const { uid, amount, type, account, date, category: categoryField } = req.body

  // budgetField will be an array of strings

  const [{ user_id }] = await db('users')
    .where({ uid })
    .select()

  // TODO:
  // Map over budgetField array and check if the values exist in budget table

  // If a value doesn't exist, add it to budgets table and return budget id

  // If all values exist in budget table return the ids of the rows as array.

  // Set that array to budgetIds variable

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
  const transactionInfo = {
    fk_user_id: user_id,
    amount,
    type,
    fk_account_id: account,
    fk_budget_id: 1, // TODO: Change later
    date,
    fk_category_id: categoryId,
  }

  // Inset into database
  const [transaction] = await db('transactions')
    .returning(['trans_id', 'fk_category_id'])
    .insert(transactionInfo)

  res.json({ message: 'Created transaction', transaction })
})

// UPDATE TRANSACTION
// TODO: Make sure you don't need to send all input fields
router.post('/:transid', async (req, res, next) => {
  const { uid } = req.headers
  const { transid } = req.params
  const { amount, date, account, type, category: categoryField } = req.body

  // Check if there is a user that is logged in that is making the request.
  if (!uid) {
    res.status(404).json({ message: 'Not authorized' })
  } else {
    // Check so there is a user in database
    const userResponse = await db('users')
      .where({ uid })
      .select()

    if (!userResponse.length) {
      res.status(404).json({ message: 'Not authorized' })
    } else {
      const [{ fk_user_id: authorid }] = await db('transactions')
        .where({ trans_id: transid })
        .select()
      const [{ user_id }] = userResponse

      // Check so the user is the owner of the transaction
      if (user_id !== authorid) {
        res.status(404).json({ message: 'Not authorized' })
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

        const updateDetails = {
          amount,
          date,
          account,
          type,
          fk_category_id: categoryId,
        }

        // Update the transaction with new data
        const [updatedTransaction] = await db('transactions')
          .update(updateDetails)
          .returning([
            'trans_id',
            'amount',
            'account',
            'type',
            'fk_category_id',
            'date',
            'fk_user_id',
          ])
          .where({ trans_id: transid })

        res.json({
          message: 'Updated transaction',
          updatedTransaction,
        })
      }
    }
  }
})

// DELETE TRANSACTION
router.delete('/:transid', async (req, res, next) => {
  const { uid } = req.headers
  const { transid } = req.params

  // Check if there is a user that is logged in that is making the request.
  if (!uid) {
    res.status(404).json({ message: 'Not authorized' })
  } else {
    // Check so there is a user in database
    const userResponse = await db('users')
      .where({ uid })
      .select()

    if (!userResponse.length) {
      res.status(404).json({ message: 'Not authorized' })
    } else {
      const [{ fk_user_id: authorid }] = await db('transactions')
        .where({ trans_id: transid })
        .select()
      const [{ user_id }] = userResponse

      // Check so the user is the owner of the transaction
      if (user_id !== authorid) {
        res.status(404).json({ message: 'Not authorized' })
      } else {
        await db('transactions')
          .del()
          .where({ trans_id: transid })

        res.json({ message: 'Deleted transaction', transid })
      }
    }
  }
})

module.exports = router
