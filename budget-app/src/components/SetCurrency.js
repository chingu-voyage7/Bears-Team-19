import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { locales } from '../helpers/helpers.js'
import { updateUser } from '../store/actions/userActions.js'

const schema = yup.object().shape({
  currency: yup.string().required('Required'),
})
class SetCurrency extends Component {
  state = {
    currency: undefined,
  }
  componentDidMount() {
    this.setState({
      currency: this.props.userCurrency,
    })
  }
  render() {
    const { userCurrency } = this.props
    return (
      <section className="form-container">
        <div className="container">
          <Formik
            initialValues={{
              currency: this.state.currency,
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
  updateUser: data => dispatch(updateUser(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetCurrency)
