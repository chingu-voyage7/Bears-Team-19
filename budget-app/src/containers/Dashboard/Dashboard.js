import { format } from 'date-fns'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import AccountList from '../../components/AccountList'
import BudgetList from '../../components/BudgetList'
import Icon from '../../components/Icons'
import {
  deleteTransaction,
  getTransactions,
} from '../../store/actions/transactionActions'
import './Dashboard.css'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.auth.uid)
  }
  handleDelete = id => {
    // call delete action here with the id
    this.props.deleteTransaction({ transId: id, uid: this.props.auth.uid })
  }
  render() {
    const { auth, transactions } = this.props
    if (!transactions) {
      return (
        <section className="dashboard">
          <h3>Dashboard</h3>
          <p>You have no transactions yet.</p>
          <Link to="/transaction/create" className="add">
            <Icon name="add" color="#23D160" /> <p>New transaction</p>
          </Link>
        </section>
      )
    }
    const rows = transactions.map(transaction => {
      const {
        transId,
        date,
        amount,
        type,
        category,
        accountId,
        budgetId,
        budgetName,
        accountName,
      } = transaction
      return (
        <tr key={transId}>
          <td>{format(date, 'YYYY-MM-DD')}</td>
          <td>{type}</td>
          <td>{amount}</td>
          <td>{category}</td>
          <td>{accountName}</td>
          <td>{budgetName}</td>
          <td>
            <Link
              to={{
                pathname: `/transaction/edit`,
                state: {
                  transId,
                  date,
                  type,
                  amount,
                  category,
                  accountId,
                  budgetId,
                },
              }}
            >
              <Icon name="edit" color="#6179C7" />
            </Link>
          </td>
          <td>
            <div
              className="delete-transaction"
              onClick={() => this.handleDelete(transId)}
            >
              <Icon name="delete" color="#E94B25" />
            </div>
          </td>
        </tr>
      )
    })
    if (!auth.uid) {
      return <Redirect to="/signin" />
    }
    return (
      <section className="dashboard">
        <h3>Dashboard</h3>
        <BudgetList uid={this.props.auth.uid} />
        <Link to="/budget/create">Add new budget</Link>
        <AccountList uid={this.props.auth.uid} />
        <Link to="/account/create">Add new account</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>
                <abbr title="Amount">Amt</abbr>
              </th>
              <th>
                <abbr title="Category">Cat</abbr>
              </th>
              <th>
                <abbr title="Account">Account</abbr>
              </th>
              <th>
                <abbr title="Budget">Budget</abbr>
              </th>
              <th>Edit</th>
              <th>
                <abbr title="Delete">Del</abbr>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>
                <abbr title="Amount">Amt</abbr>
              </th>
              <th>
                <abbr title="Category">Cat</abbr>
              </th>
              <th>
                <abbr title="Account">Account</abbr>
              </th>
              <th>
                <abbr title="Budget">Budget</abbr>
              </th>
              <th>Edit</th>
              <th>
                <abbr title="Delete">Del</abbr>
              </th>
            </tr>
          </tfoot>
          <tbody>{rows}</tbody>
        </table>

        <Link to="/transaction/create" className="add">
          <Icon name="add" color="#23D160" /> <p>New transaction</p>
        </Link>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    transactions: state.transaction.transactions,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteTransaction: transactionId =>
      dispatch(deleteTransaction(transactionId)),
    getTransactions: uid => dispatch(getTransactions(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
