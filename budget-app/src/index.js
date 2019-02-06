import axios from 'axios'
import 'bulma/css/bulma.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import fireConfig from './config/fireConfig.js'
import App from './containers/App/App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import rootReducer from './store/reducers'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_URL_REMOTE
    : process.env.REACT_APP_BACKEND_URL_LOCAL

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase })),
    reactReduxFirebase(fireConfig, { attachAuthIsReady: true }),
  ),
)
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
