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

const getTotalBalance = async userId => {
  // Get all accounts for that user
  const accounts = await db('accounts')
    .select()
    .where({ fk_user_id: userId })

  // Get all accounts for that user, if none, default to 0.00
  // Set total balance
  let totalBalance = 0.0
  if (accounts.length) {
    totalBalance = accounts.reduce(
      (a, b) => parseFloat(a) + parseFloat(b.balance),
      0,
    )
  } else {
    totalBalance = 0.0
  }
  return totalBalance
}
module.exports = { isValidBudgetAndAccount, getTotalBalance }
