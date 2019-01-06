import React from 'react'

import { Logo } from './Logo'
import { Profile } from './Profile'
import { Home } from './Home'
import { About } from './About'
import { Contact } from './Contact'
import { Finance } from './Finance'
import { Login } from './Login'
import { Logout } from './Logout'
import { Signup } from './Signup'

const Icon = props => {
  switch (props.name) {
    case 'logo':
      return <Logo {...props} />
    case 'profile':
      return <Profile {...props} />
    case 'home':
      return <Home {...props} />
    case 'about':
      return <About {...props} />
    case 'contact':
      return <Contact {...props} />
    case 'signup':
      return <Signup {...props} />
    case 'login':
      return <Login {...props} />
    case 'logout':
      return <Logout {...props} />
    case 'finance':
      return <Finance {...props} />
    default:
      break
  }
}

export default Icon
