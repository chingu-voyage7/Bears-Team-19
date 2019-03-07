import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import { editBudget } from '../../store/actions/budgetActions'

const schema = yup.object().shape({
  budgetName: yup
    .string()
    .trim('No whitespace!')
    .required('Required'),
})
class EditBudget extends Component {
  state = {
    toDashboard: false,
  }

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />
    }

    const { budgetName, budgetId } = this.props.budget
    return (
      <section className="edit-budget">
        <div className="container">
          <Formik
            initialValues={{
              budgetName,
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              const updateBudget = {
                ...values,
                budgetId,
                uid: this.props.auth.uid,
              }
              this.props.editBudget(updateBudget)
              setSubmitting(false)
              this.setState({
                toDashboard: true,
              })
            }}
          >
            {({ isSubmitting, setFieldValue, values, errors }) => (
              <Form>
                <h3>Edit budget</h3>
                <div className="field">
                  <label htmlFor="budgetName" className="label">
                    Budget Name
                    <div className="control">
                      <Field
                        type="text"
                        name="budgetName"
                        id="budgetName"
                        placeholder="Ex. 2019"
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
                  disabled={isSubmitting}
                  className="button is-info"
                >
                  Save Budget
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
    budget: props.location.state,
  }
}

const mapDispatchToProps = dispatch => ({
  editBudget: budget => dispatch(editBudget(budget)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBudget)
