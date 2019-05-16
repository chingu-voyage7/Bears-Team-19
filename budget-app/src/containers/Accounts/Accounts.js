import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountList from '../../components/AccountList'

class Accounts extends Component {
  render() {
    const {
      auth: { uid },
    } = this.props
    return <div>{uid && <AccountList uid={uid} />}</div>
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Accounts)
