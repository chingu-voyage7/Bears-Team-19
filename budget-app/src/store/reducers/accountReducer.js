const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_ACCOUNT_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_ACCOUNT_ERROR':
      return { ...state, ...payload }

    default:
      return state
  }
}
