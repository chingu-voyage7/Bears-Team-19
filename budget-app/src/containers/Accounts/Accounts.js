import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountList from '../../components/AccountList'
import { getTransactions } from '../../store/actions/transactionActions'
import { getUser } from '../../store/actions/userActions'

class Accounts extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.auth.uid)
    this.props.getUser(this.props.auth.uid)
  }

  render() {
    const {
      auth: { uid },
      transactions,
      user: { currency },
    } = this.props
    return (
      <div>
        {transactions && currency && uid && (
          <AccountList
            uid={uid}
            transactions={transactions}
            userCurrency={currency}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    transactions: state.transaction.transactions,
    user: state.user,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTransactions: uid => dispatch(getTransactions(uid)),
    getUser: uid => dispatch(getUser(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts)
