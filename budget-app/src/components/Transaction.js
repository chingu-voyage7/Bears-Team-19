import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

const Transaction = ({ transaction, handleDelete }) => {
  const {
    transId,
    date,
    amount,
    type,
    category,
    accountId,
    budgetId,
    budgetName,
    accountName,
  } = transaction

  const upperCaseFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <div className="pad">
      <div className="columns is-mobile">
        <div className="column">
          <h5>{amount.toFixed(2)}</h5>
          <p>{format(date, 'YYYY-MM-DD')}</p>
          <p>{category}</p>
        </div>
        <div className="column has-text-right">
          <p>{upperCaseFirst(type)}</p>
          <p>{accountName} account</p>
          <p>{budgetName} budget</p>
        </div>
      </div>
      <div className="actions">
        <div>
          <Link
            to={{
              pathname: `/transaction/edit`,
              state: {
                transId,
                date,
                type,
                amount,
                category,
                accountId,
                budgetId,
              },
            }}
          >
            <Icon name="edit" color="#6179C7" />
          </Link>
        </div>
        <div className="delete-item" onClick={() => handleDelete(transId)}>
          <Icon name="delete" color="#E94B25" />
        </div>
      </div>
    </div>
  )
}

export default Transaction
