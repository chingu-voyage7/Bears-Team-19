import { format } from 'date-fns'
import React from 'react'
import NavActions from './NavActions'

const Transaction = ({
  location: {
    state: { transaction },
    handleDelete,
  },
  history,
}) => {
  const {
    transId,
    date,
    amount,
    type,
    category,
    budgetName,
    accountName,
  } = transaction

  const amountWithType = (amount, type) => {
    if (type === 'income') {
      return amount.toFixed(2)
    }
    return `-${amount.toFixed(2)}`
  }
  return (
    <section className="section">
      <div className="columns is-mobile">
        <div className="column">
          <p>
            <span className="date">{format(date, 'DD MMM')}</span> <br />
          </p>
          <p className="account">Account: {accountName}</p>
          <p className="budget">Budget: {budgetName}</p>
        </div>
        <div className="column has-text-right">
          <h5>{amountWithType(amount, type)}</h5>
          <p className="category">{category}</p>
        </div>
      </div>
      <NavActions
        id={transId}
        itemLink="transaction"
        item={transaction}
        history={history}
        handleDelete={handleDelete}
      />
    </section>
  )
}

export default Transaction
