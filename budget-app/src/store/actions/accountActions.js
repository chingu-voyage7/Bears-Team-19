export const addAccount = payload => (dispatch, getState) => {
  dispatch({
    type: 'ADD_ACCOUNT_SUCCESS',
    payload,
  })
  // dispatch({
  //   type: 'ADD_ACCOUNT_ERROR',
  //   payload
  // })
}
