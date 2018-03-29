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
import Menu, { MenuItem } from '../../../Menu'

describe('<MenuItemFlyout />', () => {
  const testbed = new Testbed(
    <Menu>
      <Menu label="test">
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

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.exist
  })

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
        <Menu onToggle={onToggle} label="test">
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
        <Menu onMouseOver={onMouseOver} label="test">
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

  it('it should provide a ref to the flyout content', () => {
    const contentRef = testbed.spy()
    const subject = testbed.render({
      contentRef
    })

    subject.find('button').click()
    testbed.tick()

    expect(contentRef).to.have.been.calledWith(subject.ref('_menu').node)
  })
})
