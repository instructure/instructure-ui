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

import { render, waitFor } from '@testing-library/react'
import { vi, expect } from 'vitest'
import type { MockInstance } from 'vitest'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Pages, Page } from '../index'

describe('<Pages />', () => {
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
    const { container } = render(
      <Pages>
        <Page>{() => 'Foo'}</Page>
        <Page>{() => 'Bar'}</Page>
      </Pages>
    )
    const pages = container.querySelector('div[id^="Pages_"]')

    expect(pages).toBeInTheDocument()
  })

  it('should render a Page', async () => {
    const { container } = render(
      <Pages>
        <Page>{() => 'Hello World'}</Page>
      </Pages>
    )
    const pages = container.querySelector('div[id^="Pages_"]')

    expect(pages).toHaveTextContent('Hello World')
  })

  it('should render the 0th Page by default', async () => {
    const { container } = render(
      <Pages>
        <Page>{() => 'Foo'}</Page>
        <Page>{() => 'Bar'}</Page>
      </Pages>
    )
    const pages = container.querySelector('div[id^="Pages_"]')

    expect(pages).toHaveTextContent('Foo')
  })

  it('should render the active Page', async () => {
    const { container } = render(
      <Pages activePageIndex={1} onPageIndexChange={() => {}}>
        <Page>{() => 'Foo'}</Page>
        <Page>{() => 'Bar'}</Page>
      </Pages>
    )
    const pages = container.querySelector('div[id^="Pages_"]')

    expect(pages).toHaveTextContent('Bar')
  })

  it('should pass history and navigateToPreviousPage to Page', async () => {
    const pageSpy = vi.fn()
    render(
      <Pages>
        <Page>{pageSpy}</Page>
      </Pages>
    )

    await waitFor(() => {
      const args = pageSpy.mock.calls[0]

      expect(pageSpy).toHaveBeenCalledTimes(1)
      expect(Array.isArray(args[0])).toEqual(true)
      expect(typeof args[1]).toBe('function')
    })
  })

  it('should fire onPageIndexChange event', async () => {
    const onPageIndexChange = vi.fn()

    const { container, rerender } = render(
      <Pages activePageIndex={0} onPageIndexChange={onPageIndexChange}>
        <Page key={0}>{() => 'Foo'}</Page>
        <Page key={1}>
          {(_history, navigate) => <button onClick={navigate}>Back</button>}
        </Page>
      </Pages>
    )

    // Set prop: activePageIndex
    rerender(
      <Pages activePageIndex={1} onPageIndexChange={onPageIndexChange}>
        <Page key={0}>{() => 'Foo'}</Page>
        <Page key={1}>
          {(_history, navigate) => <button onClick={navigate}>Back</button>}
        </Page>
      </Pages>
    )

    const button = container.querySelector('button')!

    userEvent.click(button)

    await waitFor(() => {
      expect(onPageIndexChange).toHaveBeenCalledTimes(1)
      expect(onPageIndexChange).toHaveBeenCalledWith(0, 1)
    })
  })
})
