import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

import Icon from '../../components/Icons/index'
import './Signin.css'

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.signIn(this.state)
    this.setState({
      email: '',
      password: '',
    })
  }
  render() {
    return (
      <section className="signin">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign in</h3>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="control has-icon-left has-icons-right">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="control">
              <button className="button is-success">Sign in</button>
            </div>
            <div>
              <p>or log in with:</p>
              <Link to="/">
                <Icon name="facebook" color="#28439e" width="40" height="40" />
              </Link>
              <Link to="/">
                <Icon name="google" color="#28439e" width="40" height="40" />
              </Link>
              <Link to="/">
                <Icon name="twitter" color="#28439e" width="40" height="40" />
              </Link>
            </div>
          </form>
          <div>
            <p>
              Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin)
