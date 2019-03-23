import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AccountList from '../../components/AccountList'
import Balance from '../../components/Balance'
import BudgetList from '../../components/BudgetList'
import Charts from '../../components/Charts'
import Icon from '../../components/Icons'
import SetCurrency from '../../components/SetCurrency'
import TransactionList from '../../components/TransactionList'
import { getBalanceLogs } from '../../store/actions/balanceActions'
import { getTransactions } from '../../store/actions/transactionActions'
import { getUser } from '../../store/actions/userActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.auth.uid)
    this.props.getUser(this.props.auth.uid)
    this.props.getBalanceLogs(this.props.auth.uid)
  }

  render() {
    const {
      auth,
      transactions,
      user: { balance: totalBalance },
      balancelogs,
    } = this.props

    if (!auth.uid) {
      return <Redirect to="/signin" />
    }
    return (
      <section className="dashboard">
        <h2>Dashboard</h2>
        <section className="section">
          <div className="columns">
            <SetCurrency
              userCurrency={this.props.user.currency}
              uid={this.props.auth.uid}
            />
            <Balance
              balance={totalBalance}
              userCurrency={this.props.user.currency}
            />
          </div>
        </section>

        {balancelogs && <Charts balancelogs={balancelogs} />}
        {transactions && (
          <BudgetList uid={this.props.auth.uid} transactions={transactions} />
        )}
        {transactions && (
          <AccountList
            uid={this.props.auth.uid}
            transactions={transactions}
            userCurrency={this.props.user.currency}
          />
        )}
        {transactions ? (
          <TransactionList
            uid={this.props.auth.uid}
            userCurrency={this.props.user.currency}
          />
        ) : (
          <section className="section">
            <p>You have no transactions yet.</p>
            <Link to="/transaction/create">
              <Icon name="add" color="#23D160" />
              New transaction
            </Link>
          </section>
        )}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    transactions: state.transaction.transactions,
    user: state.user,
    balancelogs: state.balancelog.logs,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getTransactions: uid => dispatch(getTransactions(uid)),
    getUser: uid => dispatch(getUser(uid)),
    getBalanceLogs: uid => dispatch(getBalanceLogs(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
