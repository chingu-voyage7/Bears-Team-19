import React from 'react'
import { About } from './About'
import { Add } from './Add'
import { Contact } from './Contact'
import { Delete } from './Delete'
import { Edit } from './Edit'
import { Email } from './Email'
import { Facebook } from './Facebook'
import { Finance } from './Finance'
import { Github } from './Github'
import { Google } from './Google'
import { Home } from './Home'
import { Instagram } from './Instagram'
import { Login } from './Login'
import { Logo } from './Logo'
import { Logout } from './Logout'
import { Mapmarker } from './Mapmarker'
import { Phone } from './Phone'
import { Profile } from './Profile'
import { Remove } from './Remove'
import { Signup } from './Signup'
import { Twitter } from './Twitter'

const Icon = props => {
  switch (props.name) {
    case 'logo':
      return <Logo {...props} />
    case 'add':
      return <Add {...props} />
    case 'remove':
      return <Remove {...props} />
    case 'email':
      return <Email {...props} />
    case 'delete':
      return <Delete {...props} />
    case 'edit':
      return <Edit {...props} />
    case 'instagram':
      return <Instagram {...props} />
    case 'mapmarker':
      return <Mapmarker {...props} />
    case 'github':
      return <Github {...props} />
    case 'phone':
      return <Phone {...props} />
    case 'twitter':
      return <Twitter {...props} />
    case 'facebook':
      return <Facebook {...props} />
    case 'google':
      return <Google {...props} />
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
