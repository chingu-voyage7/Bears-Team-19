const express = require('express')
const db = require('../database/database.js')

const router = express.Router()

// Get budget
// Get all budgets
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
      res.json({ message: 'Budgets' })
    }
  }
  // Get all budgets for that user.
})

// Create budget
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
      const { budgetName } = req.body
      const [{ user_id }] = userResponse

      const newBudget = await db('budgets')
        .insert({ budget_name: budgetName, fk_user_id: user_id })
        .returning(['budget_name', 'budget_id'])

      res.json({ message: 'Budget created', newBudget })
    }
  }
})

// Update budget
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
      res.json({ message: 'Budgets Patch' })
    }
  }
})

// Delete budget
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
      res.json({ message: 'Budgets Delete' })
    }
  }
})

module.exports = router
