import axios from 'axios'

export const getBalanceAccounts = payload => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `/balance/accounts`,
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_ACCOUNTBALANCE_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_ACCOUNTBALANCE_ERROR',
        payload: err,
      })
    })
}

export const getBalanceTotal = payload => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `/balance/total`,
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_TOTALBALANCE_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_TOTALBALANCE_ERROR',
        payload: err,
      })
    })
}
