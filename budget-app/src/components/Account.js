import React from 'react'
import { inUse } from '../helpers/helpers'
import NavActions from './NavActions'

const Account = ({ account, handleDelete, transactions }) => {
  const { account_id: accountId, account_name: accountName, balance } = account
  const isUsed = inUse(accountId, transactions, 'accountId')
  return (
    <div className="pad">
      <div className="columns is-mobile">
        <div className="column">
          <h6>{accountName}</h6>
        </div>
        <div className="column has-text-right">
          <p>{balance}</p>
        </div>
      </div>
      <NavActions
        id={accountId}
        item={account}
        handleDelete={handleDelete}
        itemLink="account"
        inUse={isUsed}
      />
    </div>
  )
}

export default Account
