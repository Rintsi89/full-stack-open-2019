/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { showMessage } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE':
    const id = action.data
    const blogToLike = state.find(blog => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : likedBlog)
  case 'COMMENT':
    const idOfCommented = action.data
    const blogToComment = state.find(blog => blog.id === idOfCommented)
    const oldComments = blogToComment.comments
    const newComments = oldComments.concat(action.comment)
    const commentedBlog = {
      ...blogToComment,
      comments: newComments
    }
    return state.map(blog => blog.id !== idOfCommented ? blog : commentedBlog)
  case 'REMOVE':
    const blogToRemoveId = action.data
    return state.filter(blog => blog.id !== blogToRemoveId)
  default:
    return state
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
    dispatch(showMessage(`A new blog ${newBlog.title} by ${newBlog.author} was added`, 'success', 5000))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const like = (id, newObject) => {
  return async dispatch => {
    const blog = await blogService.like(id, newObject)
    dispatch({
      type: 'LIKE',
      data: blog.id
    })
  }
}

export const createComment = (id, commentObject) => {
  return async dispatch => {
    const blog = await blogService.comment(id, commentObject)
    dispatch({
      type: 'COMMENT',
      data: blog.id,
      comment: commentObject.comment
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export default blogReducer