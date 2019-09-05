import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'

function App() {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(null)
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (status, message) => {
    setStatus(status)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.attributes.value,
      password: password.attributes.value
    }
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      showMessage(null, `${user.name} is logged in`)
      username.reset()
      password.reset()
    } catch (exception) {
      showMessage('Error', 'Wrong user name or password')
      username.reset()
      password.reset()
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    showMessage(null, `${user.name} logged out`)
    setUser(null)
  }

  const rows = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      sortedBlogs.map(blog =>
        <Blog blog={blog} key={blog.id} addLike={() => addLike(blog.id)} removeBlog={() => removeBlog(blog.id)} user={user}/>
      )
    )
  }
  const loginForm = () => (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        username
        <input {...username.attributes} />
      </div>
      <div>
        password
        <input {...password.attributes}/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Show form">
      <BlogForm
        onSubmit={addBlog}
        title={title.attributes}
        author={author.attributes}
        url={url.attributes}
      />
    </Togglable>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        [title.attributes.name]: title.attributes.value,
        [author.attributes.name]: author.attributes.value,
        [url.attributes.name]: url.attributes.value
      }
      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      title.reset()
      author.reset()
      url.reset()
      showMessage(null, `A new blog ${data.title} by ${data.author} was added`)
    } catch (exception) {
      title.reset()
      author.reset()
      url.reset()
      showMessage('Error', 'No blog was added, something went wrong')
    }
  }

  const addLike = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const initialLikes = blog.likes
      const likedBlog = { ...blog, likes: initialLikes + 1 }
      const updatedBlog = await blogService.update(id, likedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      showMessage(null, `Added 1 like for ${blog.title} by ${blog.author}`)
    } catch (exception) {
      showMessage('Error', 'No like was added, something went wrong')
    }
  }

  const removeBlog = async (id) => {
    try {
      const blogToRemove = blogs.find(blog => blog.id === id)
      if (window.confirm(`Do you really want to remove ${blogToRemove.title} by ${blogToRemove.author}?`)) {
        await blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        showMessage(null, 'Blog removed successfully')
      }
    } catch (exception) {
      showMessage('Error', 'No blog removed, something went wrong')
    }
  }

  return (
    <div>
      <Notification message={message} status={status}/>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
          <h2>Create new</h2>
          <div>
            {blogForm()}
            {rows()}
          </div>
        </div>
      }
    </div>
  )
}

export default App
