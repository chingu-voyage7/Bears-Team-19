import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons'

class NavActions extends Component {
  state = {
    isActive: false,
  }

  del = () => {
    if (this.props.inUse) {
      this.setState({
        isActive: !this.state.isActive,
      })
    } else {
      this.props.handleDelete(this.props.id)
      if (this.props.history) {
        this.props.history.goBack()
      }
    }
  }

  toggleActive = () => {
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  render() {
    const { item, history, itemLink } = this.props
    return (
      <div className="buttons is-centered">
        <button className="button is-danger is-outlined" onClick={this.del}>
          <Icon name="delete" color="#E94B25" />
        </button>
        {item.category === 'New Account' ? null : (
          <Link
            className="button is-outlined is-info"
            to={{
              pathname: `/${itemLink}/edit`,
              state: { item },
            }}
          >
            <Icon name="edit" color="#6179C7" />
          </Link>
        )}
        {history ? (
          <button
            className="button is-link is-outlined"
            onClick={this.props.history.goBack}
          >
            Go back
          </button>
        ) : null}
        <div className={`modal ${this.state.isActive ? 'is-active' : ''}`}>
          <div className="modal-background" />
          <div className="modal-content">
            <div className="notification is-danger">
              This item is in use by a transaction. Can not delete it.
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.toggleActive}
          />
        </div>
      </div>
    )
  }
}

export default NavActions

// const NavActions = ({ id, item, handleDelete, history, itemLink, inUse }) => {
//   let isActive = false

//   const del = () => {
//     if (inUse) {
//       console.log('got here')
//       isActive = true
//     } else {
//       handleDelete(id)
//       if (history) {
//         history.goBack()
//       }
//     }
//   }

//   const goBack = () => {
//     history.goBack()
//   }

//   const toggleActive = () => {
//     console.log('hey')
//     isActive = false
//   }

//   return (
//     <div className="buttons is-centered">
//       <button className="button is-danger is-outlined" onClick={del}>
//         <Icon name="delete" color="#E94B25" />
//       </button>
//       <Link
//         className="button is-outlined is-info"
//         to={{
//           pathname: `/${itemLink}/edit`,
//           state: { item },
//         }}
//       >
//         <Icon name="edit" color="#6179C7" />
//       </Link>
//       {history ? (
//         <button className="button is-link is-outlined" onClick={goBack}>
//           Go back
//         </button>
//       ) : null}
//       <div className={`modal ${isActive ? 'is-active' : ''}`}>
//         <div className="modal-background" />
//         <div className="modal-content">
//           <p>This item is in use by a transaction. Can not delete it.</p>
//         </div>
//         <button
//           className="modal-close is-large"
//           aria-label="close"
//           onClick={toggleActive}
//         />
//       </div>
//     </div>
//   )
// }

// export default NavActions
