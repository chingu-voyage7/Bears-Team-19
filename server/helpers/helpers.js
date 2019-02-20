const db = require('../database/database.js')

const isValidBudgetAndAccount = async (accountId, budgetId, userId) => {
  const budgetCheck = await db('budgets')
    .select()
    .where({ budget_id: budgetId, fk_user_id: userId })

  const accountCheck = await db('accounts')
    .select()
    .where({ account_id: accountId, fk_user_id: userId })

  if (budgetCheck.length === 0 || accountCheck.length === 0) {
    return false
  }
  return true
}

module.exports = { isValidBudgetAndAccount }
