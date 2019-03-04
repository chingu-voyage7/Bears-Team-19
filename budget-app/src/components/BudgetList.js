import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBudgets } from '../store/actions/budgetActions'
import Budget from './Budget'

class BudgetList extends Component {
  componentDidMount() {
    this.props.getBudgets(this.props.uid)
  }
  render() {
    const budgets = this.props.budgets
      ? this.props.budgets.map(budget => (
          <Budget budget={budget} key={budget.budget_id} />
        ))
      : ''
    return <ul>{budgets}</ul>
  }
}

const mapStateToProps = state => {
  return {
    budgets: state.budget.budgets,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBudgets: uid => dispatch(getBudgets(uid)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetList)
