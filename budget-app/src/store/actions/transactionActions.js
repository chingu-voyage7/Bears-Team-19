import axios from 'axios'

export const updateTransaction = payload => (dispatch, getState) => {
  // Make call to API here
  const updateDetails = {
    account: payload.account,
    amount: payload.amount,
    date: payload.date,
    category: payload.category,
    type: payload.type,
  }
  axios({
    method: 'post',
    url: `/transactions/${payload.id}`,
    headers: {
      uid: payload.uid,
    },
    data: updateDetails,
  })
    .then(res => {
      dispatch(getTransactions(payload.uid))
      dispatch({
        type: 'UPDATE_TRANSACTION_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'UPDATE_TRANSACTION_ERROR',
        payload: err,
      })
    })
}
export const addTransaction = payload => (dispatch, getState) => {
  // Make call to API here
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
      dispatch(getTransactions(uid))
      dispatch({
        type: 'ADD_TRANSACTION_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'ADD_TRANSACTION_ERROR',
        payload: err,
      })
    })
}

export const getTransactions = payload => (dispatch, getState) => {
  // Make call to API here
  axios({
    method: 'get',
    url: '/transactions',
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_TRANSACTIONS_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_TRANSACTIONS_ERROR',
        payload: err,
      })
    })
}

export const deleteTransaction = payload => (dispatch, getState) => {
  // Make call to API here
  axios({
    method: 'delete',
    url: `/transactions/${payload.id}`,
    headers: {
      uid: payload.uid,
    },
  })
    .then(res => {
      dispatch({
        type: 'DELETE_TRANSACTION_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'DELETE_TRANSACTIONS_ERROR',
        payload: err,
      })
    })
}
