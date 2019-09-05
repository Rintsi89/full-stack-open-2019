import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showButton = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} onClick={() => toggleVisibility()} className="hidden">
        <p>{blog.title} {blog.author}</p>
      </div>
      <div style={showWhenVisible} onClick={() => toggleVisibility()} className="visible">
        <p>{blog.title} {blog.author}</p>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes <button onClick={addLike}>Like!</button></p>
        <p>Added by {blog.user.username}</p>
        <button style={showButton} onClick={removeBlog}>Remove</button>
      </div>
    </div>
  )
}

export default Blog