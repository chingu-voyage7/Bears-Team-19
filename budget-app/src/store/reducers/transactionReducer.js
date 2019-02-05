const initialState = {}
// const initialState = {
//   transactions: [
//     {
//       id: 1,
//       amount: 9.34,
//       category: 'Food',
//       type: 'expense',
//       account: 'Spending account',
//       date: '2018-12-03',
//       authorid: 'ovCsEFb1IfWBpeB2YZWYHeCYrwM2',
//     },
//     {
//       id: 2,
//       amount: 12.34,
//       category: 'Insurance',
//       type: 'expense',
//       account: 'Spending account',
//       date: '2018-12-04',
//       authorid: 'ovCsEFb1IfWBpeB2YZWYHeCYrwM2',
//     },
//     {
//       id: 3,
//       amount: 23.4,
//       category: 'Clothes',
//       type: 'expense',
//       account: 'Spending account',
//       date: '2018-11-03',
//       authorid: 'cZXRmYnLutcEvdunjZ5dmJ0CisM2',
//     },
//     {
//       id: 4,
//       amount: 126.54,
//       category: 'Car',
//       type: 'expense',
//       account: 'Spending account',
//       date: '2018-10-08',
//       authorid: 'ovCsEFb1IfWBpeB2YZWYHeCYrwM2',
//     },
//     {
//       id: 5,
//       amount: 32.89,
//       category: 'Paycheck',
//       type: 'income',
//       account: 'Spending account',
//       date: '2018-05-16',
//       authorid: 'cZXRmYnLutcEvdunjZ5dmJ0CisM2',
//     },
//     {
//       id: 6,
//       amount: 45.34,
//       category: 'Food',
//       type: 'expense',
//       account: 'Spending account',
//       date: '2018-08-13',
//       authorid: 'ovCsEFb1IfWBpeB2YZWYHeCYrwM2',
//     },
//   ],
// }

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_TRANSACTION_SUCCESS':
      return {
        ...state,
      }
    case 'UPDATE_TRANSACTION_ERROR':
      return { ...state, ...payload }
    case 'GET_TRANSACTIONS_SUCCESS':
      const transactions = payload.data.transWithCat
      return { ...state, transactions }
    case 'GET_TRANSACTIONS_ERROR':
      return { ...state, ...payload }
    case 'ADD_TRANSACTION_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_TRANSACTION_ERROR':
      return { ...state, ...payload }
    case 'DELETE_TRANSACTION_SUCCESS':
      const newTransactions = state.transactions.filter(
        transaction => transaction.trans_id !== parseInt(payload.data.transid),
      )
      return { ...state, transactions: newTransactions }
    case 'DELETE_TRANSACTION_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
