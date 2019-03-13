import axios from 'axios'
import { getAccounts } from './accountActions'
import { getUser } from './userActions'

export const updateTransaction = payload => (dispatch, getState) => {
  // Make call to API here
  const updateDetails = {
    transId: payload.transId,
    accountId: payload.accountId,
    amount: payload.amount,
    date: payload.dateselect,
    category: payload.category,
    type: payload.type,
    budgetId: payload.budgetId,
  }
  axios({
    method: 'patch',
    url: `/transactions/`,
    headers: {
      uid: payload.uid,
    },
    data: updateDetails,
  })
    .then(res => {
      dispatch(getTransactions(payload.uid))
      dispatch(getAccounts(payload.uid))
      dispatch(getUser(payload.uid))
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
    accountId,
    budgetId,
    amount,
    category,
    type,
    dateselect: date,
    uid,
  } = payload

  const newTransaction = {
    accountId,
    amount,
    category,
    type,
    date,
    uid,
    budgetId,
  }
  axios({
    method: 'post',
    url: `/transactions`,
    headers: {
      uid: payload.uid,
    },
    data: newTransaction,
  })
    .then(res => {
      dispatch(getTransactions(uid))
      dispatch(getAccounts(uid))
      dispatch(getUser(uid))
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
    url: `/transactions`,
    headers: {
      uid: payload.uid,
    },
    data: payload,
  })
    .then(res => {
      dispatch(getAccounts(payload.uid))
      dispatch(getUser(payload.uid))
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
