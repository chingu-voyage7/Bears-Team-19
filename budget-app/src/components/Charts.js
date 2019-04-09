import { format } from 'date-fns'
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
import { compareDates } from '../helpers/helpers'
const renderLegend = props => {
  const { payload } = props
  console.log(payload)
  return (
    <ul>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>{entry.value}</li>
      ))}
    </ul>
  )
}

const renderLabel = props => {
  console.log(props)

  return <div>hey</div>
}
export default class Charts extends Component {
  render() {
    const { balancelogs } = this.props
    // Sort the dates oldest to newest.
    const sortedByDateAsc = balancelogs.sort(compareDates).map(log => {
      // Clean up date with format.
      const dateFormated = format(log.date, 'YYYY-MM-DD')
      return { ...log, date: dateFormated }
    })
    console.log(sortedByDateAsc)
    return (
      <section className="section small-width">
        <LineChart width={600} height={400} data={sortedByDateAsc}>
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <XAxis dataKey="date" />
          <YAxis type="number" />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            activeDot={true}
            name="Total balance"
          />
        </LineChart>
      </section>
    )
  }
}
