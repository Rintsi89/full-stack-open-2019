import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  logged_user: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store