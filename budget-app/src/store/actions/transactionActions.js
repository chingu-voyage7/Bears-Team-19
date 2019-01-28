export const getTransactions = payload => (dispatch, getState) => {
  dispatch({
    type: 'GET_TRANSACTIONS',
    payload,
  })
}
