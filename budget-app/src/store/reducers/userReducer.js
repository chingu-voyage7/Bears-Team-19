const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_USER_SUCCESS':
      // console.log(payload)
      return { ...state, ...payload.data.data }
    case 'GET_USER_ERROR':
      return { ...state, ...payload }

    default:
      return state
  }
}
