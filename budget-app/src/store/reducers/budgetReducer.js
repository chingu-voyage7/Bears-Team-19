const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_BUDGET_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_BUDGET_ERROR':
      return { ...state, ...payload }

    default:
      return state
  }
}