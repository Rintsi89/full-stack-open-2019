import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'
import Header from './components/Header'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Home from './components/Home'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { showMessage } from './reducers/notificationReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const App = (props) => {

  const userById = (id) => props.users.find(user => user.id === id)
  const blogById = (id) => props.blogs.find(blog => blog.id === id)

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.initializeUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <Container>
      <Notification />
      {props.logged_user.length === 0 ?
        <LoginForm />
        :
        <div>
          <Header />
          <Router>
            <Menu inverted>
              <Menu.Item><Link to="/">Home</Link></Menu.Item>
              <Menu.Item><Link to="/blogs">Blogs</Link></Menu.Item>
              <Menu.Item><Link to="/users">Users</Link></Menu.Item>
            </Menu>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/blogs" render={() => <BlogList />} />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={blogById(match.params.id)} />} />
          </Router>
        </div>
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    logged_user: state.logged_user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  initializeUsers,
  showMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
