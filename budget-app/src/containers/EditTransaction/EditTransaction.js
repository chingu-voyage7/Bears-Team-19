import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateTransaction } from '../../store/actions/transactionActions'
import './EditTransaction.css'

class EditTransaction extends Component {
  state = {
    amount: this.props.transaction[0] ? this.props.transaction[0].amount : '',
    category: this.props.transaction[0]
      ? this.props.transaction[0].category
      : '',
    account: this.props.transaction[0] ? this.props.transaction[0].account : '',
    selectedOption: this.props.transaction[0]
      ? this.props.transaction[0].selectedOption
      : '',
    selectedDay: this.props.transaction[0]
      ? this.props.transaction[0].selectedDay
      : undefined,
    toDashboard: false,
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value,
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
    this.props.addTransaction(this.state)
    this.setState({
      toDashboard: true,
    })
  }
  render() {
    const { auth } = this.props

    if (!auth.uid) {
      return <Redirect to="/signin" />
    }
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />
    }

    return (
      <section className="add-transaction">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Add transaction</h3>
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
              <label htmlFor="income" className="radio">
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  onChange={this.handleOptionChange}
                  required
                />
                <span>Income</span>
              </label>
              <label htmlFor="expense" className="radio">
                <input
                  type="radio"
                  id="expense"
                  name="type"
                  value="expense"
                  onChange={this.handleOptionChange}
                  required
                />
                <span>Expense</span>
              </label>
            </div>
            <div className="field">
              <DayPicker
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDay}
              />
            </div>
            <div className="control">
              <button className="button is-success">Add transaction</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: { id },
    },
  } = props
  const transaction = state.transaction.transaction.filter(
    transaction => transaction.id == id,
  )
  return {
    auth: state.firebase.auth,
    transaction,
  }
}

const mapDispatchToProps = dispatch => ({
  updateTransaction: transaction => dispatch(updateTransaction(transaction)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTransaction)
