import React from 'react'
import Menu, { MenuItem, MenuItemSeparator, MenuItemGroup } from '../index'

describe('<Menu />', function () {
  const testbed = new Testbed(
    <Menu>
      <MenuItem>Default (Grid view)</MenuItem>
      <MenuItem value="foo">Learning Mastery</MenuItem>
      <MenuItem disabled>Individual (List view)</MenuItem>
      <MenuItem type="checkbox" value="bar">Toggle Me</MenuItem>
      <MenuItemSeparator />
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
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should call onKeyDown when menu item is selected', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      onSelect
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.have.been.called
  })

  it('should not call onSelect when disabled', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      onSelect,
      disabled: true
    })
    subject.find('MenuItem').first().simulate('click')
    expect(onSelect).to.not.have.been.called
  })

  it('should call onClose after Esc or Tab press', function () {
    const onClose = testbed.sandbox.stub()
    const subject = testbed.render({
      onClose
    })

    subject.keyDown('escape')
    subject.keyDown('tab')

    expect(onClose).to.have.been.called.twice
  })

  it('should have focus index -1 by default', function () {
    const subject = testbed.render()
    expect(subject.instance().focusedIndex).to.equal(-1)
  })

  it('should assign first element focus when focus prop is set', function () {
    const subject = testbed.render({
      focus: true
    })
    expect(subject.instance().focusedIndex).to.equal(0)
  })

  it('should move focus properly', function () {
    const subject = testbed.render({
      focus: true
    })

    subject.keyDown('up')

    expect(subject.instance().focusedIndex).to.equal(9)

    subject.keyDown('down')

    expect(subject.instance().focusedIndex).to.equal(0)
  })

  it('should set aria attributes and title properly', function () {
    const subject = testbed.render({
      labelledBy: 'id',
      controls: 'id',
      hidden: true,
      disabled: true,
      title: 'title'
    })
    expect(subject.getAttribute('aria-labelledby')).to.exist
    expect(subject.getAttribute('aria-controls')).to.exist
    expect(subject.getAttribute('aria-hidden')).to.exist
    expect(subject.getAttribute('aria-disabled')).to.exist
    expect(subject.getAttribute('title')).to.exist
  })

  it('should meet a11y standards', function (done) {
    const subject = testbed.render()

    subject.should.be.accessible(done, {
      ignores: [
        'color-contrast' // brand color doesn't meet 4.5:1 contrast req
      ]
    })
  })
})
