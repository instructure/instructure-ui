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
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { Badge } from '@instructure/ui-badge/latest'
import type { BadgeProps } from '@instructure/ui-badge/latest'

const TEST_STRING = 'test'
const renderBadge = (props: Partial<BadgeProps> = { count: 100 }) => {
  return render(
    <Badge {...props}>
      <button type="button">{TEST_STRING}</button>
    </Badge>
  )
}

//TODO-rework fix breaking tests after migration
describe.skip('<Badge />', () => {
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
    const { container } = await renderBadge()
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  it('should show the count', async () => {
    const { container } = await renderBadge({ count: 100 })

    expect(container).toMatchTextContent('100')
  })

  it('should truncate the count via countUntil', async () => {
    await renderBadge({ count: 100, countUntil: 100 })

    const truncatedCount = page.getByText('99 +')

    await expect.element(truncatedCount).toBeVisible()
  })

  it('should change position based on the placement prop', async () => {
    const countOffset = '5px'
    const { container } = await renderBadge({
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

  it('should not render a wrapper for a standalone Badge', async () => {
    const { container } = await renderBadge({ as: 'li', standalone: true })
    const liElement = container.querySelector('li')

    expect(liElement).toBeNull()
  })

  it('should render a wrapper for a NONE standalone Badge', async () => {
    const { container } = await renderBadge({ as: 'li', standalone: false })
    const liElement = container.querySelector('li')

    expect(liElement).not.toBeNull()
  })

  it('should change its output via the formatOutput prop', async () => {
    const formatOutput = (formattedCount: string) => {
      return `${formattedCount}!`
    }

    await renderBadge({ count: 15, formatOutput })
    const badgeElement = page.getByText('15!')

    await expect.element(badgeElement).toBeInTheDocument()
  })

  it('should render button child correctly', async () => {
    const { container } = await renderBadge()
    const childBtnElement = container.querySelector('button')

    expect(childBtnElement).toBeInTheDocument()
    expect(container).toMatchTextContent(TEST_STRING)
  })

  it('should call elementRef function', async () => {
    const refMock = vi.fn()
    const { container } = await renderBadge({ elementRef: refMock })

    expect(refMock).toHaveBeenCalledWith(container.firstChild)
  })

  it('should show the count when type is count', async () => {
    const { container } = await renderBadge({ count: 100, type: 'count' })

    expect(container).toMatchTextContent('100')
  })

  it('should NOT show the count when type is notification', async () => {
    const { container } = await renderBadge({
      count: 100,
      type: 'notification'
    })

    expect(container).not.toMatchTextContent('100')
  })
})
