export const updateTransaction = payload => (dispatch, getState) => {
  // connect to backend and make call with axios
  // payload will have the results from the form
  dispatch({
    type: 'UPDATE_TRANSACTION_SUCCESS',
    payload,
  })
}
export const addTransaction = payload => (dispatch, getState) => {
  // connect to backend and make call with axios
  // payload will have the results from the form
  dispatch({
    type: 'ADD_TRANSACTION_SUCCESS',
  })
}

export const getTransactions = payload => (dispatch, getState) => {
  dispatch({
    type: 'GET_TRANSACTIONS',
    payload,
  })
}
