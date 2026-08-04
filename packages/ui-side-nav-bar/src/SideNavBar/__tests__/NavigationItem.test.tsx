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
import { ShieldUserInstUIIcon } from '@instructure/ui-icons'
import { SideNavBarItem } from '@instructure/ui-side-nav-bar/latest'

describe('<SideNavBarItem />', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution
    consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {}) as any
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render', async () => {
    const { container } = await render(
      <SideNavBarItem icon={<ShieldUserInstUIIcon />} label="Admin" href="#" />
    )
    const navItem = page.getByRole('link').element()
    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('name', 'ShieldUser')

    expect(navItem).toBeInTheDocument()
    expect(navItem.tagName).toBe('A')
    expect(navItem).toHaveAttribute('href', '#')
    expect(navItem).toHaveTextContent('Admin')
  })

  it('should meet a11y standards', async () => {
    const { container } = await render(
      <SideNavBarItem
        icon={<ShieldUserInstUIIcon />}
        label="Dashboard"
        href="#"
      />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })

  describe('Component tests', () => {
    it('should show a tooltip when the nav is minimized', async () => {
      const onClick = vi.fn()

      await render(
        <div data-testid="navBarItemWrapper" style={{ width: 300 }}>
          <SideNavBarItem
            icon={<ShieldUserInstUIIcon />}
            label="Admin"
            onClick={onClick}
            minimized={true}
          />
          <div data-testid="pointerParkingSpot" style={{ height: 200 }} />
        </div>
      )
      const tooltip = page.getByRole('tooltip', { includeHidden: true })

      await expect.element(tooltip).toHaveTextContent('Admin')

      // The real pointer stays wherever an earlier test left it, so it can
      // already sit on the nav item when this one renders and open the tooltip
      // on its own. Move it off the item first.
      await userEvent.hover(page.getByTestId('pointerParkingSpot'))
      await expect.element(tooltip).not.toBeVisible()

      await userEvent.hover(page.getByRole('button').element())

      await expect.element(tooltip).toBeVisible()
    })
  })
})
