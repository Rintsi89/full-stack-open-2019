import React from 'react'
import { Icon } from 'semantic-ui-react'

const User = ({ user }) => {

  if ( user === undefined) {
    return null
  }


  return (
    <div>
      <h2>{user.username}</h2>
      <Icon name='user circle' size='massive' />
      <h4>Added Blogs:</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
