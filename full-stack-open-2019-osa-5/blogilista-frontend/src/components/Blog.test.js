import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Testi blogi',
  author: 'Ville',
  url: 'www.google.fi',
  user: {
    username: 'Ville'
  }
}

const user = {
  username: 'Ville'
}

test('Renders initially one blog title and author', () => {

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.visible')
  expect(div).toHaveStyle('display: none')

})

test('Clicking the button opens full details', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} onClick={mockHandler}/>
  )

  const button = component.container.querySelector('.hidden')
  fireEvent.click(button)

  const div = component.container.querySelector('.hidden')
  expect(div).toHaveStyle('display: none')

})