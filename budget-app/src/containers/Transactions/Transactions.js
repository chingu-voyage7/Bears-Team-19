import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransactionList from '../../components/TransactionList'
import { getUser } from '../../store/actions/userActions'

class Transactions extends Component {
  componentDidMount() {
    this.props.getUser(this.props.auth.uid)
  }
  render() {
    const {
      auth: { uid },
      user: { currency },
    } = this.props
    return (
      <div>
        {currency && uid && (
          <TransactionList uid={uid} userCurrency={currency} />
        )}
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
const mapDispatchToProps = dispatch => {
  return {
    getUser: uid => dispatch(getUser(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transactions)
