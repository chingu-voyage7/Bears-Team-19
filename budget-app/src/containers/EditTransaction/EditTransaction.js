import { addDays, format } from 'date-fns'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { updateTransaction } from '../../store/actions/transactionActions'
import './EditTransaction.css'

const schema = yup.object().shape({
  amount: yup
    .number('Value must be a number.')
    .min(0.01, 'Number has to be higher than 0.')
    .required('Required'),
  account: yup.string().required('Required'),
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
  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />
    }
    const { amount, category, account, type, date } = this.props.transaction

    return (
      <section className="update-transaction">
        <div className="container">
          <Formik
            initialValues={{
              amount,
              category,
              account,
              type,
              dateselect: format(date),
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const updatedTransaction = {
                  ...values,
                  uid: this.props.auth.uid,
                  transId: this.props.transaction.trans_id,
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
                  <label htmlFor="account" className="label">
                    Account
                    <div className="control">
                      <Field
                        type="text"
                        name="account"
                        id="account"
                        placeholder="Ex. Spending account"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="account"
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
                        checked={values.type === 'income'}
                      />
                    </label>
                    <label htmlFor="expense" className="label label-radio">
                      Expense
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
