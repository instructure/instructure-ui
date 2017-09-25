import React from 'react'
import keycode from 'keycode'
import { MenuItemFlyout, MenuItem } from '../../../Menu'

describe('<MenuItemFlyout />', () => {
  const testbed = new Testbed(
    <MenuItemFlyout label="test">
      <MenuItem>Foo</MenuItem>
      <MenuItem>Bar</MenuItem>
      <MenuItem>Baz</MenuItem>
    </MenuItemFlyout>
  )

  function testShowFlyoutOnEvent (event) {
    it(`should show flyout menu on ${event.type} ${keycode(event.code) || ''}`, () => {
      const subject = testbed.render()

      subject.find('button').simulate(event.type, event.code)
      testbed.tick()

      expect(subject.ref('_menu')).to.be.present
    })
  }

  function testFocusFlyoutOnEvent (expected, event) {
    it(`expect flyout menu focus to be ${expected} on ${event.type} ${keycode(event.code) || ''}`, () => {
      const subject = testbed.render()

      subject.find('button').simulate(event.type, event.code)
      testbed.tick()

      expect(subject.ref('_menu').focused()).to.equal(expected)
    })
  }

  it('should render', () => {
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

  it('it should not open the flyout when disabled', () => {
    const subject = testbed.render({
      disabled: true
    })

    subject.find('button').click()
    testbed.tick()

    expect(subject.ref('_menu').length).to.equal(0)
  })

  it('it should close the menu flyout on escape press', () => {
    const subject = testbed.render()

    subject.find('button').click()
    testbed.tick()

    subject.ref('_menu').keyUp('esc')
    testbed.tick()

    expect(subject.ref('_menu').length).to.equal(0)
  })

  it('it should close the menu flyout on left press', () => {
    const subject = testbed.render()

    subject.find('button').click()
    testbed.tick()

    subject.ref('_menu').keyDown('left')
    testbed.tick()

    expect(subject.ref('_menu').length).to.equal(0)
  })

  it('it should call onDismiss on tab press', () => {
    const onDismiss = testbed.spy()
    const subject = testbed.render({
      onDismiss
    })

    subject.find('button').click()
    testbed.tick()

    subject.ref('_menu').keyDown('tab')
    testbed.tick()

    expect(onDismiss).to.have.been.calledOnce
  })

  it('it should call onSelect when flyout option is selected', () => {
    const onSelect = testbed.spy()
    const subject = testbed.render({
      onSelect
    })

    subject.find('button').click()
    testbed.tick()

    const menuItem = subject.ref('_menu').find('MenuItem').first()

    menuItem.click()

    testbed.tick()

    expect(onSelect).to.have.been.calledOnce
  })

  it('it should call onToggle on click', () => {
    const onToggle = testbed.spy()
    const subject = testbed.render({
      onToggle
    })

    subject.find('button').click()

    expect(onToggle).to.have.been.calledOnce
  })

  it('it should call onMouseOver on hover', () => {
    const onMouseOver = testbed.spy()
    const subject = testbed.render({
      onMouseOver
    })
    subject.find('button').mouseOver()

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
