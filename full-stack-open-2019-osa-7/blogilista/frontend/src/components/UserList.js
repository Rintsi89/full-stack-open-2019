import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const UserList = (props) => {

  // const userById = (id) => props.users.find(user => user.id === id)

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.username}</Link></Table.Cell>
              <Table.Cell> {user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUserList = connect(
  mapStateToProps
)(UserList)

export default ConnectedUserList