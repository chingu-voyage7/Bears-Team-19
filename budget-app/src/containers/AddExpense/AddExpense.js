import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import 'react-day-picker/lib/style.css'
import './AddExpense.css'
import { addExpense } from '../../store/actions/budgetActions'

export class AddExpense extends Component {
  state = {
    amount: '',
    category: '',
    account: '',
    selectedDay: undefined,
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleDayClick = (day, { selected }) => {
    if (selected) {
      this.setState({ selectedDay: undefined })
      return
    }
    this.setState({
      selectedDay: day,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // check so all are selected
    if (
      this.state.selectedDay === undefined &&
      this.state.amount &&
      this.state.category
    ) {
      console.log('Fill in the required fields')
    }
    console.log(this.state)
    this.props.addExpense(this.state)
  }

  render() {
    const { auth } = this.props

    if (!auth.uid) {
      return <Redirect to="/signin" />
    }
    return (
      <section className="add-expense">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Add expense</h3>
            <div className="field">
              <label htmlFor="amount" className="label">
                Amount
              </label>
              <div className="control has-icon-left has-icons-right">
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  placeholder="ex 10.03"
                  required
                  id="amount"
                  value={this.state.amount}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="category" className="label">
                Category
              </label>
              <div className="control has-icon-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Category"
                  required
                  id="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="account" className="label">
                Account
              </label>
              <div className="control has-icon-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Account"
                  id="account"
                  value={this.state.account}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <DayPicker
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDay}
              />
            </div>
            <div className="control">
              <button className="button is-success">Add expense</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
})

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExpense)
