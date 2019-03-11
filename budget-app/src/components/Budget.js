import React from 'react'
import { inUse } from '../helpers/helpers'
import NavActions from './NavActions'

const Budget = ({ budget, handleDelete, transactions }) => {
  const { budget_name: budgetName, budget_id: budgetId } = budget
  const isUsed = inUse(budgetId, transactions, 'budgetId')
  return (
    <div className="pad">
      <h6>{budgetName}</h6>
      <NavActions
        id={budgetId}
        itemLink="budget"
        item={budget}
        handleDelete={handleDelete}
        inUse={isUsed}
      />
    </div>
  )
}

export default Budget
