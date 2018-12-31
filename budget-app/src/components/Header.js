import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { Logo } from '../assets/Logo.js'

const Header = () => {
  return (
    <div className="main-header">
      <div>
        <Logo />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
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
