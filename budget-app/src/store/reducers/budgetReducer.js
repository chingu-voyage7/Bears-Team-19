const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'CREATE_BUDGET':
      return { ...state, ...payload }

    default:
      return state
  }
}
