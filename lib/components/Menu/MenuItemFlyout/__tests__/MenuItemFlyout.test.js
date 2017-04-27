import React from 'react'
import keycode from 'keycode'
import { MenuItemFlyout, MenuItem } from '../../../Menu'

describe('<MenuItemFlyout />', function () {
  const testbed = new Testbed(
    <MenuItemFlyout label="test">
      <MenuItem>Foo</MenuItem>
      <MenuItem>Bar</MenuItem>
      <MenuItem>Baz</MenuItem>
    </MenuItemFlyout>
  )

  function testShowFlyoutOnEvent (event) {
    it(`should show flyout menu on ${event.type} ${keycode(event.code) || ''}`, function () {
      const subject = testbed.render()

      subject.find('button').simulate(event.type, event.code)
      testbed.tick()

      expect(subject.ref('_menu')).to.be.present
    })
  }

  function testFocusFlyoutOnEvent (expected, event) {
    it(`expect flyout menu focus to be ${expected} on ${event.type} ${keycode(event.code) || ''}`, function () {
      const subject = testbed.render()

      subject.find('button').simulate(event.type, event.code)
      testbed.tick()

      expect(subject.ref('_menu').focused()).to.equal(expected)
    })
  }

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  testShowFlyoutOnEvent({type: 'click'})
  testShowFlyoutOnEvent({type: 'mouseOver'})
  testShowFlyoutOnEvent({type: 'keyDown', code: { keyCode: keycode.codes.right }})
  testShowFlyoutOnEvent({type: 'keyUp', code: { keyCode: keycode.codes.space }})
  testShowFlyoutOnEvent({type: 'keyDown', code: { keyCode: keycode.codes.enter }})

  testFocusFlyoutOnEvent(true, {type: 'click'})
  testFocusFlyoutOnEvent(true, {type: 'keyDown', code: { keyCode: keycode.codes.right }})
  testFocusFlyoutOnEvent(true, {type: 'keyUp', code: { keyCode: keycode.codes.space }})
  testFocusFlyoutOnEvent(true, {type: 'keyDown', code: { keyCode: keycode.codes.enter }})
  testFocusFlyoutOnEvent(false, {type: 'mouseOver'})

  it('it should not open the flyout when disabled', function () {
    const subject = testbed.render({
      disabled: true
    })

    subject.find('button').simulate('click')
    testbed.tick()

    expect(subject.ref('_menu').length).to.equal(0)
  })

  it('it should close the menu flyout on escape press', function () {
    const subject = testbed.render()

    subject.find('button').simulate('click')
    testbed.tick()

    subject.ref('_menu').simulate('keyDown', {keyCode: keycode.codes.esc})
    testbed.tick()

    expect(subject.ref('_menu').length).to.equal(0)
  })

  it('it should close the menu flyout on left press', function () {
    const subject = testbed.render()

    subject.find('button').simulate('click')
    testbed.tick()

    subject.ref('_menu').simulate('keyDown', {keyCode: keycode.codes.left})
    testbed.tick()

    expect(subject.ref('_menu').length).to.equal(0)
  })

  it('it should call onClose on tab press', function () {
    const onClose = testbed.spy()
    const subject = testbed.render({
      onClose
    })

    subject.find('button').simulate('click')
    testbed.tick()

    subject.ref('_menu').simulate('keyDown', {keyCode: keycode.codes.tab})
    testbed.tick()

    expect(onClose).to.have.been.called.once
  })

  it('it should call onSelect when flyout option is selected', function () {
    const onSelect = testbed.spy()
    const subject = testbed.render({
      onSelect
    })

    subject.find('button').simulate('click')
    testbed.tick()

    const menuItem = subject.ref('_menu').find('MenuItem').first()
    menuItem.simulate('click')
    testbed.tick()

    expect(onSelect).to.have.been.called.once
  })

  it('it should call onToggle on click', function () {
    const onToggle = testbed.spy()
    const subject = testbed.render({
      onToggle
    })
    subject.find('button').simulate('click')
    expect(onToggle).to.have.been.called.once
  })

  it('it should call onMouseOver on hover', function () {
    const onMouseOver = testbed.spy()
    const subject = testbed.render({
      onMouseOver
    })
    subject.find('button').simulate('mouseOver')
    expect(onMouseOver).to.have.been.called.once
  })
})
