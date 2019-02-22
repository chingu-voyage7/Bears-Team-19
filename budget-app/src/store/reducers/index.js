import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import accountReducer from './accountReducer'
import authReducer from './authReducer'
import budgetReducer from './budgetReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  firebase: firebaseReducer,
  budget: budgetReducer,
  account: accountReducer,
})

export default rootReducer
