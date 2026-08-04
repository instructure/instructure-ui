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

import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { Tooltip } from '@instructure/ui-tooltip/latest'

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
    await render(
      <Tooltip renderTip="Hello">
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )
    const tip = page.getByRole('tooltip', { includeHidden: true }).element()

    expect(tip).toBeInTheDocument()
    expect(tip).toHaveTextContent('Hello')
  })

  it('should render children', async () => {
    await render(
      <Tooltip renderTip="Hello">
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )

    const tip = page.getByRole('tooltip', { includeHidden: true }).element()
    const trigger = page.getByTestId('trigger').element()

    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Hover or focus me')
    expect(trigger).toHaveAttribute('href', 'example.html')
    expect(tip).toHaveTextContent('Hello')
  })

  it('should have an aria-describedby attribute', async () => {
    await render(
      <Tooltip renderTip={<h2>Hello</h2>}>
        <a data-testid="trigger" href="example.html">
          Hover or focus me
        </a>
      </Tooltip>
    )
    const trigger = page.getByTestId('trigger').element()
    const tooltip = page.getByRole('tooltip', { includeHidden: true }).element()

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('should accept a function for renderTip', async () => {
    await render(
      <Tooltip renderTip={() => 'Hello'}>
        <a href="example.html">Hover or focus me</a>
      </Tooltip>
    )

    const content = page.getByText('Hello').element()

    expect(content).toBeInTheDocument()
  })

  describe('using as', () => {
    it('should render children', async () => {
      await render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const tip = page.getByRole('tooltip', { includeHidden: true }).element()
      const trigger = page.getByText('Hover or focus me').element()

      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute('href', 'example.html')
      expect(trigger.tagName).toBe('A')

      expect(tip).toBeInTheDocument()
      expect(tip).toHaveTextContent('Hello')
    })

    it('should have an aria-describedby attribute', async () => {
      await render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const trigger = page.getByText('Hover or focus me').element()
      const tooltip = page
        .getByRole('tooltip', { includeHidden: true })
        .element()

      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('should pass down the href attribute', async () => {
      await render(
        <Tooltip
          renderTip={<h2>Hello</h2>}
          placement="end"
          as="a"
          href="example.html"
        >
          Hover or focus me
        </Tooltip>
      )

      const link = page.getByText('Hover or focus me').element()

      expect(link).toHaveAttribute('href', 'example.html')
    })
  })

  describe('using children', () => {
    it('should call onClick of child', async () => {
      const onClick = vi.fn()

      await render(
        <Tooltip renderTip={<h2>Hello</h2>}>
          <button onClick={onClick}>Hover or focus me</button>
        </Tooltip>
      )

      const button = page.getByText('Hover or focus me')

      await userEvent.click(button)

      await vi.waitFor(() => {
        expect(onClick).toHaveBeenCalledTimes(1)
      })
    })
  })
})
