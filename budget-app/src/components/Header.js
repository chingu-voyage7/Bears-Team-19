import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Header.css'
import Icon from './Icons/index'

const Header = () => {
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
          <li>
            <NavLink to="/signin">
              <Icon name="login" />
              <span>Log in</span>
            </NavLink>
          </li>
          <li>
            <Link to="/signout">
              <Icon name="logout" />
              <span>Sign out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {}
  // auth: state.firebase.auth,
}

const mapDispatchToProps = {}

export default connect(mapStateToProps)(Header)
