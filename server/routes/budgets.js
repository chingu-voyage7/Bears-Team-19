const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const db = require('../database/database.js')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  // Get all budgets for that user.
  const budgets = await db('budgets')
    .select()
    .where({ fk_user_id: userId })
  res.json({ message: 'Budgets', budgets })
})

// Create budget
router.post('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { budgetName } = req.body

  const newBudget = await db('budgets')
    .insert({ budget_name: budgetName, fk_user_id: userId })
    .returning(['budget_name', 'budget_id'])

  res.json({ message: 'Budget created', newBudget })
})

// Update budget
router.patch('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { budgetId, budgetName } = req.body
  const updatedBudget = await db('budgets')
    .update({ budget_name: budgetName })
    .where({ budget_id: budgetId, fk_user_id: userId })
    .returning(['budget_id', 'budget_name'])

  res.json({ message: 'Budget updated', updatedBudget })
})

// Delete budget
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { budgetId: budget_id } = req.body

  const deletedBudget = await db('budgets')
    .del()
    .where({ budget_id, fk_user_id: userId })
  res.json({ message: 'Budget deleted', deletedBudget })
})

module.exports = router
