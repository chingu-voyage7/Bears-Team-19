const express = require('express')
const db = require('../database/database.js')

const router = express.Router()

// Get all transactions for a user
router.get('/', async (req, res, next) => {
  // get user based on uid
  const uid = req.header('uid')

  const [{ user_id }] = await db('users')
    .where({ uid })
    .select()

  const transactions = await db('transactions')
    .where({ fk_user_id: user_id })
    .orderBy('trans_id')
    .select()
  // look up in database table transactions which have the users id as a foreign key.
  console.log(transactions)
  res.json({ message: 'Got transactions', transactions })
})

router.post('/', async (req, res, next) => {
  // Get users uid
  const { uid, amount, type, account, date } = req.body

  const [{ user_id }] = await db('users')
    .where({ uid })
    .select()

  // create a transaction and insert into database
  const transactionInfo = { fk_user_id: user_id, amount, type, account, date }

  // inset into database
  const [transaction] = await db('transactions')
    .returning('trans_id')
    .insert(transactionInfo)
  res.json({ message: 'Created transaction', transaction })
})

// Update a transaction based on its id
router.post('/:transid', async (req, res, next) => {
  const { transid } = req.params
  const { amount, date, account, type } = req.body

  const updateDetails = { amount, date, account, type }

  const [updatedTransaction] = await db('transactions')
    .update(updateDetails)
    .returning(['trans_id', 'amount', 'account', 'type', 'date', 'fk_user_id'])
    .where({ trans_id: transid })
  res.json({ message: 'Updated transaction', updatedTransaction })
})

// Delete a transaction based on its id
router.delete('/:transid', async (req, res, next) => {
  const { transid } = req.params

  const deletedTransaction = await db('transactions')
    .del()
    .where({ trans_id: transid })

  console.log(deletedTransaction)
  res.json({ message: 'Deleted transaction', deletedTransaction })
})

module.exports = router
