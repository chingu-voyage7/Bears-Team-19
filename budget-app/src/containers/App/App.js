import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import About from '../About/About'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NotFound from '../../components/NotFound'
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'

import './App.css'

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
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
