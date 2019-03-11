import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { addBudget } from '../../store/actions/budgetActions'

const schema = yup.object().shape({
  budgetName: yup
    .string()
    .trim('No whitespace!')
    .required('Required'),
})
class AddBudget extends Component {
  state = {
    toDashboard: false,
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
              budgetName: '',
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const newBudget = {
                  ...values,
                  uid: this.props.auth.uid,
                }
                this.props.addBudget(newBudget)
                setSubmitting(false)
                this.props.history.goBack()
              }, 400)
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form>
                <h3>Add budget</h3>
                <div className="field">
                  <label htmlFor="budgetName" className="label">
                    Budget name
                    <div className="control">
                      <Field
                        type="text"
                        name="budgetName"
                        id="budgetName"
                        placeholder="Ex. July"
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="budgetName"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="is-success button"
                  disabled={isSubmitting}
                >
                  Add Budget
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
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => ({
  addBudget: budget => dispatch(addBudget(budget)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddBudget)
