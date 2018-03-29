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
import keycode from 'keycode'
import findDOMNode from '@instructure/ui-utils/lib/dom/findDOMNode'

import Menu, { MenuItem, MenuItemSeparator, MenuItemGroup } from '../index'

describe('<Menu />', () => {
  const testbed = new Testbed(
    <Menu>
      <MenuItem>Default (Grid view)</MenuItem>
      <MenuItem value="foo">Learning Mastery</MenuItem>
      <MenuItem disabled>Individual (List view)</MenuItem>
      <MenuItem type="checkbox" value="bar">Toggle Me</MenuItem>
      <MenuItemSeparator />
      <Menu label="Flyout">
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItem>Baz</MenuItem>
      </Menu>
      <MenuItemGroup label="Select one">
        <MenuItem defaultSelected value="one">
          Select me
        </MenuItem>
        <MenuItem value="two">
          Or select me
        </MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItemGroup allowMultiple label="Select many">
        <MenuItem defaultSelected value="one">
          Select me
        </MenuItem>
        <MenuItem value="two">
          And select me
        </MenuItem>
        <MenuItem defaultSelected value="three">
          And me
        </MenuItem>
      </MenuItemGroup>
      <MenuItemSeparator />
      <MenuItem value="baz">Open grading history...</MenuItem>
    </Menu>
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })

  it('should not allow invalid children', () => {
    let error = false
    try {
      testbed.render({
        children: <div />
      })
    } catch (e) {
      error = true
    }

    expect(error).to.be.true
  })

  it('should call onSelect when menu item is selected', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should not call onSelect when disabled', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect,
      disabled: true
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.not.have.been.called
  })

  it('should move focus properly', () => {
    const subject = testbed.render()

    subject.instance().focus()

    subject.keyDown('up')

    expect(subject.instance().focusedIndex).to.equal(10)

    subject.keyDown('down')

    expect(subject.instance().focusedIndex).to.equal(0)
  })

  it('should provide a menu ref', () => {
    const menuRef = testbed.spy()
    const subject = testbed.render({
      menuRef
    })

    subject.find('button').click()
    testbed.tick()

    expect(menuRef).to.have.been.calledWith(subject.instance()._menu)
  })

  it('should call onKeyDown when menu item is selected', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should have focus index -1 by default', () => {
    const subject = testbed.render()
    expect(subject.instance().focusedIndex).to.equal(-1)
  })

  it('should focus the first menu item when menu only has one item', () => {
    const subject = testbed.render({
      children: <MenuItem>foo</MenuItem>
    })
    subject.simulate('focus')
    expect(subject.find('[role="menuitem"]').unwrap() === document.activeElement).to.be.true
  })

  it('should set aria attributes and title properly', () => {
    const subject = testbed.render({
      disabled: true,
      title: 'title'
    })
    expect(subject.getAttribute('aria-disabled')).to.exist
    expect(subject.getAttribute('title')).to.exist
  })
})

describe('<Menu trigger />', () => {
  const testbed = new Testbed(
    <Menu
      trigger={<button>More</button>}
    >
      <MenuItem>Learning Mastery</MenuItem>
      <MenuItem disabled>Gradebook</MenuItem>
      <MenuItem type="radio" defaultChecked>
        Default (Grid view)
      </MenuItem>
      <MenuItem type="radio">
        Individual (List view)
      </MenuItem>
      <Menu label="Flyout">
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItem>Baz</MenuItem>
      </Menu>
      <MenuItem type="checkbox" defaultChecked>
        Include Anchor Standards
      </MenuItem>
      <MenuItemSeparator />
      <MenuItem>Open grading history...</MenuItem>
    </Menu>
  )

  it('should set aria attributes properly', () => {
    const subject = testbed.render({
      defaultShow: true
    })
    expect(subject.instance()._menu.getAttribute('aria-labelledby')).to.exist
  })

  it('should render a <Popover />', () => {
    const subject = testbed.render()
    expect(subject.find('Popover').length).to.eql(1)
  })

  it('should call onFocus on focus', () => {
    const onFocus = testbed.stub()
    const subject = testbed.render({
      onFocus
    })

    subject.find('button').simulate('focus')

    expect(onFocus).to.have.been.called
  })

  it('should render when show and onToggle props are set', () => {
    const subject = testbed.render({
      show: true,
      onToggle: () => {}
    })

    expect(subject.instance()._menu).to.exist
  })

  it('should not show by default', () => {
    const subject = testbed.render()

    expect(subject.instance()._menu).to.not.exist
  })

  it('should accept a default show', () => {
    const subject = testbed.render({
      defaultShow: true
    })

    expect(subject.instance()._menu).to.exist
  })

  it('should provide a menu ref', () => {
    const menuRef = testbed.spy()
    const subject = testbed.render({
      defaultShow: true,
      menuRef
    })

    testbed.tick()

    expect(menuRef).to.have.been.calledWith(subject.instance()._menu)
  })

  it('should provide a popoverRef ref', () => {
    const popoverRef = testbed.spy()
    const subject = testbed.render({
      defaultShow: true,
      popoverRef
    })

    testbed.tick()

    expect(popoverRef).to.have.been.calledWith(subject.instance()._popover)
  })

  it('should focus the menu', () => {
    const subject = testbed.render({
      defaultShow: true
    })

    testbed.tick()

    expect(subject.instance()._menu === document.activeElement).to.be.true
  })

  it('should call onToggle on click', () => {
    const onToggle = testbed.stub()
    const subject = testbed.render({
      onToggle
    })

    subject.find('button').click()

    expect(onToggle).to.have.been.called
  })

  it('should have an aria-haspopup attribute', () => {
    const subject = testbed.render()
    const btnElem = subject.find('button')

    expect(btnElem.getAttribute('aria-haspopup')).to.equal('true')
  })

  describe('for a11y', () => {
    it('should meet standards when menu is closed', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should meet standards when menu is open', (done) => {
      const subject = testbed.render({
        defaultShow: true
      })

      testbed.tick()

      subject.should.be.accessible(done)
    })
  })
})

