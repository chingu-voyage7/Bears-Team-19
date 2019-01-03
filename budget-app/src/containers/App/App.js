import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from '../Home/Home'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NotFound from '../../components/NotFound'
import Signup from '../Signup/Signup'

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
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
