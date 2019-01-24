export const createBudget = payload => ({
  type: 'CREATE_BUDGET_SUCCESS',
  payload,
})

export const addExpense = payload => (dispatch, getState) => {
  // connect to backend and make call with axios
  // payload will have the results from the form
  console.log(payload)
  dispatch({
    type: 'ADD_EXPENSE_SUCCESS',
  })
  // let hmm
  // hmm
  //   .then(() => {
  //     dispatch({
  //       type: 'ADD_EXPENSE_SUCCESS',
  //       payload,
  //     })
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: 'ADD_EXPENSE_ERROR',
  //       err,
  //     })
  //   })
}
