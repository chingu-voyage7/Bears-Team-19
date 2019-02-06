import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, auth, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          auth.uid ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/signin', state: { from: props.location } }}
            />
          )
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
