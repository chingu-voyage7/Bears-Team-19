import axios from 'axios'

export const signUp = payload => (dispatch, getState, { getFirebase }) => {
  const { signupType } = payload
  const firebase = getFirebase()

  switch (signupType) {
    case 'email':
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
      break

    case 'google':
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          const user = result.user
          const newUser = {
            username: user.displayName,
            email: user.email,
            uid: user.uid,
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
          return result
        })
        .catch(err => {
          dispatch({
            type: 'SIGNUP_ERROR',
            err,
          })
        })
      break
    default:
      break
  }
}

export const signIn = payload => (dispatch, getState, { getFirebase }) => {
  const { signinType } = payload
  const firebase = getFirebase()

  switch (signinType) {
    case 'email':
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
      break

    case 'google':
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          dispatch({
            type: 'SIGNIN_SUCCESS',
          })
        })
        .catch(err => {
          dispatch({ type: 'SIGNIN_ERROR', err })
        })
      break
    default:
      break
  }
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
