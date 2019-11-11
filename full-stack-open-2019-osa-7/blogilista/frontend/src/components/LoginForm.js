import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { useField } from '../hooks'
import { loginUser } from '../reducers/loginReducer'
import { showMessage } from '../reducers/notificationReducer'

const LoginForm = (props) => {

  const flexForm = { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }
  const margin = { margin: '0.5rem' }

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.attributes.value,
      password: password.attributes.value
    }

    try {
      await props.loginUser(credentials)
      username.reset()
      password.reset()
    } catch (exception) {
      props.showMessage('Wrong user name or password', 'error', 5000)
      username.reset()
      password.reset()
    }
  }

  return (
    <div>
      <Form onSubmit={handleLogin} data-cy="log-in-form">
        <Form.Group style={flexForm}>
          <h2 style={margin} data-cy="log-in">Log in to application</h2>
          <Form.Field style={margin} data-cy="username"> Username <input {...username.attributes} /></Form.Field>
          <Form.Field style={margin} data-cy="password"> Password <input {...password.attributes} /></Form.Field>
          <Form.Field style={margin} control={Button} content='Log In' />
        </Form.Group>
      </Form>
    </div>

  )
}

const mapDispatchToProps = {
  showMessage,
  loginUser
}

const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm

