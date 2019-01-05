import React from 'react'
import './Footer.css'
import Icon from './Icons/index'

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="social-media">
          <Icon name="facebook" width="35" height="35" />
          <Icon name="github" width="35" height="35" />
          <Icon name="twitter" width="35" height="35" />
          <Icon name="instagram" width="35" height="35" />
        </div>
        <div className="contact">
          <div>
            <Icon name="phone" className="icon" /> +(00) 000 000 000
          </div>
          <div>
            <Icon name="email" className="icon" /> budgetbears@fakeemail.com
          </div>
          <div>
            <Icon name="mapmarker" className="icon" /> Fakestreet 42, 12345
            Nevertown
          </div>
        </div>
        <div className="info">
          <a href="https://github.com/chingu-voyage7/Bears-Team-19">
            Github Link
          </a>
          <p className="copyright">&copy; 2019 Budget Bears</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
