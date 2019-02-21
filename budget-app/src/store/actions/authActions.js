import axios from 'axios'

export const signUp = payload => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(res => {
      // save to our database
      const newUser = {
        uid: res.user.uid,
        username: payload.username,
        email: payload.email,
      }
      axios
        .post('/users', newUser)
        .then(res => {
          dispatch({
            type: 'SIGNUP_SUCCESS',
            res,
          })
        })
        .catch(err => {
          dispatch({
            type: 'SIGNUP_ERROR',
            err,
          })
        })
      return res
    })
    .catch(err => {
      dispatch({
        type: 'SIGNUP_ERROR',
        err,
      })
    })
}

export const signIn = payload => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      dispatch({
        type: 'SIGNIN_SUCCESS',
      })
    })
    .catch(err => {
      dispatch({ type: 'SIGNIN_ERROR', err })
    })
}

export const signOut = payload => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: 'SIGNOUT_SUCCESS',
      })
    })
    .catch(err => {
      dispatch({
        type: 'SIGNOUT_ERROR',
        err,
      })
    })
}
