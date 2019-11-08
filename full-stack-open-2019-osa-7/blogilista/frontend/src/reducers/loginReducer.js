import loginService from '../services/login'
import blogService from '../services/blogs'
import { showMessage } from './notificationReducer'

const loginReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'UNSET_USER':
    return []
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser',JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
    dispatch(showMessage(`${user.name} has just logged in!`, 'success', 5000))
  }
}

export const logOutUser = () => {
  return {
    type: 'UNSET_USER'
  }
}

export const initializeUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default loginReducer