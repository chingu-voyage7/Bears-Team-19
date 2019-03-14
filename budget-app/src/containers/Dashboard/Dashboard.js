import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AccountList from '../../components/AccountList'
import Balance from '../../components/Balance'
import BudgetList from '../../components/BudgetList'
import Icon from '../../components/Icons'
import SetCurrency from '../../components/SetCurrency'
import TransactionList from '../../components/TransactionList'
import { getTransactions } from '../../store/actions/transactionActions'
import { getUser } from '../../store/actions/userActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.auth.uid)
    this.props.getUser(this.props.auth.uid)
  }

  render() {
    const {
      auth,
      transactions,
      user: { balance: totalBalance },
    } = this.props

    if (!transactions) {
      return (
        <section className="dashboard">
          <h3>Dashboard</h3>
          <Balance balance={totalBalance} />
          <p>You have no transactions yet.</p>
          <Link to="/transaction/create">
            <Icon name="add" color="#23D160" />
            New transaction
          </Link>
        </section>
      )
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />
    }
    return (
      <section className="dashboard">
        <h2>Dashboard</h2>
        <Balance balance={totalBalance} />
        <SetCurrency />
        <BudgetList uid={this.props.auth.uid} transactions={transactions} />
        <AccountList uid={this.props.auth.uid} transactions={transactions} />
        <TransactionList uid={this.props.auth.uid} />
      </section>
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
)(Dashboard)
