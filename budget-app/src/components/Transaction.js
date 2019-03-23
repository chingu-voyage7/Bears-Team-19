import { format } from 'date-fns'
import React from 'react'
import Currency from 'react-currency-formatter'
import NavActions from './NavActions'

const Transaction = ({
  location: {
    state: { transaction, userCurrency },
    handleDelete,
  },
  history,
}) => {
  const {
    transId,
    date,
    amount,
    category,
    budgetName,
    accountName,
  } = transaction

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
          <h5>
            <Currency quantity={amount ? amount : 0} currency={userCurrency} />
          </h5>
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
