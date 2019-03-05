import { addDays, format } from 'date-fns'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { addAccount, getAccounts } from '../../store/actions/accountActions'
import { addBudget, getBudgets } from '../../store/actions/budgetActions'
import { addTransaction } from '../../store/actions/transactionActions'
import './AddTransaction.css'

const schema = yup.object().shape({
  amount: yup
    .number('Value must be a number.')
    .min(0.01, 'Number has to be higher than 0.')
    .required('Required'),
  accountId: yup.number().required('Required'),
  budgetId: yup.number().required('Required'),
  category: yup
    .string()
    .trim('No whitespace!')
    .required('Required'),
  type: yup.string().required('Required'),
  dateselect: yup
    .date()
    .max(addDays(new Date(), 1), 'Can not input future dates.')
    .required('Required'),
})
class AddTransaction extends Component {
  state = {
    toDashboard: false,
  }
  componentDidMount() {
    this.props.getAccounts(this.props.auth.uid)
    this.props.getBudgets(this.props.auth.uid)
  }
  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />
    }
    return (
      <section className="add-transaction">
        <div className="container">
          <Formik
            initialValues={{
              amount: 0,
              category: '',
              accountId: undefined,
              type: '',
              budgetId: undefined,
              dateselect: format(new Date()),
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const newTransaction = {
                  ...values,
                  uid: this.props.auth.uid,
                }
                this.props.addTransaction(newTransaction)
                setSubmitting(false)
                this.setState({
                  toDashboard: true,
                })
              }, 400)
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form>
                <h3>Add transaction</h3>
                <div className="field">
                  <label htmlFor="amount" className="label">
                    Amount
                    <div className="control">
                      <Field
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Ex. 12.99"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <label htmlFor="category" className="label">
                    Category
                    <div className="control">
                      <Field
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Ex. Groceries"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <Link to="/account/create">Add new account</Link>
                  <label htmlFor="accountId" className="label">
                    Account
                    <div className="control">
                      <Field
                        defaultValue="Choose account"
                        name="accountId"
                        id="accountId"
                        component="select"
                        placeholder="Account"
                      >
                        <option disabled hidden>
                          Choose account
                        </option>
                        {this.props.accounts &&
                          this.props.accounts.map(account => (
                            <option
                              key={account.account_id}
                              value={account.account_id}
                            >
                              {account.account_name}
                            </option>
                          ))}
                      </Field>
                    </div>
                  </label>
                  <ErrorMessage
                    name="accountId"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <Link to="/budget/create">Add new budget</Link>
                  <label htmlFor="budgetId" className="label">
                    Budget
                    <div className="control">
                      <Field
                        defaultValue="Choose budget"
                        name="budgetId"
                        id="budgetId"
                        component="select"
                        placeholder="Budget"
                      >
                        <option disabled hidden>
                          Choose budget
                        </option>
                        {this.props.budgets &&
                          this.props.budgets.map(budget => (
                            <option
                              key={budget.budget_id}
                              value={budget.budget_id}
                            >
                              {budget.budget_name}
                            </option>
                          ))}
                      </Field>
                    </div>
                  </label>
                  <ErrorMessage
                    name="budgetId"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <div className="control">
                    <label htmlFor="income" className="label label-radio">
                      Income
                      <Field
                        type="radio"
                        name="type"
                        value="income"
                        id="income"
                      />
                    </label>
                    <label htmlFor="expense" className="label label-radio">
                      Expense
                      <Field
                        type="radio"
                        name="type"
                        value="expense"
                        id="expense"
                      />
                    </label>
                  </div>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <label htmlFor="date" className="label">
                    Date
                    <div className="control">
                      <DatePicker
                        id="date"
                        name="dateselect"
                        value={format(values['dateselect'], 'YYYY-MM-DD')}
                        onChange={e => setFieldValue('dateselect', e)}
                        maxDate={new Date()}
                        placeholderText="Click to set the transaction date"
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                  </label>
                  {errors.dateselect && (
                    <div className="error-message">{errors.dateselect}</div>
                  )}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Add Transaction
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.account.accounts,
    budgets: state.budget.budgets,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => ({
  addTransaction: transaction => dispatch(addTransaction(transaction)),
  addAccount: account => dispatch(addAccount(account)),
  addBudget: budget => dispatch(addBudget(budget)),
  getAccounts: uid => dispatch(getAccounts(uid)),
  getBudgets: uid => dispatch(getBudgets(uid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTransaction)
