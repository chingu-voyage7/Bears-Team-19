const express = require('express')
const db = require('../database/database.js')

const router = express.Router()

// Get account

// Get all accounts
router.get('/', async (req, res, next) => {
  // check that user exists
  const { uid } = req.headers
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
      const [{ user_id }] = userResponse

      // Get all accounts for that user.
      const accounts = await db('accounts')
        .select()
        .where({ fk_user_id: user_id })

      res.json({ message: 'Accounts', accounts })
    }
  }
})

// Create account
router.post('/', async (req, res, next) => {
  // check that user exists
  const { uid } = req.headers
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
      const { account, balance } = req.body
      const [{ user_id }] = userResponse

      // Create account
      const newAccount = await db('accounts')
        .returning(['account_id'])
        .insert({ fk_user_id: user_id, account_name: account, balance })

      res.json({
        message: 'Accounts created',
        newAccount,
      })
    }
  }
})

// Update account
router.patch('/', async (req, res, next) => {
  // check that user exists
  const { uid } = req.headers
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
      // Update account
      const { accountId, accountName, balance } = req.body
      const updatedAccount = await db('accounts')
        .update({ account_name: accountName, balance })
        .where({ account_id: accountId })
        .returning(['account_id', 'account_name', 'balance'])

      res.json({
        message: 'Account updated',
        updatedAccount,
      })
    }
  }
})

// Delete account
router.delete('/', async (req, res, next) => {
  // check that user exists
  const { uid } = req.headers
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
      const { account_id } = req.body

      const deletedAccount = await db('accounts')
        .del()
        .where({ account_id })
      res.json({ message: 'Account deleted', deletedAccount })
    }
  }
})

module.exports = router