describe('<Menu flyout />', () => {
  const testbed = new Testbed(
    <Menu>
      <Menu label="Flyout">
        <MenuItem>Foo</MenuItem>
        <MenuItem>Bar</MenuItem>
        <MenuItem>Baz</MenuItem>
      </Menu>
    </Menu>
  )

  function findFlyout (subject) {
    return subject.instance()._activeSubMenu
  }

  function findFlyoutTrigger (subject) {
    return subject.find('button[aria-haspopup]')
  }

  function testShowFlyoutOnEvent (event) {
    it(`should show flyout menu on ${event.type} ${keycode(event.code) || ''}`, () => {
      const subject = testbed.render()

      findFlyoutTrigger(subject).simulate(event.type, event.code)
      testbed.tick()

      expect(findFlyout(subject).shown).to.be.true
    })
  }

  function testFocusFlyoutOnEvent (event) {
    it(`expect flyout menu to be focused on ${event.type} ${keycode(event.code) || ''}`, () => {
      const subject = testbed.render()

      findFlyoutTrigger(subject).simulate(event.type, event.code)
      testbed.tick()

      expect(findFlyout(subject).focused()).to.be.true
    })
  }


  testShowFlyoutOnEvent({type: 'click'})
  testShowFlyoutOnEvent({type: 'mouseOver'})
  testShowFlyoutOnEvent({type: 'keyDown', code: { keyCode: keycode.codes.right }})
  testShowFlyoutOnEvent({type: 'keyUp', code: { keyCode: keycode.codes.space }})
  testShowFlyoutOnEvent({type: 'keyDown', code: { keyCode: keycode.codes.enter }})

  testFocusFlyoutOnEvent({type: 'click'})
  testFocusFlyoutOnEvent({type: 'keyDown', code: { keyCode: keycode.codes.right }})
  testFocusFlyoutOnEvent({type: 'keyUp', code: { keyCode: keycode.codes.space }})
  testFocusFlyoutOnEvent({type: 'keyDown', code: { keyCode: keycode.codes.enter }})

  it('it should not open the flyout when disabled', () => {
    const subject = testbed.render({
      defaultShow: true,
      disabled: true
    })

    findFlyoutTrigger(subject).click()
    testbed.tick()

    expect(findFlyout(subject)).to.not.exist
  })

  it('it should close the menu flyout on escape press', () => {
    const subject = testbed.render({
      defaultShow: true
    })

    findFlyoutTrigger(subject).click()
    testbed.tick()

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')
    testbed.tick()

    expect(findFlyout(subject).shown).to.be.false
  })

  it('it should close the menu flyout on left press', () => {
    const subject = testbed.render()
    findFlyoutTrigger(subject).click()
    testbed.tick()

    const flyout = findFlyout(subject)
    Testbed.wrap(flyout._menu).dispatchNativeKeyboardEvent('keydown', 'left')
    testbed.tick()

    expect(flyout.shown).to.be.false
  })

  it('it should call onDismiss on tab press', () => {
    const onDismiss = testbed.spy()
    const subject = testbed.render({
      trigger: <button>More</button>,
      defaultShow: true,
      onDismiss
    })

    testbed.tick()

    findFlyoutTrigger(Testbed.wrap(subject.instance()._menu)).click()
    testbed.tick()

    const flyout = findFlyout(subject)
    Testbed.wrap(flyout._menu).dispatchNativeKeyboardEvent('keydown', 'tab')
    testbed.tick()

    expect(onDismiss).to.have.been.calledOnce
  })

  it('it should call onSelect when flyout option is selected', () => {
    const onSelect = testbed.spy()
    const subject = testbed.render({
      onSelect
    })

    findFlyoutTrigger(subject).click()
    testbed.tick()

    const flyout = findFlyout(subject)
    const menuItem = findDOMNode(flyout._menuItems[0])
    menuItem.click()
    testbed.tick()

    expect(onSelect).to.have.been.calledOnce
  })

  it('it should call onToggle on click and on dismiss', () => {
    const onToggle = testbed.spy()
    const subject = testbed.render({
      children: (
        <Menu onToggle={onToggle} label="flyout">
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </Menu>
      )
    })

    findFlyoutTrigger(subject).click()
    testbed.tick()

    expect(onToggle).to.have.been.calledOnce
    expect(onToggle.lastCall.args[0]).to.equal(true)

    testbed.wrapper.dispatchNativeKeyboardEvent('keyup', 'escape')
    testbed.tick()

    expect(onToggle).to.have.been.calledTwice
    expect(onToggle.lastCall.args[0]).to.equal(false)
  })

  it('it should call onMouseOver on hover', () => {
    const onMouseOver = testbed.spy()
    const subject = testbed.render({
      /* eslint-disable jsx-a11y/mouse-events-have-key-events */
      children: (
        <Menu onMouseOver={onMouseOver} label="flyout">
          <MenuItem>Foo</MenuItem>
          <MenuItem>Bar</MenuItem>
          <MenuItem>Baz</MenuItem>
        </Menu>
      )
      /* eslint-enable jsx-a11y/mouse-events-have-key-events */
    })
    findFlyoutTrigger(subject).mouseOver()

    expect(onMouseOver).to.have.been.calledOnce
  })
})
