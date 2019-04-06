const express = require('express')
const { isAuthenticated } = require('../middleware/authMiddleware')
const {
  isValidAccount,
  isValidDate,
  amountIsLowerThanBalance,
} = require('../helpers/helpers')
const db = require('../database/database.js')

const router = express.Router()

// GET TRANSACTIONS
router.get('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const transWithCat = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.fk_user_id', [userId])
    .orderBy('date', 'desc')
    .column(
      {
        transId: 'trans_id',
      },
      'amount',
      'date',
      'type',
      'category',
      {
        authorid: 'transactions.fk_user_id',
      },
      {
        accountId: 'fk_account_id',
      },
      {
        accountName: 'account_name',
      },
    )
  res.json({ message: 'Got transactions', transWithCat })
})

// CREATE TRANSACTION
router.post('/', isAuthenticated, async (req, res, next) => {
  const { amount, type, accountId, date, category: categoryField } = req.body
  const { userId } = req

  // Check so account is valid
  const isValid = await isValidAccount(accountId, userId)

  if (!isValid) {
    res.status(401).json({
      error: `Transaction not created. Something went wrong.`,
    })
    return
  }

  // Get the date and balance for the account
  const [
    { created_at: accountDate, current_balance: accountBalance },
  ] = await db('accounts')
    .select()
    .where({ account_id: accountId })

  // Check so date isn't before the account was created.
  const accountComesBeforeTransaction = isValidDate(date, accountDate)

  // Check so accountbalance isn't lower than the expense if the transaction is an expense.
  let isPositiveBalance = true

  if (type === 'expense') {
    isPositiveBalance = amountIsLowerThanBalance(amount, accountBalance)
  }

  if (!accountComesBeforeTransaction || !isPositiveBalance) {
    res.status(401).json({
      error: `Transaction not created. Something went wrong.`,
    })
    return
  }
  // Set amount to positive or negative
  let amountWithSign = 0
  type === 'expense'
    ? (amountWithSign = Number(`-${amount}`))
    : (amountWithSign = Number(amount))

  // get all categories
  const [allCategories] = await db
    .select()
    .from('categories')
    .whereIn('category', [categoryField])

  // Check if category exists in categories
  let categoryId
  if (!allCategories) {
    ;[categoryId] = await db('categories')
      .returning('category_id')
      .insert({ category: categoryField })
  } else {
    categoryId = allCategories.category_id
  }

  // // Get the balance of the account
  // const [{ balance: oldAccountBalance }] = await db('balance')
  //   .select('balance', 'balance_id')
  //   .where({ fk_account_id: accountId, type: 'account' })
  //   .orderBy('balance_id', 'desc')
  //   .limit(1)

  // // Get the total balance
  // const [{ balance: oldTotalBalance }] = await db('balance')
  //   .select('balance', 'balance_id')
  //   .where({ fk_user_id: userId, type: 'total' })
  //   .orderBy('balance_id', 'desc')
  //   .limit(1)

  // // Create new balance for account and total based on new transaction
  // const accountBalanceAfterAmount = Number(oldAccountBalance) + amountWithSign
  // const totalBalanceAfterAmount = Number(oldTotalBalance) + amountWithSign

  // create transaction
  const transactionInfo = {
    fk_user_id: userId,
    amount: amountWithSign,
    type,
    fk_account_id: accountId,
    date,
    fk_category_id: categoryId,
  }

  // Inset into database
  const [transaction] = await db('transactions')
    .returning(['trans_id', 'fk_category_id'])
    .insert(transactionInfo)

  await db('accounts')
    .increment('current_balance', amountWithSign)
    .where({ account_id: accountId })

  // // Add new account balance record.
  // await db('balance')
  //   .returning([
  //     'balance_id',
  //     'fk_account_id',
  //     'balance',
  //     'date',
  //     'fk_user_id',
  //   ])
  //   .insert({
  //     fk_user_id: userId,
  //     balance: accountBalanceAfterAmount,
  //     fk_account_id: accountId,
  //     fk_transaction_id: transaction.trans_id,
  //     date,
  //     type: 'account',
  //   })

  // // Add new total balance record
  // await db('balance')
  //   .returning([
  //     'balance_id',
  //     'balance',
  //     'fk_user_id',
  //     'date',
  //     'fk_account_id',
  //     'fk_transaction_id',
  //   ])
  //   .insert({
  //     fk_user_id: userId,
  //     balance: totalBalanceAfterAmount,
  //     fk_account_id: accountId,
  //     fk_transaction_id: transaction.trans_id,
  //     date,
  //     type: 'total',
  //   })

  res.json({
    message: 'Created transaction',
    transaction,
  })
})

