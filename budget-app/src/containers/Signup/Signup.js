import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Icon from '../../components/Icons'
import { signUp } from '../../store/actions/authActions'
import './Signup.css'

class Signup extends Component {
  state = {
    email: '',
    password: '',
    username: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.signUp(this.state)
    this.setState({
      email: '',
      password: '',
      username: '',
    })
  }
  render() {
    const { auth } = this.props

    if (auth.uid) {
      return <Redirect to="/" />
    }
    return (
      <section className="signup">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign up</h3>

            <div className="field">
              <label htmlFor="username" className="label">
                Username
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup)
