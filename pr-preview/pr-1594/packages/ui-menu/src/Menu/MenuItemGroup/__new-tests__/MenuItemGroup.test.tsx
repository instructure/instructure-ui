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

import { MenuItem } from '../../MenuItem'
import { MenuItemSeparator } from '../../MenuItemSeparator'
import { MenuItemGroup } from '../index'

describe('<MenuItemGroup />', () => {
  it('should render', () => {
    const { container } = render(
      <MenuItemGroup label="Menu Label">
        <MenuItem>Item Text 1</MenuItem>
        <MenuItem>Item Text 2</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const group = container.querySelector("[id*='MenuItemGroup_']")
    const groupMenu = screen.getByRole('menu')

    expect(group).toBeInTheDocument()
    expect(group).toHaveTextContent('Menu Label')

    expect(groupMenu).toBeInTheDocument()
    expect(groupMenu).toHaveTextContent('Item Text 1')
    expect(groupMenu).toHaveTextContent('Item Text 2')
  })

  it('should set the role to "menu"', () => {
    const { container } = render(
      <MenuItemGroup label="Select one">
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItemGroup = container.querySelector(
      "[class*='menuItemGroup__items']"
    )

    expect(menuItemGroup).toHaveAttribute('role', 'menu')
  })

  it('should set the list item role to "none"', () => {
    render(
      <MenuItemGroup label="Select one">
        <MenuItem>Food</MenuItem>
        <MenuItem>Bar</MenuItem>
      </MenuItemGroup>
    )
    const menu = screen.getByRole('menu')
    const menuListItem = menu.firstChild as HTMLElement

    expect(menuListItem.tagName).toBe('LI')
    expect(menuListItem).toHaveAttribute('role', 'none')
  })

  it('should default to children with type "radio"', () => {
    render(
      <MenuItemGroup label="Select one">
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = screen.getAllByRole('menuitemradio')

    expect(menuItems).toHaveLength(2)
  })

  it('should render children with type "checkbox" if allowMultiple is true', () => {
    render(
      <MenuItemGroup label="Select a few" allowMultiple>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = screen.getAllByRole('menuitemcheckbox')

    expect(menuItems).toHaveLength(2)
  })

  it('should set aria-disabled', () => {
    render(
      <MenuItemGroup label="Select one" disabled>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menu = screen.getByRole('menu')
    const menuItems = screen.getAllByRole('menuitemradio')

    expect(menu).toHaveAttribute('aria-disabled', 'true')
    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-disabled', 'true')
    expect(menuItems[1]).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set selected from defaultSelected prop', () => {
    render(
      <MenuItemGroup label="Select one" defaultSelected={[1]}>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = screen.getAllByRole('menuitemradio')

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'false')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('should set selected from selected prop', () => {
    render(
      <MenuItemGroup label="Select one" onSelect={vi.fn()} selected={[1]}>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = screen.getAllByRole('menuitemradio')

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'false')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('should set selected from children', () => {
    render(
      <MenuItemGroup label="Select a few" allowMultiple>
        <MenuItem key="foo" defaultSelected>
          Foo
        </MenuItem>
        <MenuItem key="bar" selected onSelect={vi.fn()}>
          Bar
        </MenuItem>
      </MenuItemGroup>
    )
    const menuItems = screen.getAllByRole('menuitemcheckbox')

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'true')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('should honor the allowMultiple prop (defaults to false)', () => {
    render(
      <MenuItemGroup label="Select one">
        <MenuItem defaultSelected>Foo</MenuItem>
        <MenuItem selected onSelect={vi.fn()}>
          Bar
        </MenuItem>
      </MenuItemGroup>
    )
    const menuItems = screen.getAllByRole('menuitemradio')

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'true')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'false')
  })

  it('calls onSelect when items are selected', () => {
    const onSelect = vi.fn()
    render(
      <MenuItemGroup label="Select one" onSelect={onSelect} selected={[1]}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItem = screen.getByText('Item 1')

    fireEvent.click(menuItem)

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect.mock.calls[0][1]).toEqual([0])
    expect(onSelect.mock.calls[0][2]).toEqual(true)
  })

  it('does not call onSelect when disabled', () => {
    const onSelect = vi.fn()
    render(
      <MenuItemGroup label="Select one" onSelect={onSelect} disabled>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItem = screen.getByText('Item 1')

    fireEvent.click(menuItem)

    expect(onSelect).not.toHaveBeenCalled()
  })
})
