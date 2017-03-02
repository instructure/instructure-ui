import React from 'react'
import PopoverMenu from '../index.js'
import { MenuItem, MenuItemGroup, MenuItemSeparator } from '../../Menu'

describe('<PopoverMenu />', () => {
  const testbed = new Testbed(
    <PopoverMenu label="More">
      <MenuItem>Learning Mastery</MenuItem>
      <MenuItem disabled>Gradebook</MenuItem>
      <MenuItem type="radio" defaultChecked>
        Default (Grid view)
      </MenuItem>
      <MenuItem type="radio">
        Individual (List view)
      </MenuItem>
      <MenuItem type="checkbox" defaultChecked>
        Include Anchor Standards
      </MenuItem>
      <MenuItemSeparator />
      <MenuItem>Open grading history...</MenuItem>
    </PopoverMenu>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render when show and onToggle', () => {
    const subject = testbed.render({
      show: true,
      onToggle: () => {}
    })

    expect(subject).to.be.present
  })

  it('should not show by default', function () {
    const subject = testbed.render()

    expect(subject.instance().show).to.be.false
  })

  it('should accept a default show', function () {
    const subject = testbed.render({
      defaultShow: true
    })

    expect(subject.instance().show).to.be.true
  })

  it('should provide content ref', function (done) {
    let content = null

    testbed.render({
      defaultShow: true,
      contentRef: (el) => {
        content = el
      }
    })

    testbed.sandbox.clock.restore()

    setTimeout(() => {
      expect(content).to.not.be.null
      done()
    }, 0)
  })

  it('should focus the first MenuItem', function () {
    let firstItem = null
    const menuItem = (
      <MenuItem ref={(c) => { firstItem = c }} value="itemOne">
        Item 1
      </MenuItem>
    )

    testbed.render({
      children: menuItem,
      defaultShow: true
    })

    expect(firstItem.focused).to.be.true
  })

  it('should focus the first MenuItem when contained in MenuItemGroup', function () {
    let firstItem = null
    const menuGroup = (
      <MenuItemGroup label="Select One">
        <MenuItem ref={(c) => { firstItem = c }} value="itemOne">
          Item 1
        </MenuItem>
        <MenuItem value="itemTwo">
          Item 2
        </MenuItem>
      </MenuItemGroup>
    )

    testbed.render({
      children: menuGroup,
      defaultShow: true
    })

    expect(firstItem.focused).to.be.true
  })

  it('should call onToggle on click', () => {
    const onToggle = testbed.sandbox.stub()
    const subject = testbed.render({
      onToggle
    })
    subject.find('button').simulate('click')

    expect(onToggle).to.have.been.called
  })

  it('should call onFocus on focus', () => {
    const onFocus = testbed.sandbox.stub()
    const subject = testbed.render({
      onFocus
    })
    subject.find('button').simulate('focus')

    expect(onFocus).to.have.been.called
  })

  it('should have an aria-haspopup attribute', () => {
    const subject = testbed.render()
    const btnElem = subject.find('button')

    expect(btnElem.getAttribute('aria-haspopup')).to.equal('true')
  })

  describe('for a11y', function () {
    it('should meet standards when menu is closed', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    it('should meet standards when menu is open', function (done) {
      const subject = testbed.render({
        defaultShow: true
      })

      subject.should.be.accessible(done)
    })
  })
})
