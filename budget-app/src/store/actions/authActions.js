export const createUser = payload => (dispatch, getState, { getFirebase }) => {
  // make async call
  dispatch({
    type: 'CREATE_USER',
    payload,
  })
}
