import axios from 'axios'

export const addAccount = payload => (dispatch, getState) => {
  axios({
    method: 'post',
    url: `/accounts`,
    headers: {
      uid: payload.uid,
    },
    data: { account: payload.accountName, balance: payload.balance },
  })
    .then(res => {
      dispatch({
        type: 'ADD_ACCOUNT_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'ADD_ACCOUNT_ERROR',
        payload: err,
      })
    })
}

export const getAccounts = payload => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `/accounts`,
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_ACCOUNTS_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_ACCOUNTS_ERROR',
        payload: err,
      })
    })
}

export const editAccount = payload => (dispatch, getState) => {
  axios({
    method: 'patch',
    url: `/accounts`,
    headers: {
      uid: payload.uid,
    },
    data: payload,
  })
    .then(res => {
      dispatch({
        type: 'UPDATE_ACCOUNT_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'UPDATE_ACCOUNT_ERROR',
        payload: err,
      })
    })
}

export const deleteAccount = payload => (dispatch, getState) => {
  axios({
    method: 'delete',
    url: `/accounts`,
    headers: {
      uid: payload.uid,
    },
    data: payload,
  })
    .then(res => {
      dispatch(getAccounts(payload.uid))
      dispatch({
        type: 'DELETE_ACCOUNT_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'DELETE_ACCOUNT_ERROR',
        payload: err,
      })
    })
}
