import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('No blogs are shown if user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.login-form')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('All blogs are shown when user is logged in', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name:
       'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.getAllByText('logout')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
  })
})