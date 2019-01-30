const initialState = {
  transaction: [
    {
      id: 1,
      amount: 12.45,
      account: 'Spending',
      type: 'expense',
      category: 'Food',
      date: '2019-01-27',
      authorid: 'ovCsEFb1IfWBpeB2YZWYHeCYrwM2',
    },
    {
      id: 2,
      amount: 14.45,
      account: 'Spending',
      type: 'expense',
      category: 'Food',
      date: '2019-01-29',
      authorid: 'ovCsEFb1IfWBpeB2YZWYHeCYrwM2',
    },
  ],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_TRANSACTION_SUCCESS':
      return { ...state, ...payload }
    case 'UPDATE_TRANSACTION_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
