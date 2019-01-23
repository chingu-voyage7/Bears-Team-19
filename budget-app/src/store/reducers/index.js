import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

import authReducer from './authReducer'
import budgetReducer from './budgetReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  budget: budgetReducer,
})

export default rootReducer
