const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_BALANCE_SUCCESS':
      return { ...state, ...payload.data }
    case 'GET_BALANCE_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
