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
import { Facebook } from './Facebook'
import { Email } from './Email'
import { Github } from './Github'
import { Twitter } from './Twitter'

const Icon = props => {
  switch (props.name) {
    case 'logo':
      return <Logo {...props} />
    case 'email':
      return <Email {...props} />
    case 'github':
      return <Github {...props} />
    case 'twitter':
      return <Twitter {...props} />
    case 'facebook':
      return <Facebook {...props} />
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
