const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_ACCOUNTBALANCE_SUCCESS':
      return { ...state, ...payload.data }
    case 'GET_ACCOUNTBALANCE_ERROR':
      return { ...state, ...payload }
    case 'GET_TOTALBALANCE_SUCCESS':
      return { ...state, ...payload.data }
    case 'GET_TOTALBALANCE_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
