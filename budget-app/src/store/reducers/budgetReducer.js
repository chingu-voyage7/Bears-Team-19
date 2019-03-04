const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_BUDGET_SUCCESS':
      return { ...state, ...payload }
    case 'ADD_BUDGET_ERROR':
      return { ...state, ...payload }

    case 'GET_BUDGETS_SUCCESS':
      return { ...state, ...payload.data }
    case 'GET_BUDGETS_ERROR':
      return { ...state, ...payload }

    case 'UPDATE_BUDGET_SUCCESS':
      return { ...state, ...payload }
    case 'UPDATE_BUDGET_ERROR':
      return { ...state, ...payload }

    case 'DELETE_BUDGET_SUCCESS':
      const filteredBudgets = state.budgets.filter(
        budget => budget.budget_id !== parseInt(payload.data.budgetId),
      )
      return { ...state, budgets: filteredBudgets }
    case 'DELETE_BUDGET_ERROR':
      return { ...state, ...payload }
    default:
      return state
  }
}
