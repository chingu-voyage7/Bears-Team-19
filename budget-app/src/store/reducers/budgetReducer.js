const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_EXPENSE_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_EXPENSE_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
