import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

const Account = props => {
  return (
    <li>
      <div>
        <p>Name: {props.account.account_name}</p>
        <p>Balance: {props.account.balance}</p>
      </div>
      <div>
        <Link
          to={{
            pathname: `/account/edit`,
            state: {
              accountId: props.account.account_id,
              accountName: props.account.account_name,
              balance: props.account.balance,
            },
          }}
        >
          <Icon name="edit" color="#6179C7" />
        </Link>
      </div>
      <div
        className="delete-account"
        onClick={() => props.handleDelete(props.account.account_id)}
      >
        <Icon name="delete" color="#E94B25" />
      </div>
    </li>
  )
}

export default Account
