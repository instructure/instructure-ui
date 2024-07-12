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

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { Badge } from '@instructure/ui-badge'
import { IconAdminLine, IconDashboardLine } from '@instructure/ui-icons'
import { runAxeCheck } from '@instructure/ui-axe-check'

import { SideNavBar, SideNavBarItem } from '../index'

describe('<SideNavBar />', () => {
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
    const { container } = render(
      <SideNavBar
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize SideNavBar',
          minimizedLabel: 'Expand SideNavBar'
        }}
      >
        <SideNavBarItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
      </SideNavBar>
    )
    const nav = screen.getByRole('navigation')
    const icons = container.querySelectorAll('svg')

    expect(icons.length).toBe(2)
    expect(icons[0]).toHaveAttribute('name', 'IconDashboard')
    expect(icons[1]).toHaveAttribute('name', 'IconMoveStart')

    expect(nav).toBeInTheDocument()
    expect(nav.tagName).toBe('NAV')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    expect(nav).toHaveTextContent('Minimize SideNavBar')
  })

  it('should render a single semantic nav element', async () => {
    render(
      <SideNavBar
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize SideNavBar',
          minimizedLabel: 'Expand SideNavBar'
        }}
      >
        <SideNavBarItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
      </SideNavBar>
    )
    const nav = screen.getByRole('navigation')
    const navElements = screen.getAllByRole('listitem')

    expect(nav).toBeInTheDocument()
    expect(nav.tagName).toBe('NAV')
    expect(navElements.length).toBe(1)
    expect(navElements[0]).toHaveTextContent('Dashboard')
  })

  it('should render a semantic list for the nav content', async () => {
    render(
      <SideNavBar
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize SideNavBar',
          minimizedLabel: 'Expand SideNavBar'
        }}
      >
        <SideNavBarItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <SideNavBarItem
          icon={
            <Badge count={99}>
              <IconAdminLine />
            </Badge>
          }
          label="Inbox"
          href="#"
        />
      </SideNavBar>
    )
    const list = screen.getAllByRole('list')
    const navElements = screen.getAllByRole('listitem')

    expect(list[0].tagName).toBe('UL')
    expect(list.length).toBe(1)
    expect(navElements.length).toBe(2)
  })

  it('should switch aria-expanded when the Toggle SideNavBar button is clicked', async () => {
    render(
      <SideNavBar
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize SideNavBar',
          minimizedLabel: 'Expand SideNavBar'
        }}
      >
        <SideNavBarItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <SideNavBarItem
          icon={
            <Badge count={99}>
              <IconAdminLine />
            </Badge>
          }
          label="Inbox"
          href="#"
        />
      </SideNavBar>
    )
    const nav = screen.getByRole('navigation')
    const toggleBtn = screen.getByRole('button')

    expect(nav).toHaveTextContent('Minimize SideNavBar')
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true')

    userEvent.click(toggleBtn)

    await waitFor(() => {
      const updatedToggleBtn = screen.getByRole('button')
      const updatedNav = screen.getByRole('navigation')

      expect(updatedNav).toHaveTextContent('Expand SideNavBar')
      expect(updatedToggleBtn).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <SideNavBar
        label="Main navigation"
        toggleLabel={{
          expandedLabel: 'Minimize SideNavBar',
          minimizedLabel: 'Expand SideNavBar'
        }}
      >
        <SideNavBarItem
          icon={<IconDashboardLine />}
          label="Dashboard"
          href="#"
        />
        <SideNavBarItem
          icon={
            <Badge count={99}>
              <IconAdminLine />
            </Badge>
          }
          label="Inbox"
          href="#"
        />
      </SideNavBar>
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
