import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import Icon from '../../components/Icons'
import { signUp } from '../../store/actions/authActions'

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Too short')
    .max(10, 'Too long!')
    .required('Required'),
  email: yup
    .string()
    .trim('No whitespace!')
    .lowercase('It has to be lowercase!')
    .email('Invalid email!')
    .required('Required'),
  password: yup
    .string()
    .min(6, 'Too short')
    .max(21, 'Too long!')
    .required('Required'),
})

class Signup extends Component {
  render() {
    const { auth } = this.props

    if (auth.uid) {
      return <Redirect to="/" />
    }
    return (
      <section className="form-container">
        <div className="container">
          <Formik
            initialValues={{ email: '', password: '', username: '' }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const data = {
                  ...values,
                  signupType: 'email',
                }
                this.props.signUp(data)
                setSubmitting(false)
              }, 400)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <h3>Sign up</h3>
                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                    <div className="control">
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email" className="label">
                    Email
                    <div className="control has-icon-left has-icons-right">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                    <div className="control">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="input"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="help is-danger"
                  />
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success"
                    disabled={isSubmitting}
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div>
            <p>or sign up with:</p>
            <button
              className="button is-light"
              onClick={() => this.props.signUp({ signupType: 'google' })}
            >
              <Icon name="google" color="#28439e" width="24" height="24" />
            </button>
          </div>
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

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup)
