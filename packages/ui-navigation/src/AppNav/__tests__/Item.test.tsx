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

import { runAxeCheck } from '@instructure/ui-axe-check'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { AppNavItem as Item } from '@instructure/ui-navigation/latest'

const icon = (
  <svg height="24" width="24">
    <title>Some icon</title>
    <circle cx="50" cy="50" r="40" />
  </svg>
)

describe('<AppNav.Item />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleWarningMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {}) as any
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleWarningMock.mockRestore()
    consoleErrorMock.mockRestore()
  })

  it('should render label text', async () => {
    await render(<Item renderLabel="Some label" href="#" />)
    const item = page.getByRole('link').element()

    expect(item).toHaveTextContent('Some label')
  })

  it('should render an icon/image/etc.', async () => {
    const { container } = await render(
      <Item
        renderIcon={icon}
        renderLabel={<ScreenReaderContent>Some label</ScreenReaderContent>}
        href="#"
      />
    )

    const iconTitle = container.querySelector('svg > title')
    const iconSvg = container.querySelector('svg')
    const item = page.getByRole('link').element()

    expect(iconTitle).toBeInTheDocument()
    expect(iconSvg).toBeInTheDocument()

    expect(iconSvg).toHaveTextContent('Some icon')
    expect(item).toHaveTextContent('Some label')
  })

  it('should render content after the label text to accommodate badges, etc.', async () => {
    await render(
      <Item
        renderLabel="Some label"
        href="#"
        renderAfter={<strong>I am rendered after!</strong>}
      />
    )
    const item = page.getByRole('link').element()
    const after = page.getByText('I am rendered after!').element()

    expect(item).toBeInTheDocument()
    expect(item).toHaveTextContent('Some label')

    expect(after).toBeInTheDocument()
    expect(after.tagName).toBe('STRONG')
  })

  it('should respond to an onClick event', async () => {
    const onClick = vi.fn()
    await render(<Item renderLabel="Some label" onClick={onClick} />)

    const button = page.getByRole('button')

    await userEvent.click(button)

    await vi.waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  it('should output a console error if icon is used with non-screenreader label text', async () => {
    await render(
      <Item
        renderIcon={icon}
        renderLabel="Some label"
        onClick={() => 'clicked'}
      />
    )

    const expectedErrorMessage =
      'Warning: [AppNav] If an icon is used, the label text should be wrapped in <ScreenReaderContent />.'

    expect(consoleErrorMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedErrorMessage),
      expect.any(String)
    )
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <Item
        renderIcon={icon}
        renderLabel={<ScreenReaderContent>Some label</ScreenReaderContent>}
        onClick={() => 'clicked'}
      />
    )

    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
