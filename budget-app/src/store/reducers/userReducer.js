const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_USER_SUCCESS':
      return { ...state, ...payload.data.data }
    case 'GET_USER_ERROR':
      return { ...state, ...payload }

    case 'UPDATE_USER_SUCCESS':
      return { ...state, ...payload.data.data }
    case 'UPDATE_USER_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
