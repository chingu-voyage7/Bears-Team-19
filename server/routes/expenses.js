const express = require('express')
const passport = require('passport')
const client = require('../client')
const helper = require('./helper')

require('../config/passport')(passport)

const router = express.Router()

router.post('/', (req, res) => {
  const { budget_id, description, amount, category_id } = req.body
  client
    .postExpense('/expenses', {
      budget_id,
      description,
      amount,
      category_id,
    })
    .then(result => res.json(result))
    .catch(error => res.json(helper.errorHandler(error)))
})

router.get('/budget/:budget_id?', (req, res) => {
  const { budget_id } = req.params
  const urlSuffix = budget_id ? `?budget_id=eq.${budget_id}` : ''
  client
    .getExpense(`/expenses${urlSuffix}`)
    .then(result => res.json(result.data))
    .catch(error => res.json(helper.errorHandler(error)))
})

router.patch('/:expense_id', (req, res) => {
  const { expense_id } = req.params
  const { budget_id, description, amount, category_id } = req.body
  client
    .updateExpense(`/expenses?id=eq.${expense_id}`, {
      budget_id,
      description,
      amount,
      category_id,
    })
    .then(result => res.json(result))
    .catch(error => res.json(helper.errorHandler(error)))
})

router.delete('/:expense_id', (req, res) => {
  const { expense_id } = req.params
  const urlSuffix = expense_id ? `?id=eq.${expense_id}` : ''
  client
    .deleteExpense(`/expenses${urlSuffix}`)
    .then(result => res.json(result))
    .catch(error => res.json(helper.errorHandler(error)))
})

module.exports = router
