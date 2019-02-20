const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const { getTotalBalance } = require('../helpers/helpers')
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
router.get('/user/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const [user] = await db('users')
    .where({ user_id: userId })
    .select()

  const totalBalance = await getTotalBalance(userId)
  const userWithBalance = { ...user, balance: totalBalance }
  res.json({ message: 'Got user', data: userWithBalance })
})

// Create new user
router.post('/', async (req, res, next) => {
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
router.patch('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const updateDetails = req.body

  const [updatedUser] = await db('users')
    .update(updateDetails)
    .returning(['user_id', 'email', 'username', 'notifications'])
    .where({ user_id: userId })

  const totalBalance = await getTotalBalance(userId)
  const userWithBalance = { ...updatedUser, balance: totalBalance }
  res.json({ message: 'Updated user', data: userWithBalance })
})

// Delete user based on id
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req

  const deletedUser = await db('users')
    .del()
    .where({ user_id: userId })

  if (!deletedUser) {
    res.json({ error: `Couldn't delete user` })
  }
  res.json({ message: 'Deleted user' })
})

module.exports = router
