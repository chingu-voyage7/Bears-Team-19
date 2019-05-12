import React, { Component } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import { dataColors } from '../helpers/helpers'

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  console.log(cx, 'cx')
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default class ExpensePieChart extends Component {
  render() {
    const { transactions } = this.props

    // Only expenses
    const expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .map(expense => {
        return { ...expense, amount: expense.amount * -1 }
      })

    // 1. Get a list of all categories.
    const categoriesAll = expenses.map(expense => expense.category)
    const catUniques = [...new Set(categoriesAll)]

    // 2. loop over the categories and return only the expenses that belong to that category.

    const categoryData = catUniques.reduce((acc, prev) => {
      // Get the sum of each category
      const sum = expenses.reduce((total, amount) => {
        // Check if the category is the same in the expense as the one we loop through. If it is, then add the amount to total
        if (prev === amount.category) {
          return Number(total) + Number(amount.amount)
        }
        return total
      }, 0)
      // 3. Sum up the amounts for each category.
      return [...acc, { name: prev, value: sum }]
    }, [])

    return (
      <div>
        <h3>Expenses of category</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="value"
            // nameKey="name"
            cx={200}
            cy={200}
            outerRadius={160}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={dataColors[index % dataColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    )
  }
}
