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
import { render, cleanup } from 'vitest-browser-react'
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
      expect(menu).toMatchTextContent('Menu Item Text')
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

      expect(mountNode).toMatchTextContent('Account')

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

  describe('Component tests', () => {
    const flyoutTrigger = () => page.getByText('Flyout', { exact: true })
    const flyoutItem = () => page.getByText('Flyout Menu Item')
    const menuEl = () => document.querySelector<HTMLElement>('[role="menu"]')!

    // The Popover's FocusRegion can blur the menu shortly after mount, and a
    // real key event sent in that window lands on `body` instead of the menu.
    // So re-focus until the focus survives a frame.
    const focusMenu = async () => {
      await vi.waitFor(async () => {
        menuEl().focus()
        await new Promise((resolve) => requestAnimationFrame(resolve))
        expect(menuEl().contains(document.activeElement)).toBe(true)
      })
    }

    // Focus can still be stolen mid-sequence, which drops a move. Press, give
    // the focus time to land, and only press again if it never did — checking
    // too eagerly and re-pressing would overshoot the target instead.
    const navPress = async (key: string, target: () => Element) => {
      for (let attempt = 0; attempt < 5; attempt++) {
        if (document.activeElement === target()) {
          return
        }
        await userEvent.keyboard(key)
        try {
          await vi.waitFor(() => expect(target()).toHaveFocus(), {
            timeout: 500
          })
          return
        } catch {
          // the key event never landed, press it again
        }
      }
      expect(target()).toHaveFocus()
    }

    // Same for the flyout trigger: the key press only opens the sub-menu if
    // the trigger still has focus when it lands.
    const pressOnFlyoutTrigger = async (key: string) => {
      for (let attempt = 0; attempt < 5; attempt++) {
        ;(flyoutTrigger().element() as HTMLElement).focus()
        await userEvent.keyboard(key)
        try {
          await vi.waitFor(
            () => expect(flyoutItem().query()).toBeInTheDocument(),
            { timeout: 500 }
          )
          return
        } catch {
          // the key event never landed, press it again
        }
      }
      expect(flyoutItem().query()).toBeInTheDocument()
    }

    beforeEach(async () => {
      // let a previous test's pending focus return land before mounting, so it
      // can't steal focus into the menu under test
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    afterEach(async () => {
      // the Popover's FocusRegion schedules an async focus return on unmount,
      // let it drain so it can't disturb the next test's keyboard navigation
      cleanup()
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    it('should move focus properly', async () => {
      await render(
        <Menu label="Settings">
          <MenuItem value="Account">Item1</MenuItem>
          <MenuItem value="Account">Item2</MenuItem>
        </Menu>
      )
      const [item1, item2] = page.getByRole('menuitem').elements()

      // a focus return left over from a previous test can land on the freshly
      // mounted menu, so start from a known state
      ;(document.activeElement as HTMLElement | null)?.blur()

      expect(item1).not.toHaveFocus()
      expect(item2).not.toHaveFocus()
      await focusMenu()

      await navPress('{ArrowDown}', () => item1)
      await navPress('{ArrowDown}', () => item2)
      await navPress('{ArrowUp}', () => item1)
    })

    it('should focus the first menu item when the menu opens', async () => {
      await render(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )
      const menu = page.getByRole('menu').element()
      const [item1, item2] = page.getByRole('menuitem').elements()

      expect(menu).not.toHaveFocus()
      expect(menu).toHaveAttribute('tabIndex', '0')
      await vi.waitFor(() => expect(item1).toHaveFocus())
      expect(item1).toHaveAttribute('tabIndex', '-1')

      await navPress('{ArrowDown}', () => item2)
    })

    it('should apply offset values to Popover', async () => {
      const getTransforms = (transform: string) => {
        const transformValues = new DOMMatrixReadOnly(transform)
        return {
          transformX: Math.floor(transformValues.m41),
          transformY: Math.floor(transformValues.m42)
        }
      }
      await render(
        <Menu trigger={<button>Trigger</button>} offsetX={-10} offsetY="30px">
          <MenuItem>Menu Item</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      await userEvent.click(page.getByText('Trigger'))
      await expect.element(page.getByText('Menu Item')).toBeInTheDocument()

      // the un-offset menu sits at (20, 21) in this harness, so the -10/+30
      // offsets put it at (10, 51)
      await vi.waitFor(() => {
        const menu = document.querySelector<HTMLElement>(
          '[data-position-content^="Menu_"]'
        )!
        const { transformX, transformY } = getTransforms(
          getComputedStyle(menu).transform
        )

        expect(transformX).toEqual(10)
        expect(transformY).toEqual(51)
      })
    })

    it('should not open the sub-menu popover when disabled', async () => {
      await render(
        <Menu label="Parent" disabled>
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      // a real click can't be sent to the disabled menu item, so dispatch the
      // event
      fireEvent.click(flyoutTrigger().element(), { button: 0, detail: 1 })

      expect(flyoutItem().query()).not.toBeInTheDocument()
    })

    it('should close the sub-menu popover on escape press', async () => {
      await render(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()

      await userEvent.keyboard('{Escape}')

      await vi.waitFor(() =>
        expect(flyoutItem().query()).not.toBeInTheDocument()
      )
    })

    it('should close the sub-menu popover on left press', async () => {
      await render(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()

      await userEvent.keyboard('{ArrowLeft}')

      await vi.waitFor(() =>
        expect(flyoutItem().query()).not.toBeInTheDocument()
      )
    })

    it('should call onDismiss on tab press', async () => {
      const onDismiss = vi.fn()

      await render(
        <Menu label="Parent">
          <Menu label="Flyout" onDismiss={onDismiss}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()

      await userEvent.keyboard('{Tab}')

      await vi.waitFor(() =>
        expect(flyoutItem().query()).not.toBeInTheDocument()
      )
      expect(onDismiss).toHaveBeenCalled()
    })

    it('should call onSelect when sub-menu popover option is selected', async () => {
      const onSelect = vi.fn()

      await render(
        <Menu label="Parent">
          <Menu label="Flyout" onSelect={onSelect}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()

      await userEvent.click(flyoutItem())

      await vi.waitFor(() =>
        expect(flyoutItem().query()).not.toBeInTheDocument()
      )
      expect(onSelect).toHaveBeenCalled()
    })

    it('should call onToggle on document click and on dismiss', async () => {
      const onToggle = vi.fn()

      await render(
        <Menu label="Parent">
          <Menu label="Flyout" onToggle={onToggle}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()
      expect(onToggle).toHaveBeenCalledWith(true, expect.anything())

      onToggle.mockClear()

      await userEvent.click(document.body, { position: { x: 0, y: 0 } })

      await vi.waitFor(() =>
        expect(onToggle).toHaveBeenCalledWith(false, expect.anything())
      )
    })

    it('should call onMouseOver on hover', async () => {
      const onMouseOver = vi.fn()

      await render(
        <Menu label="Parent">
          <Menu label="Flyout" onMouseOver={onMouseOver}>
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()

      expect(onMouseOver).toHaveBeenCalled()
    })

    it('should show and focus flyout menu on click', async () => {
      await render(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await userEvent.hover(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()

      await userEvent.click(flyoutTrigger())
      await vi.waitFor(() =>
        expect(flyoutItem().query()).not.toBeInTheDocument()
      )

      await userEvent.click(flyoutTrigger())
      await expect.element(flyoutItem()).toBeVisible()
      await vi.waitFor(() =>
        expect(
          flyoutItem().element().closest('[role="menuitem"]')
        ).toHaveFocus()
      )
    })

    it('should show and focus flyout menu on right arrow keyDown', async () => {
      await render(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await pressOnFlyoutTrigger('{ArrowRight}')

      await vi.waitFor(() =>
        expect(
          flyoutItem().element().closest('[role="menuitem"]')
        ).toHaveFocus()
      )
    })

    it('should show and focus flyout menu on enter keyDown', async () => {
      await render(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      await pressOnFlyoutTrigger('{Enter}')

      await vi.waitFor(() =>
        expect(
          flyoutItem().element().closest('[role="menuitem"]')
        ).toHaveFocus()
      )
    })

    it('should focus flyout menu on mouseOver', async () => {
      await render(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Flyout Menu Item</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )
      ;(flyoutTrigger().element() as HTMLElement).focus()
      await userEvent.hover(flyoutTrigger())

      await expect.element(flyoutItem()).toBeVisible()
      await vi.waitFor(() =>
        expect(
          flyoutItem().element().closest('[role="menuitem"]')
        ).toHaveFocus()
      )
    })
  })
})
