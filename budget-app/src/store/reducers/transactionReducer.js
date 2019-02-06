const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_TRANSACTION_SUCCESS':
      return {
        ...state,
      }
    case 'UPDATE_TRANSACTION_ERROR':
      return { ...state, ...payload }
    case 'ADD_TRANSACTION_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_TRANSACTION_ERROR':
      return { ...state, ...payload }
    case 'GET_TRANSACTIONS_SUCCESS':
      const transactions = payload.data.transWithCat
      const newState = { ...state, transactions }
      return newState
    case 'GET_TRANSACTIONS_ERROR':
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
