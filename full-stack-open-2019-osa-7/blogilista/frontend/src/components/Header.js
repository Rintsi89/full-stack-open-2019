import React from 'react'
import { connect } from 'react-redux'
import { logOutUser } from '../reducers/loginReducer'
import { showMessage } from '../reducers/notificationReducer'

const Header = (props) => {

  const flexContainer = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }

  const handleLogOut = () => {

    const user = props.logged_user
    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    props.logOutUser()
    props.showMessage(`${user.name} logged out`, 'success', 5000)
  }

  return(
    <div style={flexContainer}>
      <h2 style={{ margin: 10 }}>Magnificent Blogging Site </h2>
      <em>{props.logged_user.name} is logged in <button className="ui negative mini button" onClick={() => handleLogOut()}>Log Out</button></em>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    logged_user: state.logged_user
  }
}

const mapDispatchToProps = {
  showMessage,
  logOutUser
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader