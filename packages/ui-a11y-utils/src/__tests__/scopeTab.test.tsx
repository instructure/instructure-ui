/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { scopeTab } from '../scopeTab'

const MOCK_EVENT = new KeyboardEvent('mockEvent', { shiftKey: false })
MOCK_EVENT.preventDefault = () => {}

describe('scopeTab', () => {
  it('should scope tab within container', () => {
    vi.useFakeTimers()

    render(
      <div>
        <div data-testid="container">
          <input data-testid="first" />
          <input data-testid="second" />
        </div>
      </div>
    )

    const container = screen.getByTestId('container')
    const first = screen.getByTestId('first')
    const second = screen.getByTestId('second')

    second.focus()

    expect(document.activeElement).toBe(second)

    act(() => {
      scopeTab(container, MOCK_EVENT as any)
      vi.runAllTimers()
    })

    expect(document.activeElement).toBe(first)

    vi.useRealTimers()
  })

  it('should not attempt scoping when no tabbable children', () => {
    vi.useFakeTimers()

    render(
      <div>
        <div data-testid="container">Hello</div>
        <input />
      </div>
    )

    const input = screen.getByRole('textbox')
    const container = screen.getByTestId('container')

    input.focus()

    act(() => {
      scopeTab(container, MOCK_EVENT as any)
      vi.runAllTimers()
    })

    expect(document.activeElement).toBe(input)

    vi.useRealTimers()
  })

  it('should execute callback when provided instead of default behavior', () => {
    vi.useFakeTimers()
    const cb = vi.fn()

    render(
      <div>
        <div data-testid="container">
          <input />
        </div>
      </div>
    )

    const input = screen.getByRole('textbox')
    const container = screen.getByTestId('container')

    input.focus()

    act(() => {
      scopeTab(container, MOCK_EVENT as any, cb)
      vi.runAllTimers()
    })

    expect(cb).toHaveBeenCalled()

    vi.useRealTimers()
  })
})
