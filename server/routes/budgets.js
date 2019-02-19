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
      const [{ user_id }] = userResponse

      // Get all budgets for that user.
      const budgets = await db('budgets')
        .select()
        .where({ fk_user_id: user_id })
      res.json({ message: 'Budgets', budgets })
    }
  }
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
      const { budgetId, budgetName } = req.body
      const updatedBudget = await db('budgets')
        .update({ budget_name: budgetName })
        .where({ budget_id: budgetId })
        .returning(['budget_id', 'budget_name'])

      res.json({ message: 'Budget updated', updatedBudget })
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
      const { budgetId: budget_id } = req.body

      const deletedBudget = await db('budgets')
        .del()
        .where({ budget_id })
      res.json({ message: 'Budget deleted', deletedBudget })
    }
  }
})

module.exports = router
