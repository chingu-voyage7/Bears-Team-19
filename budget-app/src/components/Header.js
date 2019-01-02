import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Icon from './Icons/index'

const Header = () => {
  return (
    <div className="main-header">
      <Link to="/">
        <div className="logo">
          <Icon name="logo" />
          <h3>Busting Bears</h3>
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Icon name="home" />
              <span>Home</span>
              {/* <p>Home</p> */}
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Icon name="about" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <Icon name="contact" />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Icon name="login" />
              <span>Log in</span>
            </Link>
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
