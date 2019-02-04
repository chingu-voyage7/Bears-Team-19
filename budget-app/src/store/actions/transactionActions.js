import axios from 'axios'

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
  console.log(payload)
  const {
    account,
    amount,
    category,
    selectedOption: type,
    selectedDay: date,
    uid,
  } = payload

  const newTransaction = {
    account,
    amount,
    category,
    type,
    date,
    uid,
  }
  axios
    .post('/transactions', newTransaction)
    .then(res => {
      dispatch({
        type: 'ADD_TRANSACTION_SUCCESS',
        res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'ADD_TRANSACTION_ERROR',
        err,
      })
    })
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
