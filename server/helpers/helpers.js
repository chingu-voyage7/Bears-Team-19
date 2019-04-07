const { compareAsc } = require('date-fns')
const db = require('../database/database.js')

const isValidAccount = async (accountId, userId) => {
  const accountCheck = await db('accounts')
    .select()
    .where({ account_id: accountId, fk_user_id: userId })

  if (accountCheck.length === 0) {
    return false
  }
  return true
}

const isValidDate = (transactionDate, accountDate) => {
  const result = compareAsc(transactionDate, accountDate)

  if (result === -1) {
    return false
  }
  return true
}

const getAccountsWithBalance = async userId => {
  // Get all accounts for that user.
  const accounts = await db('accounts')
    .select()
    .where({ fk_user_id: userId })
    .orderBy('created_at', 'asc')

  return accounts
}

const amountIsLowerThanBalance = (amount, accountBalance) => {
  if (amount > accountBalance) {
    return false
  }
  return true
}

const createBalance = (transactionAmount, accountBalance) =>
  Number(accountBalance) + Number(transactionAmount)

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

const isNotNewAccountTransaction = async transId => {
  // const [transaction] = await db('transactions').where({ trans_id: transId })
  const [transWithCat] = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.trans_id', [transId])
    .orderBy('date', 'desc', 'created_at', 'desc')
    .column('category')
  if (transWithCat.category === 'New Account') {
    return false
  }
  return true
}

module.exports = {
  isValidAccount,
  getTotalBalance,
  getAccountsWithBalance,
  isValidDate,
  amountIsLowerThanBalance,
  createBalance,
  isNotNewAccountTransaction,
}
