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
    case 'SIGNOUT_SUCCESS':
      console.log('signout success')
      return {
        ...state,
        authError: null,
      }
    case 'SIGNOUT_ERROR':
      console.log('signout failed')
      return {
        ...state,
        authError: 'Signout failed',
      }
    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null,
      }
    case 'SIGNUP_ERROR':
      console.log('signup failed')
      return {
        ...state,
        authError: 'Signup failed',
      }
    default:
      return state
  }
}

export default authReducer
