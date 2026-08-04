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
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Popover } from '@instructure/ui-popover/latest'
import { Menu, MenuItem, MenuItemSeparator } from '@instructure/ui-menu/latest'

describe('<Menu />', () => {
  let consoleWarningMock: ReturnType<typeof vi.spyOn>
  let consoleErrorMock: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
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

  describe('without a trigger', () => {
    it('should render', async () => {
      await render(
        <Menu label="Menu-label-text">
          <MenuItem>Menu Item Text</MenuItem>
        </Menu>
      )
      const menu = page.getByRole('menu').element()

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveTextContent('Menu Item Text')
      expect(menu).toHaveAttribute('aria-label', 'Menu-label-text')
    })

    it('should meet a11y standards', async () => {
      const { container } = await render(
        <Menu label="Menu-label-text">
          <MenuItem>Menu Item Text</MenuItem>
        </Menu>
      )

      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should meet standards when menu is closed', async () => {
      const { container } = await render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should meet standards when menu is open', async () => {
      await render(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      // while the menu is open the rest of the page is `aria-hidden`, so the
      // check runs on the portalled menu instead of the render container
      const menu = page.getByRole('menu').element() as HTMLElement
      const axeCheck = await runAxeCheck(menu)

      expect(axeCheck).toBe(true)
    })

    it('should call onSelect when menu item is selected', async () => {
      const onSelect = vi.fn()

      await render(
        <Menu label="Settings" onSelect={onSelect}>
          <MenuItem value="Test">Test Item</MenuItem>
        </Menu>
      )
      const item = page.getByText('Test Item').element()

      await userEvent.click(item)

      expect(onSelect).toHaveBeenCalled()
      expect(onSelect.mock.calls[0][1]).toEqual('Test')
    })

    it('should not call onSelect when disabled', async () => {
      const onSelect = vi.fn()

      await render(
        <Menu label="Settings" onSelect={onSelect} disabled>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const itemText = page.getByText('Account').element()
      const menu = page.getByRole('menu').element()
      const menuItem = page.getByRole('menuitem').element()

      expect(itemText).toBeInTheDocument()
      expect(menu).toHaveAttribute('aria-disabled', 'true')
      expect(menuItem).toHaveAttribute('aria-disabled', 'true')
    })

    it('should provide a menu ref', async () => {
      const menuRef = vi.fn()

      await render(
        <Menu label="Settings" menuRef={menuRef}>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = page.getByRole('menu').element()

      expect(menuRef).toHaveBeenLastCalledWith(menu)
    })

    it('should set aria attributes properly', async () => {
      await render(
        <Menu disabled label="Settings">
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = page.getByRole('menu').element()

      expect(menu).toHaveAttribute('aria-disabled', 'true')
      expect(menu).toHaveAttribute('aria-label', 'Settings')
    })
  })

  describe('with a trigger', () => {
    it('should render into a mountNode', async () => {
      const mountNode = document.createElement('div')

      document.body.appendChild(mountNode)

      await render(
        <Menu
          defaultShow
          mountNode={mountNode}
          label="Settings"
          trigger={<button>Settings</button>}
        >
          <MenuItem>Account</MenuItem>
        </Menu>
      )

      expect(mountNode).toHaveTextContent('Account')

      document.body.removeChild(mountNode)
    })

    it('should set aria attributes properly', async () => {
      const { container } = await render(
        <Menu trigger={<button>Settings</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
          <MenuItem type="radio" defaultChecked>
            Default (Grid view)
          </MenuItem>
          <MenuItem type="radio">Individual (List view)</MenuItem>
          <MenuItem type="checkbox" defaultChecked>
            Include Anchor Standards
          </MenuItem>
          <MenuItemSeparator />
          <MenuItem>Open grading history...</MenuItem>
        </Menu>
      )
      const menu = page.getByRole('menu').element()
      const trigger = container.querySelector('button')!

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveAttribute(
        'aria-labelledby',
        trigger.getAttribute('id')
      )
    })

    it('should call onFocus on focus', async () => {
      const onFocus = vi.fn()

      await render(
        <Menu trigger={<button>More</button>} onFocus={onFocus}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const triggerButton = page.getByRole('button', { name: 'More' }).element()

      ;(triggerButton as HTMLElement).focus()

      expect(onFocus).toHaveBeenCalled()
    })

    it('should render when show and onToggle props are set', async () => {
      const { container } = await render(
        <Menu trigger={<button>More</button>} show onToggle={() => {}}>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const menuItems = page.getByRole('menuitem').elements()
      const triggerButton = container.querySelector('button')!

      const menuItem1 = page.getByText('Test1').query()
      const menuItem2 = page.getByText('Test2').query()

      expect(triggerButton).toBeInTheDocument()
      expect(menuItems).toHaveLength(2)
      expect(menuItem1).toBeInTheDocument()
      expect(menuItem2).toBeInTheDocument()
    })

    it('should not show by default', async () => {
      await render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const triggerButton = page.getByRole('button', { name: 'More' }).element()

      const menuItem1 = page.getByText('Test1').query()
      const menuItem2 = page.getByText('Test2').query()

      expect(triggerButton).toBeInTheDocument()
      expect(menuItem1).not.toBeInTheDocument()
      expect(menuItem2).not.toBeInTheDocument()
    })

    it('should accept a default show', async () => {
      const { container } = await render(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const triggerButton = container.querySelector('button')!

      const menuItem1 = page.getByText('Test1').query()
      const menuItem2 = page.getByText('Test2').query()

      expect(triggerButton).toBeInTheDocument()
      expect(menuItem1).toBeInTheDocument()
      expect(menuItem2).toBeInTheDocument()
    })

    it('should provide a menu ref', async () => {
      const menuRef = vi.fn()

      await render(
        <Menu trigger={<button>More</button>} defaultShow menuRef={menuRef}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const menu = page.getByRole('menu').element()

      expect(menuRef).toHaveBeenCalledWith(menu)
    })

    it('should provide a popoverRef ref', async () => {
      const popoverRef = vi.fn()

      await render(
        <Menu
          trigger={<button>More</button>}
          defaultShow
          popoverRef={popoverRef}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      expect(popoverRef).toHaveBeenCalled()
    })

    it('should call onToggle on click', async () => {
      const onToggle = vi.fn()

      await render(
        <Menu trigger={<button>More</button>} onToggle={onToggle}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const trigger = page.getByRole('button').element()

      fireEvent.click(trigger)

      expect(onToggle).toHaveBeenCalled()
    })

    it('should have an aria-haspopup attribute', async () => {
      await render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const trigger = page.getByRole('button').element()

      expect(trigger).toHaveAttribute('aria-haspopup')
    })

    it('should pass positionContainerDisplay prop to Popover', async () => {
      let popoverRef: Popover | null = null
      await render(
        <Menu
          trigger={<button>More</button>}
          popoverRef={(e) => {
            popoverRef = e
          }}
          positionContainerDisplay="block"
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const popoverProps = popoverRef!.props

      expect(popoverProps.positionContainerDisplay).toBe('block')
    })
  })
})
