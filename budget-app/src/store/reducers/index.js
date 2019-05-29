import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import authReducer from './authReducer'
import balanceReducer from './balanceReducer'
import transactionReducer from './transactionReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  firebase: firebaseReducer,
  account: accountReducer,
  user: userReducer,
  balancelog: balanceReducer,
})

export default rootReducer
