import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import * as yup from 'yup'
import { locales } from '../helpers/helpers.js'

const schema = yup.object().shape({
  currency: yup.string().required('Required'),
})
class SetCurrency extends Component {
  render() {
    return (
      <section className="form-container">
        <div className="container">
          <Formik
            initialValues={{
              currency: undefined,
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                // const currencyDetails = {
                //   ...values,
                //   uid: this.props.auth.uid,
                // }
                console.log(values)
                // this.props.updateUser(currencyDetails)
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
                        defaultValue="Select a currency"
                        component="select"
                        name="currency"
                        id="currency"
                        placeholder="Ex. USD"
                      >
                        <option disabled hidden>
                          Choose currency
                        </option>
                        {locales.map(currency => (
                          <option key={currency} value={currency}>
                            {currency}
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

export default SetCurrency
