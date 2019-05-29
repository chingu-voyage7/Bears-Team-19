import { Component, default as React } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../store/actions/authActions'
import './Header.css'
import Icon from './Icons/index'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }
  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { auth } = this.props
    return (
      <div className="main-header">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink to="/" className="navbar-item">
              <div className="logo">
                <Icon name="logo" />
                <h3>Budget Bears</h3>
              </div>
            </NavLink>
            <a
              role="button"
              className={
                this.state.isOpen
                  ? 'navbar-burger burger is-active'
                  : 'navbar-burger burger'
              }
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasic"
              onClick={this.toggleMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div
            id="navbarBasic"
            className={
              this.state.isOpen ? 'navbar-menu is-active' : 'navbar-menu'
            }
          >
            {auth.uid ? (
              <div className="navbar-end">
                <NavLink to="/" className="navbar-item">
                  <Icon name="home" />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/accounts" className="navbar-item">
                  <Icon name="accounts" />
                  <span>Accounts</span>
                </NavLink>
                <NavLink to="/transactions" className="navbar-item">
                  <Icon name="transactions" />
                  <span>Transactions</span>
                </NavLink>
                <a onClick={this.props.signOut} to="/" className="navbar-item">
                  <Icon name="logout" />
                  <span>Sign out</span>
                </a>
              </div>
            ) : (
              <div className="navbar-end">
                <NavLink to="/" className="navbar-item">
                  <Icon name="home" />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/about" className="navbar-item">
                  <Icon name="about" />
                  <span>About</span>
                </NavLink>
                <NavLink to="/signin" className="navbar-item">
                  <Icon name="login" />
                  <span>Log in</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
