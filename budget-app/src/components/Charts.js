import React from 'react'
import ExpensePieChart from './ExpensePieChart'
import SpendingLineChart from './SpendingLineChart'

export default function Charts(props) {
  const { balanceAccounts, balanceTotal, transactions } = props
  return (
    <div>
      <SpendingLineChart
        balanceAccounts={balanceAccounts}
        balanceTotal={balanceTotal}
      />
      <ExpensePieChart transactions={transactions} />
    </div>
  )
}
