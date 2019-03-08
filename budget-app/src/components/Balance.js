import React from 'react'

const Balance = ({ balance }) => {
  return (
    <section className="section">
      <div className="container">
        <h4>Total balance</h4>
        <p>{balance}</p>
      </div>
    </section>
  )
}

export default Balance
