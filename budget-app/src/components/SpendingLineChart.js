import React, { Component } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { dataColors, formatAccounts, formatData } from '../helpers/helpers'

export default class Charts extends Component {
  render() {
    const { balanceAccounts, balanceTotal } = this.props

    // Format data in total balance array
    const formatedTotal = formatData(balanceTotal, 'Total')

    // Format data in accounts balance array
    const formatedAccounts = formatAccounts(balanceAccounts)

    // Add the two formated datasets together.
    const formatedDataset = [...formatedTotal, ...formatedAccounts]

    // Add a stroke color to each of them.
    const dataWithColors = formatedDataset.map((record, i) => {
      return {
        ...record,
        stroke: dataColors[i],
      }
    })

    return (
      <section className="section small-width">
        <h3>Spending over time</h3>
        <LineChart width={600} height={400}>
          <CartesianGrid />
          <XAxis
            dataKey="category"
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          {dataWithColors.map(s => (
            <Line
              dataKey="value"
              data={s.data}
              name={s.name}
              key={s.name}
              stroke={s.stroke}
            />
          ))}
        </LineChart>
      </section>
    )
  }
}
