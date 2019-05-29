import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteAccount, getAccounts } from '../store/actions/accountActions'
import { getTransactions } from '../store/actions/transactionActions'
import { getUser } from '../store/actions/userActions'
import Account from './Account'

class AccountList extends Component {
  async componentDidMount() {
    await this.props.getAccounts(this.props.uid)
    await this.props.getTransactions(this.props.uid)
    await this.props.getUser(this.props.uid)
  }

  handleDelete = id => {
    this.props.deleteAccount({ accountId: id, uid: this.props.uid })
  }
  render() {
    const accounts =
      this.props.accounts && this.props.transactions && this.props.user
        ? this.props.accounts.map(account => (
            <Account
              account={account}
              key={account.account_id}
              handleDelete={this.handleDelete}
              transactions={this.props.transactions}
              userCurrency={this.props.user.currency}
            />
          ))
        : ''
    return (
      <section className="section small-width">
        <h4>Accounts</h4>
        {accounts}
        <Link to="/account/create">Add new account</Link>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.account.accountsWithBalance,
    transactions: state.transaction.transactions,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccounts: uid => dispatch(getAccounts(uid)),
    deleteAccount: data => dispatch(deleteAccount(data)),
    getTransactions: uid => dispatch(getTransactions(uid)),
    getUser: uid => dispatch(getUser(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountList)
