export const updateTransaction = payload => (dispatch, getState) => {
  // connect to backend and make call with axios
  // payload will have the results from the form
  console.log(payload)
  dispatch({
    type: 'UPDATE_TRANSACTION_SUCCESS',
  })
  // let hmm
  // hmm
  //   .then(() => {
  //     dispatch({
  //       type: 'UPDATE_TRANSACTION_SUCCESS',
  //       payload,
  //     })
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: 'UPDATE_TRANSACTION_ERROR',
  //       err,
  //     })
  //   })
}
