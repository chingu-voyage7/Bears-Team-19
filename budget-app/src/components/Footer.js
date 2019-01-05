import React from 'react'
import './Footer.css'
import Icon from './Icons/index'

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="social-media">
        <Icon name="facebook" />
        <Icon name="github" />
        <Icon name="twitter" />
      </div>
      <div className="info">
        <div className="contact">
          <Icon name="phone" /> +(00) 000 000 000
          <Icon name="email" /> budgetbears@fakeemail.com
          <Icon name="mapmarker" /> Fakestreet 42, 12345 Nevertown
        </div>
        <a href="https://github.com/chingu-voyage7/Bears-Team-19">
          Github Link
        </a>
        <p>&copy; 2019 Budget Bears</p>
      </div>
    </div>
  )
}

export default Footer
