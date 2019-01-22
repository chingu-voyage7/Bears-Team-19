const express = require('express')
const passport = require('passport')
const client = require('../client')
const helper = require('./helper')

require('../config/passport')(passport)

const router = express.Router()

router.get(
  '/budget/:budgetId?',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { budgetId } = req.params
    const urlSuffix = budgetId ? `?budget_id=eq.${budgetId}` : ''
    client
      .getIncome(`/incomes${urlSuffix}`)
      .then(result => res.json(result.data))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { budgetId, description, amount } = req.body
    client
      .postIncome('/incomes', { budget_id: budgetId, description, amount })
      .then(result => res.json(result))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

router.patch(
  '/:incomeId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { incomeId } = req.params
    const { budgetId, description, amount } = req.body
    client
      .updateIncome(`/incomes?id=eq.${incomeId}`, {
        budget_id: budgetId,
        description,
        amount,
      })
      .then(result => res.json(result))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

router.delete(
  '/:incomeId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { incomeId } = req.params
    const urlSuffix = incomeId ? `?id=eq.${incomeId}` : ''
    client
      .deleteIncome(`/incomes${urlSuffix}`)
      .then(result => res.json(result))
      .catch(error => res.json(helper.errorHandler(error)))
  },
)

module.exports = router
