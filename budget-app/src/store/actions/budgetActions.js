import axios from 'axios'

export const addBudget = payload => (dispatch, getState) => {
  console.log(payload)
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
