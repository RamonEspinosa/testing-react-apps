// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import * as geolocationMock from 'react-use-geolocation'
import Location from '../../examples/location'

let setFakePosition;
const useFakePosition = () => {
  const [fakePosition, dispatch] = React.useState(null)
  setFakePosition = dispatch
  return [fakePosition, false]
}

jest.mock('react-use-geolocation', () => {
  return {useCurrentPosition: useFakePosition}
})

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 420.69,
      longitude: 25, // it is funnier than 24
    },
  }
  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setFakePosition(fakePosition)
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/Latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/Longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
