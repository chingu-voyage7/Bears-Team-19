import React from 'react'

const Budget = props => {
  const { budget_id: id, budget_name: name } = props.budget
  return <div>{name}</div>
}

export default Budget
