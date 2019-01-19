const initState = {
  authError: null,
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      console.log('Login success')
      return {
        ...state,
        authError: null,
      }
    case 'SIGNIN_ERROR':
      console.log('Login failed')
      return {
        ...state,
        authError: 'Login failed',
      }
    default:
      return state
  }
}

export default authReducer