// UPDATE TRANSACTION
router.patch('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const {
    transId,
    amount,
    date,
    accountId,
    type,
    category: categoryField,
  } = req.body

  let amountWithSign = 0
  type === 'expense'
    ? (amountWithSign = Number(`-${amount}`))
    : (amountWithSign = Number(amount))

  // Get old transaction
  const [
    {
      fk_user_id: authorid,
      fk_account_id: oldAccountId,
      amount: oldAmount,
      type: oldType,
      date: oldTransactionDate,
    },
  ] = await db('transactions')
    .where({ trans_id: transId })
    .select()

  // Check so the user is the owner of the transaction
  if (userId !== authorid) {
    res.status(404).json({ message: 'Not authorized' })
  } else {
    // Get the date for the account
    const [
      { created_at: accountDate, currentBalance: accountBalance },
    ] = await db('accounts')
      .select()
      .where({ account_id: accountId })

    const isValid = await isValidAccount(accountId, userId)
    // Check so date isn't before the account was created.
    const accountComesBeforeTransaction = isValidDate(date, accountDate)

    // Check so accountbalance isn't lower than the expense if the transaction is an expense.
    let isPositiveBalance = true

    if (type === 'expense') {
      isPositiveBalance = amountIsLowerThanBalance(amount, accountBalance)
    }

    if (!isValid || !accountComesBeforeTransaction || !isPositiveBalance) {
      res.status(401).json({
        error: `Transaction not updated. Something went wrong.`,
      })
    } else {
      // get all categories
      const [allCategories] = await db
        .select()
        .from('categories')
        .whereIn('category', [categoryField])

      // Check if category exists in categories
      let categoryId
      if (!allCategories) {
        ;[categoryId] = await db('categories')
          .returning('category_id')
          .insert({ category: categoryField })
      } else {
        categoryId = allCategories.category_id
      }

      // Check if amount or accountId has changed from old transaction to updated transaction
      if (oldAmount !== amount || oldAccountId !== accountId) {
        // Get old accont balance when that transaction occured
        const [
          { balance: oldAccountBalance, balance_id: oldAccountBalanceId },
        ] = await db('balance')
          .select()
          .where({ fk_transaction_id: transId, type: 'account' })

        // Get old total balance when that transaction occured
        const [
          { balance: oldTotalBalance, balance_id: oldTotalBalanceId },
        ] = await db('balance')
          .select()
          .where({ fk_transaction_id: transId, type: 'total' })

        // console.log(oldAccountBalance, 'account')
        // console.log(oldTotalBalance, 'total')
        //TODO Compare transaction amount to updated transaction amount
        const diffInAmount = Number(oldAmount) - Number(amountWithSign)

        // console.log(oldAmount, 'oldAmount')
        // console.log(diffInAmount, 'diff')

        // TODO Might be easier in long run to remove the amount and then add the new amount because there might be changes in account.
        // Update account balance record
        // const updatedBalanceRecord = await db('balance')
        //   .where({
        //     fk_user_id: userId,
        //     type: 'account',
        //     fk_transaction_id: transId,
        //   })
        //   .returning([
        //     'balance',
        //     'balance_id',
        //     'type',
        //     'date',
        //     'fk_user_id',
        //     'fk_transaction_id',
        //     'fk_account_id',
        //   ])
        //   .decrement('balance', diffInAmount)
        // console.log(updatedBalanceRecord)
        //TODO Update all records for that accounts balance after that transaction with the difference of the amount
        // Use decrement here
        const filteredAndUpdatedAccounts = await db('balance')
          .where({
            fk_user_id: userId,
            type: 'account',
          })
          .andWhere('date', '>', oldTransactionDate)
          .returning([
            'balance',
            'balance_id',
            'type',
            'date',
            'fk_user_id',
            'fk_transaction_id',
            'fk_account_id',
          ])
        // console.log(filteredAndUpdatedAccounts)
        //TODO Update all records for total balance after that transaction with the difference of the amount
        // Use decrement here
      }

      //TODO Update transaction record with new amount

      // const cleanedAccountBalance = oldAccountBalance - oldAmount

      // const accountBalanceAfterAmount = cleanedAccountBalance + amountWithSign

      // // Update accounts balance
      // await db('balance')
      //   .update({
      //     balance: accountBalanceAfterAmount,
      //     fk_account_id: accountId,
      //     date,
      //   })
      //   .where({ balance_id, fk_user_id: userId, type: 'account' })

      // const [{ balance: oldTotalBalance, totalbalance_id }] = await db(
      //   'totalbalance',
      // )
      //   .select()
      //   .where({ fk_transaction_id: transId })

      // const cleanedTotalBalance = oldTotalBalance - oldAmount
      // const totalBalanceAfterAmount = cleanedTotalBalance + amountWithSign

      // await db('totalbalance')
      //   .update({
      //     balance: totalBalanceAfterAmount,
      //     fk_account_id: accountId,
      //     date,
      //   })
      //   .where({ totalbalance_id, fk_user_id: userId })

      // //TODO: Loop through all balance records for total and account and update them updating the amount that was in the transaction

      // const updateDetails = {
      //   amount: amountWithSign,
      //   date,
      //   fk_account_id: accountId,
      //   fk_budget_id: budgetId,
      //   type,
      //   fk_category_id: categoryId,
      // }

      // // Update the transaction with new data
      // const [updatedTransaction] = await db('transactions')
      //   .update(updateDetails)
      //   .returning([
      //     'trans_id',
      //     'amount',
      //     'fk_account_id',
      //     'fk_budget_id',
      //     'type',
      //     'fk_category_id',
      //     'date',
      //     'fk_user_id',
      //   ])
      //   .where({ trans_id: transId })

      res.json({
        message: 'Updated transaction',
        // updatedTransaction,
      })
    }
  }
})

