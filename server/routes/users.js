const express = require('express')
const db = require('../database/database.js')

const router = express.Router()

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await db.select().from('users')

    res.json({ message: 'Users', data: users })
  } catch (error) {
    console.error(error)
    res.json({ message: 'Error', error })
  }
})

// Get user based on id
router.get('/user/:id', async (req, res, next) => {
  const { id } = req.params
  const [user] = await db('users')
    .where({ user_id: id })
    .select()

  // Set total balance
  // Get all acounts for that user
  const accounts = await db('accounts')
    .select()
    .where({ fk_user_id: id })

  // Get all accounts for that user, if none, default to 0.00
  let totalBalance = 0.0
  if (accounts.length) {
    totalBalance = accounts.reduce(
      (a, b) => parseFloat(a) + parseFloat(b.balance),
      0,
    )
  } else {
    totalBalance = 0.0
  }
  const userWithBalance = { ...user, balance: totalBalance }
  res.json({ message: 'Got user', data: userWithBalance })
})

// Create new user
router.post('/user', async (req, res, next) => {
  const userDetails = req.body
  try {
    const [userId] = await db('users')
      .returning('user_id')
      .insert(userDetails)

    res.json({ message: 'Created user', data: userId })
  } catch (error) {
    res.status(404).json({ message: 'Error', error })
  }
})

// Update user based on id
router.post('/user/:id', async (req, res, next) => {
  const { id } = req.params
  const updateDetails = req.body

  const [updatedUser] = await db('users')
    .update(updateDetails)
    .returning(['user_id', 'email', 'username', 'balance', 'notifications'])
    .where({ user_id: id })

  res.json({ message: 'Updated user', data: updatedUser })
})

// Delete user based on id
router.delete('/user/:id', async (req, res, next) => {
  const { id } = req.params

  const deletedUser = await db('users')
    .del()
    .where({ user_id: id })

  res.json({ message: 'Deleted user' })
})

module.exports = router
