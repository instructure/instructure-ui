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

import { fireEvent } from '@testing-library/dom'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { describe, it, expect, vi } from 'vitest'

import {
  MenuItem,
  MenuItemSeparator,
  MenuItemGroup
} from '@instructure/ui-menu/latest'

describe('<MenuItemGroup />', () => {
  it('should render', async () => {
    const { container } = await render(
      <MenuItemGroup label="Menu Label">
        <MenuItem>Item Text 1</MenuItem>
        <MenuItem>Item Text 2</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const group = container.querySelector("[class*='menuItemGroup']")
    expect(group).toBeInTheDocument()
    expect(group).toMatchTextContent('Menu Label')
    expect(group).toMatchTextContent('Item Text 1')
    expect(group).toMatchTextContent('Item Text 2')
  })

  it('should default to children with type "radio"', async () => {
    await render(
      <MenuItemGroup label="Select one">
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemradio').elements()

    expect(menuItems).toHaveLength(2)
  })

  it('should render children with type "checkbox" if allowMultiple is true', async () => {
    await render(
      <MenuItemGroup label="Select a few" allowMultiple>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemcheckbox').elements()

    expect(menuItems).toHaveLength(2)
  })

  it('should set aria-disabled', async () => {
    await render(
      <MenuItemGroup label="Select one" disabled>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemradio').elements()

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-disabled', 'true')
    expect(menuItems[1]).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set selected from defaultSelected prop', async () => {
    await render(
      <MenuItemGroup label="Select one" defaultSelected={[1]}>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemradio').elements()

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'false')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('should set selected from selected prop', async () => {
    await render(
      <MenuItemGroup label="Select one" onSelect={vi.fn()} selected={[1]}>
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemradio').elements()

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'false')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('should set selected from children', async () => {
    await render(
      <MenuItemGroup label="Select a few" allowMultiple>
        <MenuItem key="foo" defaultSelected>
          Foo
        </MenuItem>
        <MenuItem key="bar" selected onSelect={vi.fn()}>
          Bar
        </MenuItem>
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemcheckbox').elements()

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'true')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('should honor the allowMultiple prop (defaults to false)', async () => {
    await render(
      <MenuItemGroup label="Select one">
        <MenuItem defaultSelected>Foo</MenuItem>
        <MenuItem selected onSelect={vi.fn()}>
          Bar
        </MenuItem>
      </MenuItemGroup>
    )
    const menuItems = page.getByRole('menuitemradio').elements()

    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveAttribute('aria-checked', 'true')
    expect(menuItems[1]).toHaveAttribute('aria-checked', 'false')
  })

  it('calls onSelect when items are selected', async () => {
    const onSelect = vi.fn()
    await render(
      <MenuItemGroup label="Select one" onSelect={onSelect} selected={[1]}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItem = page.getByText('Item 1').element()

    fireEvent.click(menuItem)

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect.mock.calls[0][1]).toEqual([0])
    expect(onSelect.mock.calls[0][2]).toEqual(true)
  })

  it('does not call onSelect when disabled', async () => {
    const onSelect = vi.fn()
    await render(
      <MenuItemGroup label="Select one" onSelect={onSelect} disabled>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItemSeparator />
      </MenuItemGroup>
    )
    const menuItem = page.getByText('Item 1').element()

    fireEvent.click(menuItem)

    expect(onSelect).not.toHaveBeenCalled()
  })
  describe('Component tests', () => {
    it('updates the selected items when allowMultiple is true', async () => {
      const onSelect = vi.fn()
      await render(
        <MenuItemGroup label="Group Label" allowMultiple onSelect={onSelect}>
          <MenuItem>First Menu Item</MenuItem>
          <MenuItem>Second Menu Item</MenuItem>
          <MenuItemSeparator />
        </MenuItemGroup>
      )
      const checkboxes = () => page.getByRole('menuitemcheckbox').elements()

      await userEvent.click(page.getByText('First Menu Item'))

      expect(checkboxes()[0]).toHaveAttribute('aria-checked', 'true')
      expect(checkboxes()[1]).toHaveAttribute('aria-checked', 'false')
      expect(onSelect).toHaveBeenCalledOnce()
      expect(onSelect.mock.calls[0][1]).toEqual([0])
      expect(onSelect.mock.calls[0][2]).toEqual(true)

      await userEvent.click(page.getByText('Second Menu Item'))

      expect(checkboxes()[0]).toHaveAttribute('aria-checked', 'true')
      expect(checkboxes()[1]).toHaveAttribute('aria-checked', 'true')
      expect(onSelect).toHaveBeenCalledTimes(2)
      expect(onSelect.mock.calls[1][1]).toEqual([0, 1])
      expect(onSelect.mock.calls[1][2]).toEqual(true)

      await userEvent.click(page.getByText('First Menu Item'))

      expect(checkboxes()[0]).toHaveAttribute('aria-checked', 'false')
      expect(checkboxes()[1]).toHaveAttribute('aria-checked', 'true')
      expect(onSelect).toHaveBeenCalledTimes(3)
      expect(onSelect.mock.calls[2][1]).toEqual([1])
      expect(onSelect.mock.calls[2][2]).toEqual(false)
    })

    it('updates the selected items when allowMultiple is false', async () => {
      const onSelect = vi.fn()
      await render(
        <MenuItemGroup label="Group Label" onSelect={onSelect}>
          <MenuItem>First Menu Item</MenuItem>
          <MenuItem>Second Menu Item</MenuItem>
          <MenuItemSeparator />
        </MenuItemGroup>
      )
      const radios = () => page.getByRole('menuitemradio').elements()

      await userEvent.click(page.getByText('First Menu Item'))

      expect(radios()[0]).toHaveAttribute('aria-checked', 'true')
      expect(radios()[1]).toHaveAttribute('aria-checked', 'false')
      expect(onSelect).toHaveBeenCalledOnce()
      expect(onSelect.mock.calls[0][1]).toEqual([0])
      expect(onSelect.mock.calls[0][2]).toEqual(true)

      await userEvent.click(page.getByText('Second Menu Item'))

      expect(radios()[0]).toHaveAttribute('aria-checked', 'false')
      expect(radios()[1]).toHaveAttribute('aria-checked', 'true')
      expect(onSelect).toHaveBeenCalledTimes(2)
      expect(onSelect.mock.calls[1][1]).toEqual([1])
      expect(onSelect.mock.calls[1][2]).toEqual(true)
    })
  })
})
