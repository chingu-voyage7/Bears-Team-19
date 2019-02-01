import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NotFound from '../../components/NotFound'
import About from '../About/About'
import AddTransaction from '../AddTransaction/AddTransaction'
import Dashboard from '../Dashboard/Dashboard'
import EditTransaction from '../EditTransaction/EditTransaction'
import Home from '../Home/Home'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'
import './App.css'

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
              <Route path="/transaction/create" component={AddTransaction} />
              <Route path="/transaction/:id" component={EditTransaction} />
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
