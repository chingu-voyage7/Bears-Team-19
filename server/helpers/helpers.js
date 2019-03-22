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

const getAccountsWithBalance = async userId => {
  // Get all accounts for that user.
  const accounts = await db('accounts')
    .select()
    .where({ fk_user_id: userId })
  const accountsWithBalance = await Promise.all(
    accounts.map(async account => {
      const [{ balance, balancelog_id }] = await db('balancelog')
        .select()
        .where({ fk_user_id: userId, fk_account_id: account.account_id })
        .orderBy('balancelog_id', 'desc')
        .limit(1)

      const accountWithBalance = {
        ...account,
        balance,
        balancelog_id,
      }
      return accountWithBalance
    }),
  )
  return accountsWithBalance
}

const getTotalBalance = async userId => {
  // Get all accounts for that user, if none, default to 0.00
  // Set total balance
  const accountsWithBalance = await getAccountsWithBalance(userId)
  let totalBalance = 0.0
  if (accountsWithBalance.length) {
    totalBalance = accountsWithBalance.reduce(
      (a, b) => parseFloat(a) + parseFloat(b.balance),
      0,
    )
  } else {
    totalBalance = 0.0
  }
  return totalBalance
}
module.exports = {
  isValidBudgetAndAccount,
  getTotalBalance,
  getAccountsWithBalance,
}
