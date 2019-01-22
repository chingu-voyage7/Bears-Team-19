import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CreateBudget extends Component {
  render() {
    const { auth } = this.props

    if (!auth.uid) {
      return <Redirect to="/signin" />
    }
    return <div>Create Budget</div>
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBudget)
