import React from 'react'
import PopoverMenu from '../index.js'
import { MenuItem, MenuItemSeparator } from '../../Menu'

describe('<PopoverMenu />', () => {
  const testbed = createTestbed(
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

    expect(subject.dom()).to.exist
  })

  it('should not show by default', function () {
    const subject = testbed.render()

    expect(subject.unwrap().show).to.be.false
  })

  it('should accept a default show', function () {
    const subject = testbed.render({
      defaultShow: true
    })

    expect(subject.unwrap().show).to.be.true
  })

  it('should call onToggle on click', () => {
    const onToggle = testbed.sandbox.stub()
    const subject = testbed.render({
      onToggle
    })
    subject.find('button').trigger('click')

    expect(onToggle).to.have.been.called
  })

  it('should call onFocus on focus', () => {
    const onFocus = testbed.sandbox.stub()
    const subject = testbed.render({
      onFocus
    })
    subject.find('button').trigger('focus')

    expect(onFocus).to.have.been.called
  })

  it('should have an aria-haspopup attribute', () => {
    const subject = testbed.render()
    const btnElem = subject.find('button').dom()

    expect(btnElem.getAttribute('aria-haspopup')).to.be.equal('true')
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
