import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { locales } from '../helpers/helpers.js'
import { getUser, updateUser } from '../store/actions/userActions.js'

const schema = yup.object().shape({
  currency: yup.string().required('Required'),
})
class SetCurrency extends Component {
  componentDidMount() {
    this.props.getUser(this.props.auth.uid)
  }
  render() {
    return (
      <div className="column">
        <Formik
          initialValues={{
            currency: this.props.user.currency,
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const currencyDetails = {
                data: { ...values },
                uid: this.props.auth.uid,
              }
              this.props.updateUser(currencyDetails)
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="field">
                <label htmlFor="currency" className="label">
                  Set currency
                  <div className="control select">
                    <Field
                      component="select"
                      name="currency"
                      id="currency"
                      placeholder="Ex. USD"
                    >
                      <option disabled hidden>
                        Choose currency
                      </option>
                      {locales.map(locale => (
                        <option key={locale} value={locale}>
                          {locale}
                        </option>
                      ))}
                    </Field>
                  </div>
                </label>
                <ErrorMessage
                  name="currency"
                  component="div"
                  className="help is-danger"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button is-success"
              >
                Set currency
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch(updateUser(data)),
  getUser: uid => dispatch(getUser(uid)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetCurrency)
