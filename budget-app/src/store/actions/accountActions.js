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
