import { addDays, format, parse } from 'date-fns'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { getMinDate } from '../../helpers/helpers'
import { addAccount, getAccounts } from '../../store/actions/accountActions'
import { addTransaction } from '../../store/actions/transactionActions'

const schema = yup.object().shape({
  amount: yup
    .number('Value must be a number.')
    .min(0.01, 'Number has to be higher than 0.')
    .required('Required'),
  accountId: yup.number().required('Required'),
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
  }
  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />
    }

    return (
      <section className="form-container">
        <div className="container">
          <Formik
            initialValues={{
              amount: 0,
              category: '',
              accountId: undefined,
              type: '',
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
                  <div className="link-btn">
                    <Link
                      to="/account/create"
                      className="button is-link is-outlined"
                    >
                      Add new account
                    </Link>
                  </div>
                  <ErrorMessage
                    name="accountId"
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
                      />
                    </label>
                    <label htmlFor="expense" className="radio">
                      <strong>Expense</strong>
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
                        minDate={
                          values.accountId
                            ? parse(
                                getMinDate(
                                  values.accountId,
                                  this.props.accounts,
                                ),
                              )
                            : new Date()
                        }
                        maxDate={new Date()}
                        placeholderText="Click to set the transaction date"
                        dateFormat="yyyy-MM-dd"
                        className="input"
                        disabled={values.accountId ? false : true}
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
                  className="is-success button"
                >
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
    accounts: state.account.accountsWithBalance,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => ({
  addTransaction: transaction => dispatch(addTransaction(transaction)),
  addAccount: account => dispatch(addAccount(account)),
  getAccounts: uid => dispatch(getAccounts(uid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTransaction)
