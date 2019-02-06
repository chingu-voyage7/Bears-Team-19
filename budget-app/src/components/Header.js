import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'

import './Header.css'
import Icon from './Icons/index'

const Header = props => {
  const { auth } = props
  return (
    <div className="main-header">
      <NavLink to="/">
        <div className="logo">
          <Icon name="logo" />
          <h3>Budget Bears</h3>
        </div>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <Icon name="home" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <Icon name="about" />
              <span>About</span>
            </NavLink>
          </li>

          {auth.uid ? (
            <li>
              <a onClick={props.signOut} to="/">
                <Icon name="logout" />
                <span>Sign out</span>
              </a>
            </li>
          ) : (
            <li>
              <NavLink to="/signin">
                <Icon name="login" />
                <span>Log in</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
