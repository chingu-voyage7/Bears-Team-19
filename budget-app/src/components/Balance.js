import React from 'react'
import Currency from 'react-currency-formatter'

const Balance = ({ balance, userCurrency }) => {
  return (
    <section className="section">
      <div className="info">
        <h4>Total balance</h4>
        <Currency
          quantity={balance ? Number(balance) : 0}
          currency={userCurrency}
        />
      </div>
    </section>
  )
}

export default Balance
