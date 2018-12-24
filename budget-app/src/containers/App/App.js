import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome Aboard!</h1>
        <a
          onMouseEnter={event => event.target.classList.add('is-loading')}
          className="button is-large"
          href=""
        >
          Bulma Test
        </a>
      </div>
    )
  }
}

export default App
