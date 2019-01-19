export const createUser = payload => (dispatch, getState, { getFirebase }) => {
  // make async call
  dispatch({
    type: 'CREATE_USER',
    payload,
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
