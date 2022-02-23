// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

const getRandomUsername = f => f.internet.userName()
const getRandomPassword = f => f.internet.password()

const buildLoginForm = build('Login', {
  fields: {
    username: fake(getRandomUsername),
    password: fake(getRandomPassword),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const expectedData = buildLoginForm({
    overrides: {
      password: 'abc',
    },
  })
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', {
    name: /submit/i,
  })
  userEvent.type(username, expectedData.username)
  userEvent.type(password, expectedData.password)
  userEvent.click(submitButton)
  expect(handleSubmit).toHaveBeenCalledWith(expectedData)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
