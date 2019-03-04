import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccounts } from '../store/actions/accountActions'
import Account from './Account'

class AccountList extends Component {
  componentDidMount() {
    this.props.getAccounts(this.props.uid)
  }
  render() {
    const accounts = this.props.accounts
      ? this.props.accounts.map(account => (
          <Account account={account} key={account.account_id} />
        ))
      : ''
    return <ul>{accounts}</ul>
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.account.accounts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccounts: uid => dispatch(getAccounts(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountList)
