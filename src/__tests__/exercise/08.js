import * as React from 'react'
import useCounter from '../../components/use-counter'
import {renderHook, act} from '@testing-library/react-hooks'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(0)
})
test('allows customization of the initial count', () => {
  const initialCount = -45
  const {result} = renderHook(() => useCounter({initialCount}))
  expect(result.current.count).toBe(initialCount)
})
test('allows customization of the step', () => {
  const step = 5
  const initialCount = 10
  const {result} = renderHook(() => useCounter({initialCount, step}))
  expect(result.current.count).toBe(initialCount)
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(initialCount + step)
  act(() => {
    result.current.decrement()
  })
  expect(result.current.count).toBe(initialCount)
})

/* eslint no-unused-vars:0 */
