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

import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import '@testing-library/jest-dom'
import { Badge } from '../index'
import type { BadgeProps } from '../props'

const TEST_STRING = 'test'
const renderBadge = (props: Partial<BadgeProps> = { count: 100 }) => {
  return render(
    <Badge {...props}>
      <button type="button">{TEST_STRING}</button>
    </Badge>
  )
}

describe('<Badge />', () => {
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

  it('should be accessible', async () => {
    const { container } = renderBadge()
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should show the count', () => {
    const { container } = renderBadge({ count: 100 })

    expect(container).toHaveTextContent('100')
  })

  it('should truncate the count via countUntil', async () => {
    renderBadge({ count: 100, countUntil: 100 })

    const truncatedCount = await screen.findByText('99 +')

    expect(truncatedCount).toBeVisible()
  })

  it('should change position based on the placement prop', () => {
    const countOffset = '5px'
    const { container } = renderBadge({
      placement: 'bottom start',
      themeOverride: { countOffset }
    })
    const badge = container.querySelector('[class*=block][class*=badge]')
    const badgeStyle = badge && getComputedStyle(badge)
    expect(badge).not.toBeNull()
    expect(badgeStyle).not.toBeNull()
    expect(badgeStyle).toHaveProperty('bottom')
    expect(badgeStyle).toHaveProperty('bottom', 'calc(-5px)')
    expect(badgeStyle).toHaveProperty('inset-inline-start', 'calc(-1 * 5px)')
  })

  it('should not render a wrapper for a standalone Badge', () => {
    const { container } = renderBadge({ as: 'li', standalone: true })
    const liElement = container.querySelector('li')

    expect(liElement).toBeNull()
  })

  it('should render a wrapper for a NONE standalone Badge', () => {
    const { container } = renderBadge({ as: 'li', standalone: false })
    const liElement = container.querySelector('li')

    expect(liElement).not.toBeNull()
  })

  it('should change its output via the formatOutput prop', () => {
    const formatOutput = (formattedCount: string) => {
      return `${formattedCount}!`
    }

    renderBadge({ count: 15, formatOutput })
    const badgeElement = screen.getByText('15!')

    expect(badgeElement).toBeInTheDocument()
  })

  it('should render button child correctly', () => {
    const { container } = renderBadge()
    const childBtnElement = container.querySelector('button')

    expect(childBtnElement).toBeInTheDocument()
    expect(container).toHaveTextContent(TEST_STRING)
  })

  it('should call elementRef function', () => {
    const refMock = vi.fn()
    const { container } = renderBadge({ elementRef: refMock })

    expect(refMock).toHaveBeenCalledWith(container.firstChild)
  })

  it('should show the count when type is count', () => {
    const { container } = renderBadge({ count: 100, type: 'count' })

    expect(container).toHaveTextContent('100')
  })

  it('should NOT show the count when type is notification', () => {
    const { container } = renderBadge({ count: 100, type: 'notification' })

    expect(container).not.toHaveTextContent('100')
  })
})
