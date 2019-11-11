import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { useField } from '../hooks'
import { showMessage } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {

  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        [title.attributes.name]: title.attributes.value,
        [author.attributes.name]: author.attributes.value,
        [url.attributes.name]: url.attributes.value
      }

      props.createBlog(blogObject)

      title.reset()
      author.reset()
      url.reset()
    } catch (exception) {
      title.reset()
      author.reset()
      url.reset()
      props.showMessage('Error', 'No blog was added, something went wrong', 'error', 5000)
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog} data-cy='blog-form'>
        <Form.Group widths='equal'>
          <Form.Field data-cy='blog-title'>Title: <input {...title.attributes} /> </Form.Field>
          <Form.Field data-cy='blog-author'>Author: <input {...author.attributes} /></Form.Field>
          <Form.Field data-cy='blog-url'>Url: <input {...url.attributes} /> </Form.Field>
        </Form.Group>
        <Form.Field control={Button} content='Create' style={{ marginBottom: 10 }}/>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  showMessage,
  createBlog
}

const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm