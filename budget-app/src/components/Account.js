import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

const Account = props => {
  return (
    <div className="conatiner">
      <div className="budget-info">
        <h6>{props.account.account_name}</h6>
        <p>{props.account.balance}</p>
      </div>
      <div className="actions">
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
          className="delete-item"
          onClick={() => props.handleDelete(props.account.account_id)}
        >
          <Icon name="delete" color="#E94B25" />
        </div>
      </div>
    </div>
  )
}

export default Account
