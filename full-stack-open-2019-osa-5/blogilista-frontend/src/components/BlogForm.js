import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, title, author, url }) => {

  BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired
  }

  return (
    <form onSubmit={onSubmit} className="blog-form">
      <div>
        Title: <input {...title} />
      </div>
      <div>
        Author: <input {...author} />
      </div>
      <div>
        Url: <input {...url} />
      </div>
      <button>Create</button>
    </form>
  )
}

export default BlogForm