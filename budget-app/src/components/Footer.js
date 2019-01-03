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
        <Icon name="email" />
      </div>
      <div className="info">
        <div className="contact">Contact info</div>
        <a href="#">Github Link</a>
      </div>
    </div>
  )
}

export default Footer
