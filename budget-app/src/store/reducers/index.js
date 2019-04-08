import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import authReducer from './authReducer'
import balancelogReducer from './balancelogReducer'
import transactionReducer from './transactionReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  firebase: firebaseReducer,
  account: accountReducer,
  user: userReducer,
  balancelog: balancelogReducer,
})

export default rootReducer
