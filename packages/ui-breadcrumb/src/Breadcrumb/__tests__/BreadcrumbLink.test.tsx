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
import { BreadcrumbLink } from '@instructure/ui-breadcrumb/latest'

const TEST_TEXT_01 = 'Account'
const TEST_LINK = 'http://instructure-test.com'
const TEST_TO = '/example'

describe('<BreadcrumbLink />', () => {
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

  it('should render an anchor tag when given a href prop', async () => {
    await render(
      <BreadcrumbLink href={TEST_LINK}>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const anchor = page.getByRole('link').element()

    expect(anchor).toHaveAttribute('href', TEST_LINK)
  })

  it('should render as a button and respond to onClick event', async () => {
    const onClick = vi.fn()

    await render(
      <BreadcrumbLink onClick={onClick}>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const button = page.getByRole('button')

    await userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should respond to mouseEnter event when provided with onMouseEnter prop', async () => {
    const onMouseEnter = vi.fn()

    await render(
      <BreadcrumbLink onMouseEnter={onMouseEnter} href={TEST_LINK}>
        {TEST_TEXT_01}
      </BreadcrumbLink>
    )
    const link = page.getByRole('link')
    await userEvent.hover(link)

    expect(onMouseEnter).toHaveBeenCalledTimes(1)
  })

  it('should allow to prop to pass through', async () => {
    const { container } = await render(
      <BreadcrumbLink to={TEST_TO}>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const link = container.querySelector('a')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('to', TEST_TO)
  })

  it('should not render a link when not given an href prop', async () => {
    const { container } = await render(
      <BreadcrumbLink>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const elementWithHref = container.querySelector('[href]')
    const anchor = container.querySelector('a')
    const span = container.querySelector('span')

    expect(elementWithHref).toBeNull()
    expect(anchor).toBeNull()
    expect(span).toBeInTheDocument()
    expect(span).toMatchTextContent(TEST_TEXT_01)
  })

  it('should not render a button when not given an onClick prop', async () => {
    const { container } = await render(
      <BreadcrumbLink>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const button = container.querySelector('button')
    const span = container.querySelector('span')

    expect(button).toBeNull()
    expect(span).toBeInTheDocument()
    expect(span).toMatchTextContent(TEST_TEXT_01)
  })

  describe('truncation', () => {
    const LONG_TEXT = 'A very long breadcrumb text that does not fit'

    it('should truncate long text with CSS and keep the full text in the DOM', async () => {
      const { container } = await render(
        <div style={{ width: '6rem' }}>
          <BreadcrumbLink href={TEST_LINK}>{LONG_TEXT}</BreadcrumbLink>
        </div>
      )
      const link = page.getByRole('link').element()
      const text = container.querySelector('a > span')!

      expect(link).toMatchTextContent(LONG_TEXT)
      expect(text).toHaveStyle('white-space: nowrap')
      expect(text).toHaveStyle('text-overflow: ellipsis')
      expect(text.scrollWidth).toBeGreaterThan(text.clientWidth)
    })

    it('should truncate long text next to an icon', async () => {
      const { container } = await render(
        <div style={{ width: '6rem' }}>
          <BreadcrumbLink
            href={TEST_LINK}
            renderIcon={<svg data-testid="icon" width="16" height="16" />}
          >
            {LONG_TEXT}
          </BreadcrumbLink>
        </div>
      )
      const link = page.getByRole('link').element()
      const text = container.querySelector('a > span:last-child')!
      const icon = page.getByTestId('icon').element()

      expect(text).toMatchTextContent(LONG_TEXT)
      expect(text.scrollWidth).toBeGreaterThan(text.clientWidth)
      expect(link.getBoundingClientRect().height).toBeLessThan(
        icon.getBoundingClientRect().height * 2
      )
    })

    it('should show the full text in a tooltip only when truncated', async () => {
      await render(
        <div>
          <div style={{ width: '6rem' }}>
            <BreadcrumbLink href={TEST_LINK}>{LONG_TEXT}</BreadcrumbLink>
          </div>
          <BreadcrumbLink href={TEST_LINK}>{TEST_TEXT_01}</BreadcrumbLink>
        </div>
      )
      const [truncatedLink, shortLink] = page.getByRole('link').all()

      await userEvent.hover(truncatedLink)
      await expect
        .element(page.getByRole('tooltip'))
        .toMatchTextContent(LONG_TEXT)

      await userEvent.unhover(truncatedLink)
      await expect.element(page.getByRole('tooltip')).not.toBeInTheDocument()

      await userEvent.hover(shortLink)
      await expect.element(page.getByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('should meet a11y standards as a link', async () => {
    const { container } = await render(
      <BreadcrumbLink href={TEST_LINK}>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should meet a11y standards as a span', async () => {
    const { container } = await render(
      <BreadcrumbLink>{TEST_TEXT_01}</BreadcrumbLink>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
