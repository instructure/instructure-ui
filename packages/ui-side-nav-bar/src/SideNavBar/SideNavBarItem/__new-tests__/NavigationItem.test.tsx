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
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { IconAdminLine } from '@instructure/ui-icons'
import { SideNavBarItem } from '../index'

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
    const { container } = render(
      <SideNavBarItem icon={<IconAdminLine />} label="Admin" href="#" />
    )
    const navItem = screen.getByRole('link')
    const icon = container.querySelector('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('name', 'IconAdmin')

    expect(navItem).toBeInTheDocument()
    expect(navItem.tagName).toBe('A')
    expect(navItem).toHaveAttribute('href', '#')
    expect(navItem).toHaveTextContent('Admin')
  })

  it('should meet a11y standards', async () => {
    const { container } = render(
      <SideNavBarItem icon={<IconAdminLine />} label="Dashboard" href="#" />
    )
    const axeCheck = await runAxeCheck(container)

    expect(axeCheck).toBe(true)
  })
})
