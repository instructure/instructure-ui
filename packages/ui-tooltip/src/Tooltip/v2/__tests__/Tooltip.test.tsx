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

import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import type { MockInstance } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { Tooltip } from '../index'

describe('<Tooltip />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as MockInstance
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    render(
      <Tooltip renderTip="Hello">
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )
    const tip = screen.getByRole('tooltip')

    expect(tip).toBeInTheDocument()
    expect(tip).toHaveTextContent('Hello')
  })

  it('should render children', async () => {
    render(
      <Tooltip renderTip="Hello">
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    const tip = screen.getByRole('tooltip')
    const trigger = screen.getByTestId('trigger')

    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Hover or focus me')
    expect(trigger).toHaveAttribute('href', 'example.html')
    expect(tip).toHaveTextContent('Hello')
  })

  it('should have an aria-describedby attribute', async () => {
    render(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )
    const trigger = screen.getByTestId('trigger')
    const tooltip = screen.getByRole('tooltip')

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('should accept a function for renderTip', async () => {
    render(
      <Tooltip renderTip={() => 'Hello'}>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const content = screen.getByText('Hello')

    expect(content).toBeInTheDocument()
  })

  describe('using as', () => {
    it('should render children', async () => {
      render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const tip = screen.getByRole('tooltip')
      const trigger = screen.getByText('Hover or focus me')

      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('href', 'example.html')
      expect(trigger.tagName).toBe('A')

      expect(tip).toBeInTheDocument()
      expect(tip).toHaveTextContent('Hello')
    })

    it('should have an aria-describedby attribute', async () => {
      render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const trigger = screen.getByText('Hover or focus me')
      const tooltip = screen.getByRole('tooltip')

      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('should pass down the href attribute', async () => {
      render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const link = screen.getByText('Hover or focus me')

      expect(link).toHaveAttribute('href', 'example.html')
    })
  })

  describe('using children', () => {
    it('should call onClick of child', async () => {
      const onClick = vi.fn()

      render(
        <Tooltip renderTip={<h2>Hello</h2>}>
          <button onClick={onClick}>Hover or focus me</button>
        </Tooltip>
      )

      const button = screen.getByText('Hover or focus me')

      await userEvent.click(button)

      await waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
