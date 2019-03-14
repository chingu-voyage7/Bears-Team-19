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

export const updateUser = payload => (dispatch, getState) => {
  axios({
    method: 'patch',
    url: `/users/`,
    headers: {
      uid: payload.uid,
    },
    data: payload.data,
  })
    .then(res => {
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'UPDATE_USER_ERROR',
        payload: err,
      })
    })
}
