import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  firebase: firebaseReducer,
  transaction: transactionReducer,
})

export default rootReducer
