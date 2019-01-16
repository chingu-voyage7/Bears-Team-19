import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icon from '../../components/Icons'
import './Signup.css'

class Signup extends Component {
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
    console.log(this.state)
  }
  render() {
    return (
      <section className="signup">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign up</h3>
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
              <button className="button is-success">Sign up</button>
            </div>
          </form>
          <div>
            <p>or sign up with:</p>
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
        </div>
      </section>
    )
  }
}

export default Signup
