import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

const Budget = props => {
  return (
    <li>
      <div>{props.budget.budget_name}</div>
      <div>
        <Link
          to={{
            pathname: `/budget/edit`,
            state: {
              budgetId: props.budget.budget_id,
              budgetName: props.budget.budget_name,
            },
          }}
        >
          <Icon name="edit" color="#6179C7" />
        </Link>
      </div>
      <div
        className="delete-budget"
        onClick={() => props.handleDelete(props.budget.budget_id)}
      >
        <Icon name="delete" color="#E94B25" />
      </div>
    </li>
  )
}

export default Budget
