import axios from 'axios'

export const addBudget = payload => (dispatch, getState) => {
  axios({
    method: 'post',
    url: `/budgets`,
    headers: {
      uid: payload.uid,
    },
    data: { budgetName: payload.budgetName },
  })
    .then(res => {
      dispatch({
        type: 'ADD_BUDGET_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'ADD_BUDGET_ERROR',
        payload: err,
      })
    })
}

export const getBudgets = payload => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `/budgets`,
    headers: {
      uid: payload,
    },
  })
    .then(res => {
      dispatch({
        type: 'GET_BUDGETS_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_BUDGETS_ERROR',
        payload: err,
      })
    })
}

export const editBudget = payload => (dispatch, getState) => {
  axios({
    method: 'patch',
    url: `/budgets`,
    headers: {
      uid: payload.uid,
    },
    data: payload,
  })
    .then(res => {
      dispatch({
        type: 'UPDATE_BUDGET_SUCCESS',
        payload: res,
      })
    })
    .catch(err => {
      dispatch({
        type: 'UPDATE_BUDGET_ERROR',
        payload: err,
      })
    })
}
