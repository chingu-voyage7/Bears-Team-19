import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from '../Home/Home'
import About from '../About/About'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NotFound from '../../components/NotFound'
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'
import Dashboard from '../Dashboard/Dashboard'

import './App.css'
import CreateBudget from '../Budget/CreateBudget'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { auth } = this.props

    return (
      <Router>
        <div className="App">
          <Header />
          <section className="content">
            <Switch>
              {auth.uid ? (
                <Route exact path="/" component={Dashboard} />
              ) : (
                <Route exact path="/" component={Home} />
              )}
              <Route path="/about" component={About} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/createbudget" component={CreateBudget} />

              <Route component={NotFound} />
            </Switch>
          </section>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
})

export default connect(mapStateToProps)(App)
