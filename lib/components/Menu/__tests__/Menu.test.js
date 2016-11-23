import React from 'react'
import Menu, { MenuItem, MenuItemSeparator } from '../index'

describe('<Menu />', function () {
  const testbed = new Testbed(
    <Menu labelledBy="foobar">
      <MenuItem>Default (Grid view)</MenuItem>
      <MenuItem>Learning Mastery</MenuItem>
      <MenuItem disabled>Individual (List view)</MenuItem>
      <MenuItem type="radio" defaultChecked>
        Select me
      </MenuItem>
      <MenuItem type="radio">
        Or select me
      </MenuItem>
      <MenuItem type="checkbox" defaultChecked>
        Include Anchor Standards
      </MenuItem>
      <MenuItemSeparator />
      <MenuItem>Open grading history...</MenuItem>
    </Menu>
  )

  it('should render', function () {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should not allow invalid children', function () {
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

  it('should call onSelect when menu item is selected', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      onSelect
    })
    subject.find('MenuItem').trigger('click')
    expect(onSelect).to.have.been.called
  })

  it('should call onClose after Esc or Tab press', function () {
    const keyCodes = [9, 27]
    keyCodes.forEach(function (keyCode) {
      const onClose = testbed.sandbox.stub()
      const subject = testbed.render({
        onClose
      })
      subject.trigger('keyDown', { keyCode: keyCode })
      expect(onClose).to.have.been.called
    })
  })

  it('should have focus index -1 by default', function () {
    const subject = testbed.render()
    expect(subject.unwrap().focusedIndex).to.equal(-1)
  })

  it('should assign first element focus when focus prop is set', function () {
    const subject = testbed.render({
      focus: true
    })
    expect(subject.unwrap().focusedIndex).to.equal(0)
  })

  it('should move focus properly', function () {
    const subject = testbed.render({
      focus: true
    })
    subject.trigger('keyDown', {keyCode: 38})
    expect(subject.unwrap().focusedIndex).to.equal(6)
    subject.trigger('keyDown', {keyCode: 40})
    expect(subject.unwrap().focusedIndex).to.equal(0)
  })

  it('should set aria attributes and title properly', function () {
    const subject = testbed.render({
      labelledBy: 'id',
      controls: 'id',
      hidden: true,
      title: 'title'
    })
    expect(subject.getAttribute('aria-labelledby')).to.exist
    expect(subject.getAttribute('aria-controls')).to.exist
    expect(subject.getAttribute('aria-hidden')).to.exist
    expect(subject.getAttribute('title')).to.exist
  })
})
