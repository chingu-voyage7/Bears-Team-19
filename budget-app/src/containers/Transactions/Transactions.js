import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransactionList from '../../components/TransactionList'

class Transactions extends Component {
  render() {
    const {
      auth: { uid },
    } = this.props
    return <div>{uid && <TransactionList uid={uid} />}</div>
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Transactions)
