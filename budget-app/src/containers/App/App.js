import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from '../Home/Home'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Header from '../../components/Header'
import NotFound from '../../components/NotFound'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
