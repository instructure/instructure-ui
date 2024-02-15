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
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { Popover } from '@instructure/ui-popover'
import { Menu, MenuItem, MenuItemSeparator } from '../index'


describe('<Menu />', () => {
  describe('without a trigger', () => {
    it('should render', async () => {
      render(
        <Menu label="Menu-label-text">
          <MenuItem>Menu Item Text</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveTextContent('Menu Item Text')
      expect(menu).toHaveAttribute('aria-label', 'Menu-label-text')
    })

    it('should meet a11y standards', async () => {
      const { container } = render(
        <Menu label="Menu-label-text">
          <MenuItem>Menu Item Text</MenuItem>
        </Menu>
      )

      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should call onSelect when menu item is selected', async () => {
      const onSelect = jest.fn()

      const { getByText } = render(
        <Menu label="Settings" onSelect={onSelect}>
          <MenuItem value="Test">Test Item</MenuItem>
        </Menu>
      )
      const item = getByText('Test Item')

      await userEvent.click(item)

      expect(onSelect).toHaveBeenCalled()
      expect(onSelect.mock.calls[0][1]).toEqual('Test')
    })

    it('should not call onSelect when disabled', () => {
      const onSelect = jest.fn()

      const { getByText } = render(
        <Menu label="Settings" onSelect={onSelect} disabled>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      // At line 329 - A11 Check find this rendered element
      screen.debug(document.body) 

      const item = getByText('Account')

      userEvent.click(item)

      expect(onSelect).not.toHaveBeenCalled()
    })

    it('should provide a menu ref', () => {
      const menuRef = jest.fn()

      render(
        <Menu label="Settings" menuRef={menuRef}>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menuRef).toHaveBeenLastCalledWith(menu)
    })

    it('should set aria attributes properly', async () => {
      render(
        <Menu disabled label="Settings">
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menu).toHaveAttribute('aria-disabled', 'true')
      expect(menu).toHaveAttribute('aria-label', 'Settings')
    })
  })

  describe('with a trigger', () => {
    it('should render into a mountNode', () => {
      const mountNode = document.createElement('div')

      document.body.appendChild(mountNode)

      render(
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

    it('should set aria attributes properly', () => {
      render(
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
      const menu = screen.getByRole('menu')
      const trigger = screen.getByRole('button', { name: 'Settings' })

      expect(menu).toBeInTheDocument()
      expect(menu).toHaveAttribute('aria-labelledby', trigger.getAttribute('id'))
    })

    it('should call onFocus on focus', () => {
      const onFocus = jest.fn()

      const { getByRole } = render(
        <Menu trigger={<button>More</button>} onFocus={onFocus}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const triggerButton = getByRole('button', { name: 'More' })

      fireEvent.focus(triggerButton)
  
      expect(onFocus).toHaveBeenCalled()
    })

    it('should render when show and onToggle props are set', () => {
      const { getByRole, getAllByRole, queryByText } = render(
        <Menu trigger={<button>More</button>} show onToggle={() => {}}>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const menuItems = getAllByRole('menuitem')
      const triggerButton = getByRole('button', { name: 'More' })

      const menuItem1 = queryByText('Test1')
      const menuItem2 = queryByText('Test2')

      expect(triggerButton).toBeInTheDocument()
      expect(menuItems).toHaveLength(2)
      expect(menuItem1).toBeInTheDocument()
      expect(menuItem2).toBeInTheDocument()
    })

    it('should not show by default', () => {
      const { queryByText, getByRole } = render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const triggerButton = getByRole('button', { name: 'More' })

      const menuItem1 = queryByText('Test1')
      const menuItem2 = queryByText('Test2')

      expect(triggerButton).toBeInTheDocument()
      expect(menuItem1).not.toBeInTheDocument()
      expect(menuItem2).not.toBeInTheDocument()
    })

    it('should accept a default show', () => {
      const { queryByText, getByRole } = render(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Test1</MenuItem>
          <MenuItem disabled>Test2</MenuItem>
        </Menu>
      )
      const triggerButton = getByRole('button', { name: 'More' })

      const menuItem1 = queryByText('Test1')
      const menuItem2 = queryByText('Test2')

      expect(triggerButton).toBeInTheDocument()
       expect(menuItem1).toBeInTheDocument()
      expect(menuItem2).toBeInTheDocument()
    })

    it('should provide a menu ref', () => {
      const menuRef = jest.fn()

      render(
        <Menu trigger={<button>More</button>} defaultShow menuRef={menuRef}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const menu = screen.getByRole('menu')

      expect(menuRef).toHaveBeenCalledWith(menu)
    })

    it('should provide a popoverRef ref', () => {
      const popoverRef = jest.fn()

      render(
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

    it('should call onToggle on click', () => {
      const onToggle = jest.fn()

      render(
        <Menu trigger={<button>More</button>} onToggle={onToggle}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const trigger = screen.getByRole('button')

      fireEvent.click(trigger)

      expect(onToggle).toHaveBeenCalled()
    })

    it('should have an aria-haspopup attribute', () => {
      render(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const trigger = screen.getByRole('button')

      expect(trigger).toHaveAttribute('aria-haspopup')
    })

    it('should pass positionContainerDisplay prop to Popover', () => {
      let popoverRef: Popover | null = null
      render(
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

    describe('for a11y', () => {
      // TODO find solution (solution: moving this test to the top)
      // Unable to perform pointer interaction as the element inherits `pointer-events: none`
      // Error on: (rendered at line 77)  --> SPAN #MenuItem__label_3
      // Current rendered element:        --> SPAN #MenuItem__label_23
      it('should meet standards when menu is closed', async () => {
        const { container } = render(
          <div data-testid="menu">
            <Menu trigger={<button>More</button>}>
              <MenuItem>Item-1</MenuItem>
              <MenuItem>Item-2</MenuItem>
            </Menu>
          </div>
        )
      // const axeCheck = await runAxeCheck(container)
      // expect(axeCheck).toBe(true)
      // const menu = screen.getByTestId('menu')

        await act(async () => {
          await screen.getByRole('button').click()
        })
        await waitFor(async() => {
          expect(screen.getByText('Item-1')).toBeInTheDocument()
          screen.debug(document.body)

          const axeCheck = await runAxeCheck(container)
          expect(axeCheck).toBe(true)
        })
      })
    })
  })
})
