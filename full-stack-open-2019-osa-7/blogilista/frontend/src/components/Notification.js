import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const visibility = {
    display: props.notifications.message ? '' : 'none'
  }

  return (
    <div className={props.notifications.status} style={visibility}>
      {props.notifications.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification