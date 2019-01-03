import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from '../Home/Home'
import About from '../About/About'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Welcome Aboard!</h1>
          <a
            onMouseEnter={event => event.target.classList.add('is-loading')}
            className="button is-large"
            href="#"
          >
            Bulma Test
          </a>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App
