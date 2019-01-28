const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_TRANSACTION_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_TRANSACTION_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