// DELETE TRANSACTION
router.delete('/', isAuthenticated, async (req, res, next) => {
  const { userId } = req
  const { transId } = req.body

  // Get all transactions for that user
  const transactions = await db('transactions')
    .select()
    .where({ fk_user_id: userId })

  // Get the transaction
  // const [transaction] = await db('transactions')
  // .select()
  // .where({ trans_id: transId })

  const [transWithCat] = await db('transactions')
    .innerJoin('categories', 'fk_category_id', 'category_id')
    .innerJoin('accounts', 'fk_account_id', 'account_id')
    .whereIn('transactions.trans_id', [transId])
    .orderBy('date', 'desc')
    .column(
      {
        transId: 'trans_id',
      },
      'amount',
      'date',
      'type',
      'category',
      {
        authorid: 'transactions.fk_user_id',
      },
      {
        accountId: 'fk_account_id',
      },
      {
        accountName: 'account_name',
      },
    )

  // Check if there are more than one transaction for that user.
  if (transactions.length > 1 && transWithCat.category === 'New Account') {
    // Refuse deletion until user removes all transactions before the first one.
    res.status(404).json({
      error:
        'Cannot delete account creation transaction until other transactions are removed.',
    })
    return
  }
  // //Get account balance when that transaction occured
  // const [balanceForAccount] = await db('balance')
  //   .select()
  //   .where({ fk_transaction_id: transId, type: 'account' })

  // //Get total balance when that transaction occured
  // const [balanceForTotal] = await db('balance')
  //   .select()
  //   .where({ fk_transaction_id: transId, type: 'total' })

  // Get all account balance records after the transaction and update them to reflect removing the transaction
  // const filteredAccountBalance = await db('balance')
  //   .where({
  //     fk_user_id: userId,
  //     fk_account_id: transaction.fk_account_id,
  //     type: 'account',
  //   })
  //   .andWhere('balance_id', '>', balanceForAccount.balance_id)
  //   .decrement({ balance: transaction.amount })
  //   .returning([
  //     'balance',
  //     'balance_id',
  //     'type',
  //     'date',
  //     'fk_user_id',
  //     'fk_transaction_id',
  //     'fk_account_id',
  //   ])

  // Get all total balance records after the transaction and update them to reflect removing the transaction
  // const filteredTotalBalance = await db('balance')
  //   .where({ fk_user_id: userId, type: 'total' })
  //   .andWhere('balance_id', '>', balanceForAccount.balance_id)
  //   .decrement({ balance: transaction.amount })
  //   .returning([
  //     'balance',
  //     'balance_id',
  //     'type',
  //     'date',
  //     'fk_user_id',
  //     'fk_transaction_id',
  //     'fk_account_id',
  //   ])

  // Remove the balance records corresponding to the transaction
  // await db('balance')
  //   .del()
  //   .where({ fk_transaction_id: transId })

  // Remove the transaction record
  const result = await db('transactions')
    .del()
    .where({ trans_id: transId, fk_user_id: userId })

  if (!result) {
    res.status(404).json({ error: 'Not authorized' })
    return
  }

  res.json({ message: 'Deleted transaction', transId })
})

module.exports = router
