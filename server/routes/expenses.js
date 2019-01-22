const express = require('express')
const passport = require('passport')
const client = require('../client')
const helper = require('./helper')

require('../config/passport')(passport)

const router = express.Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { budgetId, description, amount, categoryId } = req.body
    client
      .postExpense('/expenses', {
        budgetId,
        description,
        amount,
        categoryId,
      })
      .then(result => res.json(result))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

router.get(
  '/budget/:budgetId?',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { budgetId } = req.params
    const urlSuffix = budgetId ? `?budgetId=eq.${budgetId}` : ''
    client
      .getExpense(`/expenses${urlSuffix}`)
      .then(result => res.json(result.data))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

router.patch(
  '/:expenseId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { expenseId } = req.params
    const { budgetId, description, amount, categoryId } = req.body
    client
      .updateExpense(`/expenses?id=eq.${expenseId}`, {
        budgetId,
        description,
        amount,
        categoryId,
      })
      .then(result => res.json(result))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

router.delete(
  '/:expenseId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { expenseId } = req.params
    const urlSuffix = expenseId ? `?id=eq.${expenseId}` : ''
    client
      .deleteExpense(`/expenses${urlSuffix}`)
      .then(result => res.json(result))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

module.exports = router
