import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBudget, getBudgets } from '../store/actions/budgetActions'
import Budget from './Budget'

class BudgetList extends Component {
  componentDidMount() {
    this.props.getBudgets(this.props.uid)
  }

  handleDelete = id => {
    this.props.deleteBudget({ budgetId: id, uid: this.props.uid })
  }

  render() {
    const budgets = this.props.budgets
      ? this.props.budgets.map(budget => (
          <Budget
            budget={budget}
            key={budget.budget_id}
            handleDelete={this.handleDelete}
          />
        ))
      : ''
    return (
      <section className="section small-width">
        <h4>Budgets</h4>
        {budgets}
        <Link to="/budget/create">Add new budget</Link>
      </section>
    )
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
    deleteBudget: data => dispatch(deleteBudget(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BudgetList)
