import React, { Component } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

export default class Charts extends Component {
  render() {
    // TODO fix the transaction sorting of date.
    return (
      <section className="section small-width">
        <LineChart width={600} height={400} data={this.props.transactions}>
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </section>
    )
  }
}
