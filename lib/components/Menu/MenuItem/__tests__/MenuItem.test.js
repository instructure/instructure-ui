import React from 'react'
import MenuItem from '../index'
import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'

describe('<MenuItem />', function () {
  const testbed = new Testbed(
    <MenuItem>Hello World</MenuItem>
  )

  it('should render', function () {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render as a link when an href is provided', function () {
    const subject = testbed.render({
      href: 'example.html'
    })
    expect(subject.tagName()).to.equal('A')
  })

  it('should call onSelect after click', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      onSelect,
      value: 'foo'
    })

    subject.simulate('click')

    expect(onSelect).to.have.been.calledOnce
    expect(onSelect.args[0][1]).to.equal('foo')
    expect(onSelect.args[0][2]).to.be.true
  })

  it('should call onClick after click', function () {
    const onClick = testbed.sandbox.stub()
    const subject = testbed.render({
      onClick
    })

    subject.simulate('click')

    expect(onClick).to.have.been.calledOnce
  })

  it('should call onSelect after SPACE key is pressed', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      onSelect
    })

    subject.keyDown('space')

    expect(onSelect).to.have.been.calledOnce
  })

  it('should call onSelect after ENTER key is pressed', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      onSelect
    })

    subject.keyDown('enter')

    expect(onSelect).to.have.been.calledOnce
  })

  it('should not be able to select when the disabled prop is set', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      disabled: true
    })

    subject.simulate('click')
    subject.keyDown('enter')
    subject.keyDown('space')

    expect(onSelect).to.not.have.been.called
  })

  it('should set the tabIndex attribute', function () {
    const subject = testbed.render()

    expect(subject.find('[tabIndex="-1"]'))
      .to.be.present
  })

  it('should set the aria-controls attribute', function () {
    const subject = testbed.render({
      controls: 'testId'
    })
    expect(subject.find('[aria-controls="testId"]'))
      .to.be.present
  })

  it('should set the aria-disabled attribute', function () {
    const subject = testbed.render({
      disabled: true
    })
    expect(subject.find('[aria-disabled="true"]'))
      .to.be.present
  })

  it('should set the aria-checked attribute when defaultSelected prop is true', function () {
    const subject = testbed.render({
      defaultSelected: true
    })
    expect(subject.find('[aria-checked="true"]'))
      .to.be.present
  })

  it('should set the aria-checked attribute when selected prop is true', function () {
    const onSelect = testbed.sandbox.stub()
    const subject = testbed.render({
      selected: true,
      onSelect
    })
    expect(subject.find('[aria-checked="true"]'))
      .to.be.present
  })

  it('should default to the "menuitem" role', function () {
    const subject = testbed.render()
    expect(subject.find('[role="menuitem"]'))
      .to.be.present
  })

  it('should set the role to "menuitemcheckbox" when the type is "checkbox"', function () {
    const subject = testbed.render({
      type: 'checkbox'
    })
    expect(subject.find('[role="menuitemcheckbox"]'))
      .to.be.present
  })

  it('should set the role to "menuitemradio" when the type is "radio"', function () {
    const subject = testbed.render({
      type: 'radio'
    })
    expect(subject.find('[role="menuitemradio"]'))
      .to.be.present
  })

  it('should render an icon for "checkbox" type when selected', function () {
    const subject = testbed.render({
      type: 'checkbox',
      defaultSelected: true
    })
    expect(subject.find(IconCheckSolid))
      .to.be.present
  })

  it('should render an icon for "radio" type when selected', function () {
    const subject = testbed.render({
      type: 'radio',
      selected: true,
      onSelect: testbed.sandbox.stub()
    })
    expect(subject.find(IconCheckSolid))
      .to.be.present
  })

  it('should focus properly', function () {
    const subject = testbed.render()

    expect(subject.focused()).to.be.false

    subject.instance().focus()

    expect(subject.focused()).to.be.true
    expect(subject.instance().focused).to.be.true
  })
})
