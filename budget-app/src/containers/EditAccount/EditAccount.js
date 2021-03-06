import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { editAccount } from '../../store/actions/accountActions'

const schema = yup.object().shape({
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

    const {
      account_name: accountName,
      account_id: accountId,
    } = this.props.account.item
    return (
      <section className="form-container">
        <div className="container">
          <Formik
            initialValues={{
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
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="accountName"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button is-info"
                >
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
