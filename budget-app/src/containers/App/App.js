import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NotFound from '../../components/NotFound'
import PrivateRoute from '../../components/PrivateRoute'
import Transaction from '../../components/Transaction'
import About from '../About/About'
import Accounts from '../Accounts/Accounts'
import AddAccount from '../AddAccount/AddAccount'
import AddTransaction from '../AddTransaction/AddTransaction'
import Dashboard from '../Dashboard/Dashboard'
import EditAccount from '../EditAccount/EditAccount'
import EditTransaction from '../EditTransaction/EditTransaction'
import Home from '../Home/Home'
import Signin from '../Signin/Signin'
import Signup from '../Signup/Signup'
import Transactions from '../Transactions/Transactions'

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
              <PrivateRoute
                path="/transaction/create"
                component={AddTransaction}
              />
              <PrivateRoute
                path="/transaction/edit"
                component={EditTransaction}
              />
              <PrivateRoute path="/transactions" component={Transactions} />
              <PrivateRoute path="/accounts" component={Accounts} />
              <PrivateRoute path="/transaction/:id" component={Transaction} />
              <PrivateRoute path="/account/create" component={AddAccount} />
              <PrivateRoute path="/account/edit" component={EditAccount} />
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
