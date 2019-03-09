import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  deleteTransaction,
  getTransactions,
} from '../store/actions/transactionActions'
import Icon from './Icons'
import Transaction from './Transaction'

class TransactionList extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.uid)
  }

  handleDelete = id => {
    this.props.deleteTransaction({ transId: id, uid: this.props.uid })
  }

  render() {
    const transactions = this.props.transactions
      ? this.props.transactions.map(transaction => (
          <Transaction
            transaction={transaction}
            key={transaction.transId}
            handleDelete={this.handleDelete}
          />
        ))
      : null
    return (
      <section className="section">
        <h4>Transactions</h4>
        {transactions}
        <Link to="/transaction/create">
          <Icon name="add" color="#23D160" />
          New transaction
        </Link>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transaction.transactions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: uid => dispatch(getTransactions(uid)),
    deleteTransaction: data => dispatch(deleteTransaction(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionList)
