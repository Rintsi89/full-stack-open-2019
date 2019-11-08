const notificationReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return { message: action.message, status: action.status }
  case 'HIDE_MESSAGE':
    return []
  default:
    return state
  }
}

export const changeMessage = message => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}
export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE'
  }
}

export const showMessage = (message, status, time) => {

  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message: message,
      status: status
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_MESSAGE'
      })
    }, time)
  }
}

export default notificationReducer