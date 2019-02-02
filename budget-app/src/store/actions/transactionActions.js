export const updateTransaction = payload => (dispatch, getState) => {
  // Make call to API here
  dispatch({
    type: 'UPDATE_TRANSACTION_SUCCESS',
    payload,
  })
  // dispatch({
  //   type: 'UPDATE_TRANSACTION_ERROR',
  //   payload,
  // })
}
export const addTransaction = payload => (dispatch, getState) => {
  // Make call to API here
  dispatch({
    type: 'ADD_TRANSACTION_SUCCESS',
  })
  // dispatch({
  //   type: 'ADD_TRANSACTION_ERROR',
  // })
}

export const getTransactions = payload => (dispatch, getState) => {
  // Make call to API here
  dispatch({
    type: 'GET_TRANSACTIONS_SUCCESS',
    payload,
  })
  // dispatch({
  //   type: 'GET_TRANSACTIONS_ERROR',
  //   payload,
  // })
}

export const deleteTransaction = payload => (dispatch, getState) => {
  // Make call to API here
  dispatch({
    type: 'DELETE_TRANSACTION_SUCCESS',
    payload,
  })
  // dispatch({
  //   type: 'DELETE_TRANSACTIONS_ERROR',
  //   payload,
  // })
}
