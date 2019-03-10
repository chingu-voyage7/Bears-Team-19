import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'

// TODO: Only show date, amount, category and type on transactions.
// Todo: Click to get more details. Works on mobile and desktop
const TransactionItem = ({ transaction, handleDelete }) => {
  const { transId, date, amount, type, category } = transaction

  const amountWithType = (amount, type) => {
    if (type === 'income') {
      return amount.toFixed(2)
    }
    return `-${amount.toFixed(2)}`
  }
  return (
    <div className="pad">
      <Link
        to={{
          pathname: `/transaction/${transId}`,
          state: { transaction },
          handleDelete,
        }}
      >
        <div className="columns is-mobile">
          <div className="column">
            <p>
              <span className="date">{format(date, 'DD MMM')}</span>
            </p>
          </div>
          <div className="column has-text-right">
            <h5>{amountWithType(amount, type)}</h5>
          </div>
          <div className="column has-text-right">
            <p className="category">{category}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TransactionItem
