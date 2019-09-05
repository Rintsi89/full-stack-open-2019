import React from 'react'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  if (status === 'Error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

export default Notification