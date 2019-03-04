import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { editAccount } from '../../store/actions/accountActions'
import './EditAccount.css'

const schema = yup.object().shape({
  balance: yup
    .number('Value must be a number.')
    .min(0.01, 'Number has to be higher than 0.')
    .required('Required'),
  accountName: yup
    .string()
    .trim('No whitespace!')
    .required('Required'),
})
class EditAccount extends Component {
  state = {
    toDashboard: false,
  }

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />
    }

    const { balance, accountName, accountId } = this.props.account
    return (
      <section className="edit-account">
        <div className="container">
          <Formik
            initialValues={{
              balance,
              accountName,
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const updateAccount = {
                  ...values,
                  accountId,
                  uid: this.props.auth.uid,
                }
                this.props.editAccount(updateAccount)
                setSubmitting(false)
                this.setState({
                  toDashboard: true,
                })
              }, 400)
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form>
                <h3>Edit account</h3>
                <div className="field">
                  <label htmlFor="accountName" className="label">
                    Account Name
                    <div className="control">
                      <Field
                        type="text"
                        name="accountName"
                        id="accountName"
                        placeholder="Ex. Spending"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="accountName"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="field">
                  <label htmlFor="balance" className="label">
                    Balance
                    <div className="control">
                      <Field
                        type="number"
                        name="balance"
                        id="balance"
                        placeholder="Ex. 12.99"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="balance"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Save Account
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
  return {
    auth: state.firebase.auth,
    account: props.location.state,
  }
}

const mapDispatchToProps = dispatch => ({
  editAccount: account => dispatch(editAccount(account)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAccount)
