import { addDays, format } from 'date-fns'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { addAccount, getAccounts } from '../../store/actions/accountActions'
import { addBudget, getBudgets } from '../../store/actions/budgetActions'
import { updateTransaction } from '../../store/actions/transactionActions'

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

class EditTransaction extends Component {
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
    const {
      amount,
      category,
      accountId,
      budgetId,
      type,
      date,
    } = this.props.transaction

    return (
      <section className="form-container">
        <div className="container">
          <Formik
            initialValues={{
              amount,
              category,
              accountId,
              budgetId,
              type,
              dateselect: format(date),
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const updatedTransaction = {
                  ...values,
                  accountId: parseInt(values.accountId),
                  budgetId: parseInt(values.budgetId),
                  uid: this.props.auth.uid,
                  transId: this.props.transaction.transId,
                }
                this.props.updateTransaction(updatedTransaction)
                setSubmitting(false)
                this.setState({
                  toDashboard: true,
                })
              }, 400)
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form>
                <h3>Update transaction</h3>
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
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="help is-danger"
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
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <div className="field">
                  <label htmlFor="accountId" className="label">
                    Account
                  </label>
                  <div className="control select">
                    <Field
                      name="accountId"
                      id="accountId"
                      component="select"
                      placeholder="Account"
                    >
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

                  <ErrorMessage
                    name="accountId"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <div className="field">
                  <label htmlFor="budgetId" className="label">
                    Budget
                  </label>
                  <div className="control select">
                    <Field
                      name="budgetId"
                      id="budgetId"
                      component="select"
                      placeholder="Budget"
                    >
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

                  <ErrorMessage
                    name="budgetId"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <div className="field">
                  <div className="control">
                    <label htmlFor="income" className="radio">
                      <strong>Income</strong>
                      <Field
                        type="radio"
                        name="type"
                        value="income"
                        id="income"
                        checked={values.type === 'income'}
                      />
                    </label>
                    <label htmlFor="expense" className="radio">
                      <strong>Expense</strong>
                      <Field
                        type="radio"
                        name="type"
                        value="expense"
                        id="expense"
                        checked={values.type === 'expense'}
                      />
                    </label>
                  </div>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="help is-danger"
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
                        className="input"
                      />
                    </div>
                  </label>
                  {errors.dateselect && (
                    <div className="help is-danger">{errors.dateselect}</div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="is-info button"
                >
                  Update Transaction
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, props) => {
  const transaction = props.location.state
  return {
    auth: state.firebase.auth,
    accounts: state.account.accounts,
    budgets: state.budget.budgets,
    transaction,
  }
}

const mapDispatchToProps = dispatch => ({
  updateTransaction: transaction => dispatch(updateTransaction(transaction)),
  addAccount: account => dispatch(addAccount(account)),
  addBudget: budget => dispatch(addBudget(budget)),
  getAccounts: uid => dispatch(getAccounts(uid)),
  getBudgets: uid => dispatch(getBudgets(uid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTransaction)
