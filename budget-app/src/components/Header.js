import React from 'react'
import { NavLink } from 'react-router-dom'
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
          {/* 
      // TODO Add conditional that checks if user is logged in and shows sign out in that case
      <li>
      <Link to="/signout">Sign out</Link>
    </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default Header
