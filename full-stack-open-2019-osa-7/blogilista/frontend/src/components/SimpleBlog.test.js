import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('Renders correct content', () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Ville',
    likes: 10
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const titleAndAuthor = component.container.querySelector('.title-author')
  expect(titleAndAuthor).toHaveTextContent(
    'Testi blogi Ville'
  )

  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    'blog has 10 likes'
  )
})

test('Clicking the button twice works', async () => {
  const blog = {
    title: 'Testi blogi',
    author: 'Ville',
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})