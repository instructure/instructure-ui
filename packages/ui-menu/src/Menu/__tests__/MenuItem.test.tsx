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

import { MenuItem } from '@instructure/ui-menu/latest'
import type { MenuItemProps } from '@instructure/ui-menu/latest'

interface ExtendedMenuItemProps extends MenuItemProps {
  to: string
}

const ExtendedMenuItem: React.FC<ExtendedMenuItemProps> = ({ ...props }) => {
  return <MenuItem {...props} />
}

describe('<MenuItem />', () => {
  it('should render', async () => {
    await render(<MenuItem>Menu Item Text</MenuItem>)
    const menuItem = page.getByText('Menu Item Text').element()

    expect(menuItem).toBeInTheDocument()
  })

  it('should render as a link when an href is provided', async () => {
    await render(<MenuItem href="example.html">Menu Item Text</MenuItem>)

    const menuItem = page.getByRole('menuitem').element()

    expect(menuItem).toBeInTheDocument()
    expect(menuItem).toHaveAttribute('href', 'example.html')
  })

  it('should render as a link when a to is provided', async () => {
    await render(<ExtendedMenuItem to="/example">Hello</ExtendedMenuItem>)

    const menuItem = page.getByRole('menuitem').element()

    expect(menuItem).toHaveAttribute('to', '/example')
  })

  it('should call onSelect after click', async () => {
    const onSelect = vi.fn()
    await render(
      <MenuItem onSelect={onSelect} value="foo">
        Hello
      </MenuItem>
    )
    const menuItem = page.getByRole('menuitem').element()

    fireEvent.click(menuItem)

    expect(onSelect).toHaveBeenCalledWith(
      expect.any(Object),
      'foo',
      true,
      expect.any(Object)
    )
  })

  it('should call onClick after click', async () => {
    const onClick = vi.fn()
    await render(
      <MenuItem onClick={onClick} value="foo">
        Hello
      </MenuItem>
    )
    const menuItem = page.getByRole('menuitem').element()

    fireEvent.click(menuItem)

    expect(onClick).toHaveBeenCalled()
  })

  it('should set the tabIndex attribute', async () => {
    await render(<MenuItem>Hello</MenuItem>)
    const menuItem = page.getByRole('menuitem').element()

    expect(menuItem).toHaveAttribute('tabIndex', '-1')
  })

  it('should set the aria-controls attribute', async () => {
    await render(<MenuItem controls="testId">Hello</MenuItem>)
    const menuItem = page.getByRole('menuitem').element()

    expect(menuItem).toHaveAttribute('aria-controls', 'testId')
  })

  it('should set the aria-disabled attribute', async () => {
    await render(<MenuItem disabled>Hello</MenuItem>)
    const menuItem = page.getByRole('menuitem').element()

    expect(menuItem).toHaveAttribute('aria-disabled', 'true')
  })

  it('should set the aria-checked attribute when defaultSelected prop is true', async () => {
    await render(
      <MenuItem type="checkbox" defaultSelected>
        Hello
      </MenuItem>
    )
    const menuItem = page.getByRole('menuitemcheckbox').element()

    expect(menuItem).toHaveAttribute('aria-checked', 'true')
  })

  it('should set the aria-checked attribute when selected prop is true', async () => {
    await render(
      <MenuItem type="checkbox" selected onSelect={vi.fn()}>
        Hello
      </MenuItem>
    )
    const menuItem = page.getByRole('menuitemcheckbox').element()

    expect(menuItem).toHaveAttribute('aria-checked', 'true')
  })

  it('should default to the "menuitem" role', async () => {
    const { container } = await render(<MenuItem>Menu Item Text</MenuItem>)
    const menuItem = container.querySelector("span[class$='-menuItem']")

    expect(menuItem).toHaveAttribute('role', 'menuitem')
  })

  it('should set the role to "menuitemcheckbox" when the type is "checkbox"', async () => {
    const { container } = await render(
      <MenuItem type="checkbox">Hello</MenuItem>
    )
    const menuItem = container.querySelector("span[class$='-menuItem']")

    expect(menuItem).toHaveAttribute('role', 'menuitemcheckbox')
  })

  it('should set the role to "menuitemradio" when the type is "radio"', async () => {
    const { container } = await render(<MenuItem type="radio">Hello</MenuItem>)
    const menuItem = container.querySelector("span[class$='-menuItem']")

    expect(menuItem).toHaveAttribute('role', 'menuitemradio')
  })

  describe('Component tests', () => {
    it('should call onSelect after SPACE key is pressed', async () => {
      const onSelect = vi.fn()
      await render(
        <MenuItem onSelect={onSelect} value="menu_item_value">
          Menu Item Text
        </MenuItem>
      )
      const menuItem = page.getByRole('menuitem').element() as HTMLElement

      menuItem.focus()
      await userEvent.keyboard(' ')

      expect(onSelect).toHaveBeenCalledOnce()
      expect(onSelect.mock.calls[0][1]).toEqual('menu_item_value')
      expect(onSelect.mock.calls[0][2]).toEqual(true)

      await userEvent.keyboard(' ')

      expect(onSelect).toHaveBeenCalledTimes(2)
      expect(onSelect.mock.calls[1][1]).toEqual('menu_item_value')
      expect(onSelect.mock.calls[1][2]).toEqual(false)
    })

    it('should call onSelect after ENTER key is pressed', async () => {
      const onSelect = vi.fn()
      await render(
        <MenuItem onSelect={onSelect} value="menu_item_value">
          Menu Item Text
        </MenuItem>
      )
      const menuItem = page.getByRole('menuitem').element() as HTMLElement

      menuItem.focus()
      await userEvent.keyboard('{Enter}')

      expect(onSelect).toHaveBeenCalledOnce()
      expect(onSelect.mock.calls[0][1]).toEqual('menu_item_value')
      expect(onSelect.mock.calls[0][2]).toEqual(true)

      await userEvent.keyboard('{Enter}')

      expect(onSelect).toHaveBeenCalledTimes(2)
      expect(onSelect.mock.calls[1][1]).toEqual('menu_item_value')
      expect(onSelect.mock.calls[1][2]).toEqual(false)
    })

    it('should not be able to select when the disabled prop is set', async () => {
      const onSelect = vi.fn()
      await render(
        <MenuItem onSelect={onSelect} disabled>
          Menu Item Text
        </MenuItem>
      )
      const menuItem = page.getByRole('menuitem').element() as HTMLElement

      expect(menuItem).toHaveAttribute('aria-disabled', 'true')

      // a real click can't be sent to the disabled item, so dispatch the event
      fireEvent.click(menuItem, { button: 0, detail: 1 })
      menuItem.focus()
      await userEvent.keyboard('{Enter}')
      await userEvent.keyboard(' ')

      expect(onSelect).not.toHaveBeenCalled()
    })
  })
})
