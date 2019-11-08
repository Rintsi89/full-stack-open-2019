import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { useField } from '../hooks'
import { showMessage } from '../reducers/notificationReducer'
import { createComment } from '../reducers/blogReducer'

const CommentForm = (props) => {

  const blog = props.blog

  const comment = useField('text', 'comment')

  const addComment = async (event) => {
    event.preventDefault()


    try {
      const commentObject = {
        [comment.attributes.name]: comment.attributes.value,
      }


      props.createComment(blog.id, commentObject)

      comment.reset()

      props.showMessage('New comment added!', 'success', 5000)
    } catch (exception) {

      comment.reset()
      props.showMessage('Error', 'No blog was added, something went wrong', 'error', 5000)
    }
  }

  return (
    <div>
      <Form onSubmit={addComment}>

        <Form.Field><input {...comment.attributes} /></Form.Field>
        <Form.Field control={Button} content='Comment' />
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  showMessage,
  createComment
}

const ConnectedCommentForm = connect(
  null,
  mapDispatchToProps
)(CommentForm)

export default ConnectedCommentForm