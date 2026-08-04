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
import { IconUserLine } from '@instructure/ui-icons'
import { Billboard } from '@instructure/ui-billboard/latest'
import { runAxeCheck } from '@instructure/ui-axe-check'

const TEST_HEADING = 'test-heading'
const TEST_MESSAGE = 'test-message'
const TEST_LINK = 'http://instructure-test.com'
const TEST_HERO = () => <IconUserLine size={'medium'} />

describe('<Billboard />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
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

  it('should render', async () => {
    const { container } = await render(<Billboard />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should be accessible', async () => {
    const { container } = await render(
      <Billboard
        heading={TEST_HEADING}
        message={TEST_MESSAGE}
        hero={TEST_HERO}
      />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should render a heading with the correct tag', async () => {
    await render(<Billboard heading={TEST_HEADING} headingAs="h2" />)
    const heading = page.getByText(TEST_HEADING).element()

    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('renders as a link if it has an href prop', async () => {
    await render(<Billboard href={TEST_LINK} />)

    const link = page.getByRole('link').element()

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', TEST_LINK)
  })

  it('renders as a button and responds to onClick event', async () => {
    const onClick = vi.fn()

    await render(<Billboard onClick={onClick} />)

    await userEvent.click(page.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  describe('when rendering message', () => {
    it('should render message when passed a node', async () => {
      const messageNode = <span>{TEST_MESSAGE}</span>

      await render(<Billboard message={messageNode} />)
      const messageElement = page.getByText(TEST_MESSAGE).element()

      expect(messageElement).toBeInTheDocument()
      expect(messageElement.tagName).toBe('SPAN')
    })

    it('should render message passed a function', async () => {
      const messageNode = <span>{TEST_MESSAGE}</span>

      await render(<Billboard message={() => messageNode} />)
      const messageElement = page.getByText(TEST_MESSAGE).element()

      expect(messageElement).toBeInTheDocument()
      expect(messageElement.tagName).toBe('SPAN')
    })
  })

  describe('when disabled', () => {
    it('should apply aria-disabled to link', async () => {
      await render(<Billboard href={TEST_LINK} disabled={true} />)
      const link = page.getByRole('link').element()

      expect(link).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not be clickable', async () => {
      await render(<Billboard onClick={vi.fn()} disabled />)
      const button = page.getByRole('button').element()

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when readOnly', () => {
    it('should apply aria-disabled', async () => {
      await render(<Billboard href={TEST_LINK} readOnly />)
      const link = page.getByRole('link').element()

      expect(link).toHaveAttribute('aria-disabled', 'true')
    })

    it('should not be clickable', async () => {
      const onClick = vi.fn()

      await render(<Billboard onClick={onClick} readOnly />)

      // `force` because Playwright treats aria-disabled elements as disabled
      // and would otherwise refuse to click
      await userEvent.click(page.getByRole('button'), { force: true })

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('when passing down props to View', () => {
    it('should support an elementRef prop', async () => {
      const elementRef = vi.fn()

      await render(<Billboard elementRef={elementRef} href={TEST_LINK} />)
      const link = page.getByRole('link').element()

      expect(elementRef).toHaveBeenCalledWith(link)
    })

    it('should support an `as` prop', async () => {
      const { container } = await render(<Billboard as="em" />)
      const billboardAsEm = container.querySelector('em')

      expect(billboardAsEm).toBeInTheDocument()
      expect(billboardAsEm?.className).toMatch(/billboard/)
      expect(billboardAsEm?.className).toMatch(/view/)
    })
  })
})
