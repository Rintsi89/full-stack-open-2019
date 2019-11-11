import React from 'react'
import { Link } from 'react-router-dom'
import { like, remove } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Table, Label } from 'semantic-ui-react'
import { showMessage } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'

const BlogList = (props) => {

  // const removeBlog = async (blog) => {
  //   try {
  //     if (window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) {
  //       props.remove(blog.id)
  //       props.showMessage('Blog removed successfully', "success", 5000)
  //     }
  //   } catch (exception) {
  //     props.showMessage("No blog removed, something went wrong", "error", 5000)
  //   }
  // }

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell >Author</Table.HeaderCell>
            <Table.HeaderCell >Likes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell data-cy='new-blog-title'><Link to={`/blogs/${blog.id}`} data-cy='new-blog-link'>{blog.title}</Link></Table.Cell>
              <Table.Cell data-cy='new-blog-author'>{blog.author}</Table.Cell>
              <Table.Cell data-cy='new-blog-likes'><Label ribbon>{blog.likes}</Label></Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <BlogForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    logged_user: state.logged_user
  }
}

const mapDispatchToProps = {
  like,
  showMessage,
  remove
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList