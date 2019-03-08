import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Redirect } from 'react-router-dom'
import * as yup from 'yup'
import Icon from '../../components/Icons/index'
import { signIn } from '../../store/actions/authActions'

const schema = yup.object().shape({
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
class Signin extends Component {
  render() {
    const { auth } = this.props

    if (auth.uid) {
      return <Redirect to="/" />
    }
    return (
      <section className="form-container section">
        <div className="container">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.props.signIn(values)
                setSubmitting(false)
              }, 400)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <h3>Sign in</h3>
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
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div>
            <p>or log in with:</p>
            <Link to="/">
              <Icon name="facebook" color="#28439e" width="40" height="40" />
            </Link>
            <Link to="/">
              <Icon name="google" color="#28439e" width="40" height="40" />
            </Link>
            <Link to="/">
              <Icon name="twitter" color="#28439e" width="40" height="40" />
            </Link>
          </div>
          <div>
            <p>
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin)
