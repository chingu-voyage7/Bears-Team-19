import axios from 'axios'

export const getBalanceLogs = payload => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `/balancelogs`,
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_BALANCE_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_BALANCE_ERROR',
        payload: err,
      })
    })
}
