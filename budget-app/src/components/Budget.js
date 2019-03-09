import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

const Budget = ({ budget: { budget_name, budget_id }, handleDelete }) => {
  return (
    <div className="pad">
      <h6>{budget_name}</h6>
      <div className="actions">
        <div>
          <Link
            to={{
              pathname: `/budget/edit`,
              state: {
                budgetId: budget_id,
                budgetName: budget_name,
              },
            }}
          >
            <Icon name="edit" color="#6179C7" />
          </Link>
        </div>
        <div className="delete-item" onClick={() => handleDelete(budget_id)}>
          <Icon name="delete" color="#E94B25" />
        </div>
      </div>
    </div>
  )
}

export default Budget
