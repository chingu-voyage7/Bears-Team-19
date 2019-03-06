import axios from 'axios'

export const getUser = payload => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `/users/user`,
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_USER_ERROR',
        payload: err,
      })
    })
}
