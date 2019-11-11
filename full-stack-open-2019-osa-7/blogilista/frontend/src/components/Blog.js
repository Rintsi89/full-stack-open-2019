import React from 'react'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import { List, Button, Icon, Label } from 'semantic-ui-react'
import { like } from '../reducers/blogReducer'
import { showMessage } from '../reducers/notificationReducer'

const Blog = (props) => {

  const blog = props.blog

  if ( blog === undefined) {
    return null
  }

  const addLike = async (blog) => {
    try {
      const likedBlog =  { ...blog, likes: blog.likes + 1 }
      props.like(blog.id, likedBlog)
      props.showMessage(`Added 1 like for ${blog.title} by ${blog.author}`, 'success', 5000)
    } catch (exception) {
      props.showMessage('No like was added, something went wrong', 'error', 5000)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <List>
        <List.Item icon='book' content={blog.title} />
        <List.Item icon='linkify'content={<a href={blog.url}>{blog.url}</a>}/>
        <List.Item icon='user circle' content={blog.author} />
        <Button data-cy='blog-like-button' as='div' labelPosition='right' onClick={() => addLike(blog)}>
          <Button icon>
            <Icon name='heart' />
          Like
          </Button>
          <Label as='a' basic pointing='left' data-cy='blog-likes'>
            {blog.likes}
          </Label>
        </Button>
      </List>
      <h4>Comments</h4>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}><i>{comment}</i></li>
        )}
      </ul>
      <CommentForm blog={blog}/>
    </div>
  )
}

const mapDispatchToProps = {
  like,
  showMessage
}

const ConnectedBlog = connect(
  null,
  mapDispatchToProps
)(Blog)


export default ConnectedBlog