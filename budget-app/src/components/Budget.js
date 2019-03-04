import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

const Budget = props => {
  return (
    <li>
      {props.budget.budget_name}{' '}
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
    </li>
  )
}

export default Budget
