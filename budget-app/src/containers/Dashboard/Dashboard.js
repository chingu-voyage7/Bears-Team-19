import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Icon from '../../components/Icons'
import { deleteTransaction } from '../../store/actions/transactionActions'
import './Dashboard.css'

class Dashboard extends Component {
  async componentDidMount() {
    try {
      const response = await axios.get(`/users`)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  handleDelete = id => {
    // call delete action here with the id
    this.props.deleteTransaction(id)
    // console.log(id, 'id')
  }
  render() {
    const { auth, transactions } = this.props
    const rows = transactions.map(transaction => {
      const { id, date, amount, type, category, account } = transaction
      return (
        <tr key={id}>
          <td>{date}</td>
          <td>{type}</td>
          <td>{amount}</td>
          <td>{category}</td>
          <td>{account}</td>
          <td>
            <Link to={`/transaction/${id}`}>
              <Icon name="edit" color="#6179C7" />
            </Link>
          </td>
          <td>
            <div
              className="delete-transaction"
              onClick={() => this.handleDelete(id)}
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
  const transactions = state.transaction.transactions.filter(
    transaction => transaction.authorid === state.firebase.auth.uid,
  )
  return {
    auth: state.firebase.auth,
    transactions,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteTransaction: transactionId =>
      dispatch(deleteTransaction(transactionId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
