const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_ACCOUNT_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_ACCOUNT_ERROR':
      return { ...state, ...payload }

    case 'GET_ACCOUNTS_SUCCESS':
      return { ...state, ...payload.data }
    case 'GET_ACCOUNTS_ERROR':
      return { ...state, ...payload }

    case 'UPDATE_ACCOUNT_SUCCESS':
      return { ...state, ...payload }
    case 'UPDATE_ACCOUNT_ERROR':
      return { ...state, ...payload }

    case 'DELETE_ACCOUNT_SUCCESS':
      const filteredAccounts = state.accounts.filter(
        account => account.account_id !== parseInt(payload.data.accountId),
      )
      return { ...state, accounts: filteredAccounts }
    case 'DELETE_ACCOUNT_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
