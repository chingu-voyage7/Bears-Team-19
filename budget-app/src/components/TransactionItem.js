import { format } from 'date-fns'
import React from 'react'
import Currency from 'react-currency-formatter'
import { Link } from 'react-router-dom'

// TODO: Only show date, amount, category and type on transactions.
// Todo: Click to get more details. Works on mobile and desktop
const TransactionItem = ({ transaction, handleDelete, userCurrency }) => {
  const { transId, date, amount, category } = transaction
  return (
    <div className="pad">
      <Link
        to={{
          pathname: `/transaction/${transId}`,
          state: { transaction, userCurrency },
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
            <h5>
              <Currency
                quantity={amount ? amount : 0}
                currency={userCurrency}
              />
            </h5>
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
