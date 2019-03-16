import React from 'react'
import Currency from 'react-currency-formatter'

const Balance = ({ balance, userCurrency }) => {
  return (
    <div className="column">
      <div className="info has-text-right-tablet">
        <h4>Total balance</h4>
        <Currency
          quantity={balance ? Number(balance) : 0}
          currency={userCurrency}
        />
      </div>
    </div>
  )
}

export default Balance
