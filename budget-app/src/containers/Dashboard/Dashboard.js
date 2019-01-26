import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Icon from '../../components/Icons'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    const { auth } = this.props

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
          <tbody>
            <tr>
              <td>2019-01-12</td>
              <td>Expense</td>
              <td>14.23</td>
              <td>Groceries</td>
              <td>Spending account</td>
              <td>
                <Icon name="edit" color="#6179C7" />
              </td>
              <td>
                <Icon name="delete" color="#E94B25" />
              </td>
            </tr>
            <tr>
              <td>2019-01-12</td>
              <td>Income</td>
              <td>14.23</td>
              <td>Groceries</td>
              <td>Spending account</td>
              <td>
                <Icon name="edit" color="#6179C7" />
              </td>
              <td>
                <Icon name="delete" color="#E94B25" />
              </td>
            </tr>
            <tr>
              <td>2019-01-12</td>
              <td>Expense</td>
              <td>14.23</td>
              <td>Groceries</td>
              <td>Spending account</td>
              <td>
                <Icon name="edit" color="#6179C7" />
              </td>
              <td>
                <Icon name="delete" color="#E94B25" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
})

export default connect(mapStateToProps)(Dashboard)
