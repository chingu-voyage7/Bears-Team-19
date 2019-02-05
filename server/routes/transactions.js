const express = require('express')
const db = require('../database/database.js')

const router = express.Router()

// Get all transactions for a user
router.get('/', async (req, res, next) => {
  // get user based on uid
  const { uid } = req.headers

  const [{ user_id }] = await db('users')
    .where({ uid })
    .select()

  // const transactions = await db('transactions')
  //   .where({ fk_user_id: user_id })
  //   .orderBy('trans_id')
  //   .select()

  const transWithCat = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .where({ fk_user_id: user_id })
    .orderBy('trans_id')
    .column('trans_id', 'amount', 'account', 'date', 'type', 'category', {
      authorid: 'fk_user_id',
    })
  // look up in database table transactions which have the users id as a foreign key.
  // console.log(transWithCat)
  // console.log(transWithCat)
  res.json({ message: 'Got transactions', transWithCat })
})

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
    account,
    date,
    fk_category_id: categoryId,
  }

  // Inset into database
  const [transaction] = await db('transactions')
    .returning(['trans_id', 'fk_category_id'])
    .insert(transactionInfo)

  res.json({ message: 'Created transaction', transaction })
})

// Update a transaction based on its id
// TODO: Make sure you don't need to send all input fields
router.post('/:transid', async (req, res, next) => {
  const { transid } = req.params
  const { amount, date, account, type, category: categoryField } = req.body

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

  // console.log(updatedTransaction)
  res.json({ message: 'Updated transaction', updatedTransaction })
})

// Delete a transaction based on its id
router.delete('/:transid', async (req, res, next) => {
  const { transid } = req.params

  await db('transactions')
    .del()
    .where({ trans_id: transid })

  res.json({ message: 'Deleted transaction', transid })
})

module.exports = router
