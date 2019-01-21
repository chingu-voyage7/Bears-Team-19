import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import 'bulma/css/bulma.css'
import './index.css'
import App from './containers/App/App'
import rootReducer from './store/reducers'
import fireConfig from './config/fireConfig.js'

import * as serviceWorker from './serviceWorker'

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
