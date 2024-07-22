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
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

import { MenuItem } from '../index'
import type { MenuItemProps } from '../props'

interface ExtendedMenuItemProps extends MenuItemProps {
  to: string
}

const ExtendedMenuItem: React.FC<ExtendedMenuItemProps> = ({ ...props }) => {
  return <MenuItem {...props} />
}

describe('<MenuItem />', () => {
  it('should render', () => {
    render(<MenuItem>Menu Item Text</MenuItem>)
    const menuItem = screen.getByText('Menu Item Text')

    expect(menuItem).toBeInTheDocument()
  })

  it('should render as a link when an href is provided', () => {
    render(<MenuItem href="example.html">Menu Item Text</MenuItem>)

    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toBeInTheDocument()
    expect(menuItem).toHaveAttribute('href', 'example.html')
  })

  it('should render as a link when a to is provided', () => {
    render(<ExtendedMenuItem to="/example">Hello</ExtendedMenuItem>)

    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toHaveAttribute('to', '/example')
  })

  it('should call onSelect after click', () => {
    const onSelect = vi.fn()
    render(
      <MenuItem onSelect={onSelect} value="foo">
        Hello
      </MenuItem>
    )
    const menuItem = screen.getByRole('menuitem')

    fireEvent.click(menuItem)

    expect(onSelect).toHaveBeenCalledWith(
      expect.any(Object),
      'foo',
      true,
      expect.any(Object)
    )
  })

  it('should call onClick after click', () => {
    const onClick = vi.fn()
    render(
      <MenuItem onClick={onClick} value="foo">
        Hello
      </MenuItem>
    )
    const menuItem = screen.getByRole('menuitem')

    fireEvent.click(menuItem)

    expect(onClick).toHaveBeenCalled()
  })

  it('should set the tabIndex attribute', () => {
    render(<MenuItem>Hello</MenuItem>)
    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toHaveAttribute('tabIndex', '-1')
  })

  it('should set the aria-controls attribute', () => {
    render(<MenuItem controls="testId">Hello</MenuItem>)
    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toHaveAttribute('aria-controls', 'testId')
  })

  it('should set the aria-disabled attribute', () => {
    render(<MenuItem disabled>Hello</MenuItem>)
    const menuItem = screen.getByRole('menuitem')

    expect(menuItem).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set the aria-checked attribute when defaultSelected prop is true', () => {
    render(
      <MenuItem type="checkbox" defaultSelected>
        Hello
      </MenuItem>
    )
    const menuItem = screen.getByRole('menuitemcheckbox')

    expect(menuItem).toHaveAttribute('aria-checked', 'true')
  })

  it('should set the aria-checked attribute when selected prop is true', () => {
    render(
      <MenuItem type="checkbox" selected onSelect={vi.fn()}>
        Hello
      </MenuItem>
    )
    const menuItem = screen.getByRole('menuitemcheckbox')

    expect(menuItem).toHaveAttribute('aria-checked', 'true')
  })

  it('should default to the "menuitem" role', () => {
    const { container } = render(<MenuItem>Menu Item Text</MenuItem>)
    const menuItem = container.querySelector("span[class$='-menuItem']")

    expect(menuItem).toHaveAttribute('role', 'menuitem')
  })

  it('should set the role to "menuitemcheckbox" when the type is "checkbox"', () => {
    const { container } = render(<MenuItem type="checkbox">Hello</MenuItem>)
    const menuItem = container.querySelector("span[class$='-menuItem']")

    expect(menuItem).toHaveAttribute('role', 'menuitemcheckbox')
  })

  it('should set the role to "menuitemradio" when the type is "radio"', () => {
    const { container } = render(<MenuItem type="radio">Hello</MenuItem>)
    const menuItem = container.querySelector("span[class$='-menuItem']")

    expect(menuItem).toHaveAttribute('role', 'menuitemradio')
  })
})
