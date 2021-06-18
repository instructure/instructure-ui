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
import {
  expect,
  mount,
  unmount,
  stub,
  wait,
  accessible,
  spy,
  wrapQueryResult
} from '@instructure/ui-test-utils'

import { Menu, MenuItem, MenuItemSeparator } from '../index'

import { MenuLocator } from '../MenuLocator'

describe('<Menu />', async () => {
  describe('without a trigger', async () => {
    it('should render', async () => {
      await mount(
        <Menu label="Settings">
          <MenuItem>Account</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Settings)')

      expect(menu).to.exist()
    })

    it('should meet a11y standards', async () => {
      await mount(
        <Menu label="Settings">
          <MenuItem>Account</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Settings)')

      expect(await menu.accessible()).to.be.true()
    })

    it('should not allow invalid children', async () => {
      const cs = spy(console, 'error')
      const warning = 'Warning: Failed prop type: Expected one of '

      await mount(
        <Menu>
          <div />
        </Menu>
      )
      expect(cs).to.have.been.calledWithMatch(warning)
    })

    it('should call onSelect when menu item is selected', async () => {
      const onSelect = stub()

      await mount(
        <Menu label="Settings" onSelect={onSelect}>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Settings)')
      const item = await menu.findItem(':label(Account)')

      await item.click()

      expect(onSelect).to.have.been.calledOnce()
      expect(onSelect.getCall(0).args[1]).to.equal('Account')
    })

    it('should not call onSelect when disabled', async () => {
      const onSelect = stub()

      await mount(
        <Menu label="Settings" onSelect={onSelect} disabled>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Settings)')
      const item = await menu.findItem(':label(Account)')

      await item.click(null, { clickable: false })

      expect(onSelect).to.not.have.been.called()
    })

    it('should move focus properly', async () => {
      await mount(
        <Menu label="Settings">
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Settings)')
      const items = await menu.findAllItems()

      await menu.keyDown('up')

      expect(items[items.length - 1].containsFocus()).to.be.true()

      await menu.keyDown('down')

      expect(items[0].containsFocus()).to.be.true()
    })

    it('should provide a menu ref', async () => {
      const menuRef = stub()

      await mount(
        <Menu label="Settings" menuRef={menuRef}>
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = await MenuLocator.find(':label(Settings)')
      expect(menuRef).to.have.been.calledWith(menu.getDOMNode())
    })

    it('should set aria attributes properly', async () => {
      await mount(
        <Menu disabled label="Settings">
          <MenuItem value="Account">Account</MenuItem>
        </Menu>
      )
      const menu = await MenuLocator.find(':label(Settings)')
      expect(menu.getAttribute('aria-disabled')).to.exist()
      expect(menu.getAttribute('aria-label')).to.exist()
    })
  })

  describe('with a trigger', async () => {
    it('should render into a mountNode', async () => {
      const mountNode = document.createElement('div')

      document.body.appendChild(mountNode)

      await mount(
        <Menu
          defaultShow
          mountNode={mountNode}
          label="Settings"
          trigger={<button>Settings</button>}
        >
          <MenuItem>Account</MenuItem>
        </Menu>
      )

      expect(mountNode.innerText).to.equal('Account')

      document.body.removeChild(mountNode)
    })

    it('should set aria attributes properly', async () => {
      await mount(
        <Menu trigger={<button>Settings</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: string; type: "radio"; defaultCh... Remove this comment to see the full error message */}
          <MenuItem type="radio" defaultChecked>
            Default (Grid view)
          </MenuItem>
          <MenuItem type="radio">Individual (List view)</MenuItem>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: string; type: "checkbox"; defaul... Remove this comment to see the full error message */}
          <MenuItem type="checkbox" defaultChecked>
            Include Anchor Standards
          </MenuItem>
          <MenuItemSeparator />
          <MenuItem>Open grading history...</MenuItem>
        </Menu>
      )

      const subject = await MenuLocator.find(':label(Settings)')
      const trigger = await subject.findPopoverTrigger()

      const popover = await subject.findPopoverContent()
      const menu = await popover.find(`[role="menu"]`)

      expect(menu).to.exist()
      expect(menu.getAttribute('aria-labelledby')).to.equal(
        trigger.getAttribute('id')
      )
    })

    it('should call onFocus on focus', async () => {
      const onFocus = stub()

      await mount(
        <Menu trigger={<button>More</button>} onFocus={onFocus}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find()
      const trigger = await menu.find(':label(More)')

      await trigger.focus()

      expect(onFocus).to.have.been.called()
    })

    it('should render when show and onToggle props are set', async () => {
      await mount(
        <Menu trigger={<button>More</button>} show onToggle={() => {}}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find()
      const trigger = await menu.findPopoverTrigger(':label(More)')
      const popover = await menu.findPopoverContent()

      expect(trigger).to.exist()
      expect(popover).to.exist()
    })

    it('should not show by default', async () => {
      await mount(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find()
      const trigger = await menu.findPopoverTrigger(':label(More)')
      const popover = await menu.findPopoverContent({ expectEmpty: true })

      expect(trigger).to.exist()
      expect(popover).to.not.exist()
    })

    it('should accept a default show', async () => {
      await mount(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(More)')
      const popover = await menu.findPopoverContent()

      expect(popover).to.exist()
    })

    it('should provide a menu ref', async () => {
      const menuRef = stub()

      await mount(
        <Menu trigger={<button>More</button>} defaultShow menuRef={menuRef}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const subject = await MenuLocator.find(':label(More)')
      const popover = await subject.findPopoverContent()
      const menu = await popover.find(`[role="menu"]`)

      expect(menuRef).to.have.been.calledWith(menu.getDOMNode())
    })

    it('should provide a popoverRef ref', async () => {
      const popoverRef = stub()

      await mount(
        <Menu
          trigger={<button>More</button>}
          defaultShow
          popoverRef={popoverRef}
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      expect(popoverRef).to.have.been.called()
    })

    it('should focus the menu first', async () => {
      await mount(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const subject = await MenuLocator.find(':label(More)')
      const popover = await subject.findPopoverContent()
      const menu = await popover.find(`[role="menu"]`)

      await wait(() => {
        expect(menu.focused()).to.be.true()
        expect(menu.getAttribute('tabIndex')).to.equal('0')
      })

      await menu.keyDown('down')

      await wait(() => {
        expect(menu.focused()).to.be.false()
        expect(menu.getAttribute('tabIndex')).to.equal('0')
      })
    })

    it('should apply offset values to Popover', async () => {
      const getTransforms = (transform: string) => {
        const transformValues = transform.match(/([\d])\w*/g)!.slice(-2)
        return {
          transformX: parseInt(transformValues[0]),
          transformY: parseInt(transformValues[1])
        }
      }
      await mount(
        <Menu trigger={<button>More</button>} defaultShow>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const subject = await MenuLocator.find(':label(More)')
      const popover = await subject.findPopoverContent()

      // offset props influence the transform CSS prop of the Popover
      const defaultTransform = getComputedStyle(popover.getDOMNode()).transform
      const { transformX: defaultTransformX, transformY: defaultTransformY } =
        getTransforms(defaultTransform)

      await unmount()

      await mount(
        <Menu
          trigger={<button>More</button>}
          defaultShow
          offsetX={-10}
          offsetY="30px"
        >
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const subject2 = await MenuLocator.find(':label(More)')
      const popover2 = await subject2.findPopoverContent()

      const newTransform = getComputedStyle(popover2.getDOMNode()).transform
      const { transformX: newTransformX, transformY: newTransformY } =
        getTransforms(newTransform)

      expect(newTransformX).to.equal(defaultTransformX + 10)
      expect(newTransformY).to.equal(defaultTransformY + 30)
    })

    it('should call onToggle on click', async () => {
      const onToggle = stub()

      await mount(
        <Menu trigger={<button>More</button>} onToggle={onToggle}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find()
      const trigger = await menu.findPopoverTrigger(':label(More)')

      await trigger.click()

      expect(onToggle).to.have.been.called()
    })

    it('should have an aria-haspopup attribute', async () => {
      await mount(
        <Menu trigger={<button>More</button>}>
          <MenuItem>Learning Mastery</MenuItem>
          <MenuItem disabled>Gradebook</MenuItem>
        </Menu>
      )

      const menu = await MenuLocator.find()
      const trigger = await menu.findPopoverTrigger(':label(More)')

      expect(trigger.getAttribute('aria-haspopup')).to.exist()
    })

    describe('for a11y', async () => {
      it('should meet standards when menu is closed', async () => {
        await mount(
          <Menu trigger={<button>More</button>}>
            <MenuItem>Learning Mastery</MenuItem>
            <MenuItem disabled>Gradebook</MenuItem>
          </Menu>
        )

        expect(await accessible()).to.be.true()
      })

      it('should meet standards when menu is open', async () => {
        await mount(
          <Menu trigger={<button>More</button>} defaultShow>
            <MenuItem>Learning Mastery</MenuItem>
            <MenuItem disabled>Gradebook</MenuItem>
          </Menu>
        )

        expect(await accessible()).to.be.true()
      })
    })
  })

  describe('with a sub-menu', async () => {
    describe('...and keyboard and mouse interaction', async () => {
      testShowFlyoutOnEvent({ type: 'click' })
      testShowFlyoutOnEvent({ type: 'mouseOver' })
      testShowFlyoutOnEvent({ type: 'keyDown', which: 'right' })
      testShowFlyoutOnEvent({ type: 'keyUp', which: 'space' })
      testShowFlyoutOnEvent({ type: 'keyDown', which: 'enter' })

      testFocusFlyoutOnEvent({ type: 'click' })
      testFocusFlyoutOnEvent({ type: 'keyDown', which: 'right' })
      testFocusFlyoutOnEvent({ type: 'keyUp', which: 'space' })
      testFocusFlyoutOnEvent({ type: 'keyDown', which: 'enter' })
    })

    it('it should not open the sub-menu popover when disabled', async () => {
      await mount(
        <Menu label="Parent" disabled>
          <Menu label="Flyout">
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.click(null, { clickable: false })

      const subMenu = await MenuLocator.find(':label(Flyout)')
      const popover = await subMenu.findPopoverContent({ expectEmpty: true })

      expect(popover).to.not.exist()
    })

    it('it should close the sub-menu popover on escape press', async () => {
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.click()

      const subMenu = await MenuLocator.find(':label(Flyout)')
      const popover = await subMenu.findPopoverContent()

      await wait(() => {
        expect(popover.containsFocus()).to.be.true()
      })

      await popover.keyUp('escape', {
        defaultPrevented: false,
        bubbles: true,
        button: 0
      })

      expect(
        await (
          await MenuLocator.find(':label(Flyout)')
        ).findPopoverContent({
          expectEmpty: true
        })
      ).to.not.exist()
    })

    it('it should close the sub-menu popover on left press', async () => {
      await mount(
        <Menu label="Parent">
          <Menu label="Flyout">
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.click()

      const subMenu = await MenuLocator.find(':label(Flyout)')
      const popover = await subMenu.findPopoverContent()

      await wait(() => {
        expect(popover.containsFocus()).to.be.true()
      })

      await popover.keyDown('left')

      expect(
        await subMenu.findPopoverContent({ expectEmpty: true })
      ).to.not.exist()
    })

    it('it should call onDismiss on tab press', async () => {
      const onDismiss = stub()

      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onDismiss={onDismiss}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.click()

      const subMenu = await MenuLocator.find(':label(Flyout)')
      const popover = await subMenu.findPopoverContent()

      await wait(() => {
        expect(popover.containsFocus()).to.be.true()
      })

      await popover.keyDown('tab')

      expect(onDismiss).to.have.been.calledOnce()
    })

    it('it should call onSelect when sub-menu popover option is selected', async () => {
      const onSelect = stub()

      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onSelect={onSelect}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.click()

      const subMenu = await MenuLocator.find(':label(Flyout)')
      const popover = await subMenu.findPopoverContent()

      await wait(() => {
        expect(popover.containsFocus()).to.be.true()
      })

      const menuItem = await popover.findItem(':label(Foo)')

      await menuItem.click()

      expect(onSelect).to.have.been.calledOnce()
    })

    it('it should call onToggle on document click and on dismiss', async () => {
      const onToggle = stub()

      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onToggle={onToggle}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.click()

      expect(onToggle).to.have.been.calledOnce()
      expect(onToggle.getCall(0).args[0]).to.equal(true)

      const subMenu = await MenuLocator.find(':label(Flyout)')
      const popover = await subMenu.findPopoverContent()

      await wait(() => {
        expect(popover.containsFocus()).to.be.true()
      })

      await (
        wrapQueryResult(trigger.getOwnerDocument().documentElement) as any
      ).click()

      expect(onToggle).to.have.been.calledTwice()
      expect(onToggle.getCall(1).args[0]).to.equal(false)
    })

    it('it should call onMouseOver on hover', async () => {
      const onMouseOver = stub()

      /* eslint-disable jsx-a11y/mouse-events-have-key-events */

      await mount(
        <Menu label="Parent">
          <Menu label="Flyout" onMouseOver={onMouseOver}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <MenuItem>Baz</MenuItem>
          </Menu>
        </Menu>
      )
      /* eslint-enable jsx-a11y/mouse-events-have-key-events */

      const menu = await MenuLocator.find(':label(Parent)')
      const trigger = await menu.findItem(':label(Flyout)')

      await trigger.mouseOver()

      expect(onMouseOver).to.have.been.calledOnce()
    })
  })
})

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
function testShowFlyoutOnEvent(event) {
  it(`should show flyout menu on ${event.type} ${
    event.which || ''
  }`, async () => {
    await mount(
      <Menu label="Parent">
        <Menu label="Flyout">
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </Menu>
      </Menu>
    )

    const menu = await MenuLocator.find(':label(Parent)')
    const trigger = await menu.findItem(':label(Flyout)')

    await trigger[event.type](event.which)

    const subMenu = await MenuLocator.find(':label(Flyout)')
    const popover = await subMenu.findPopoverContent()

    expect(popover).to.exist()
  })
}

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
function testFocusFlyoutOnEvent(event) {
  it(`expect flyout menu to be focused on ${event.type} ${
    event.which || ''
  }`, async () => {
    await mount(
      <Menu label="Parent">
        <Menu label="Flyout">
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </Menu>
      </Menu>
    )

    const menu = await MenuLocator.find(':label(Parent)')
    const trigger = await menu.findItem(':label(Flyout)')

    await trigger[event.type](event.which)

    const subMenu = await MenuLocator.find(':label(Flyout)')
    const popover = await subMenu.findPopoverContent()

    await wait(() => {
      expect(popover.containsFocus()).to.be.true()
    })
  })
}
