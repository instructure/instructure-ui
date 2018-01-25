import React from 'react'
import IconCheckSolid from 'instructure-icons/lib/Solid/IconCheckSolid'
import MenuItem from '../index'

describe('<MenuItem />', () => {
  const testbed = new Testbed(
    <MenuItem>Hello World</MenuItem>
  )

  it('should render', () => {
    const subject = testbed.render()
    expect(subject).to.be.present
  })

  it('should render as a link when an href is provided', () => {
    const subject = testbed.render({
      href: 'example.html'
    })
    expect(subject.find('a[href="example.html"]')).to.be.present
  })

  it('should call onSelect after click', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect,
      value: 'foo'
    })

    subject.simulate('click')

    expect(onSelect).to.have.been.calledOnce
    expect(onSelect.args[0][1]).to.equal('foo')
    expect(onSelect.args[0][2]).to.be.true
  })

  it('should call onClick after click', () => {
    const onClick = testbed.stub()
    const subject = testbed.render({
      onClick
    })

    subject.simulate('click')

    expect(onClick).to.have.been.calledOnce
  })

  it('should call onSelect after SPACE key is pressed', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })

    subject.keyUp('space')

    expect(onSelect).to.have.been.calledOnce
  })

  it('should call onSelect after ENTER key is pressed', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      onSelect
    })

    subject.keyDown('enter')

    expect(onSelect).to.have.been.calledOnce
  })

  it('should not be able to select when the disabled prop is set', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      disabled: true
    })

    subject.simulate('click')
    subject.keyUp('enter')
    subject.keyUp('space')

    expect(onSelect).to.not.have.been.called
  })

  it('should set the tabIndex attribute', () => {
    const subject = testbed.render()

    expect(subject.find('[tabIndex="-1"]'))
      .to.be.present
  })

  it('should set the aria-controls attribute', () => {
    const subject = testbed.render({
      controls: 'testId'
    })
    expect(subject.find('[aria-controls="testId"]'))
      .to.be.present
  })

  it('should set the aria-disabled attribute', () => {
    const subject = testbed.render({
      disabled: true
    })
    expect(subject.find('[aria-disabled="true"]'))
      .to.be.present
  })

  it('should set the aria-checked attribute when defaultSelected prop is true', () => {
    const subject = testbed.render({
      type: 'checkbox',
      defaultSelected: true
    })
    expect(subject.find('[aria-checked="true"]'))
      .to.be.present
  })

  it('should set the aria-checked attribute when selected prop is true', () => {
    const onSelect = testbed.stub()
    const subject = testbed.render({
      type: 'checkbox',
      selected: true,
      onSelect
    })
    expect(subject.find('[aria-checked="true"]'))
      .to.be.present
  })

  it('should default to the "menuitem" role', () => {
    const subject = testbed.render()
    expect(subject.find('[role="menuitem"]'))
      .to.be.present
  })

  it('should set the role to "menuitemcheckbox" when the type is "checkbox"', () => {
    const subject = testbed.render({
      type: 'checkbox'
    })
    expect(subject.find('[role="menuitemcheckbox"]'))
      .to.be.present
  })

  it('should set the role to "menuitemradio" when the type is "radio"', () => {
    const subject = testbed.render({
      type: 'radio'
    })
    expect(subject.find('[role="menuitemradio"]'))
      .to.be.present
  })

  it('should render an icon for "checkbox" type when selected', () => {
    const subject = testbed.render({
      type: 'checkbox',
      defaultSelected: true
    })
    expect(subject.find(IconCheckSolid))
      .to.be.present
  })

  it('should render an icon for "radio" type when selected', () => {
    const subject = testbed.render({
      type: 'radio',
      selected: true,
      onSelect: testbed.stub()
    })
    expect(subject.find(IconCheckSolid))
      .to.be.present
  })

  it('should focus properly', () => {
    const subject = testbed.render()

    expect(subject.focused()).to.be.false

    subject.instance().focus()

    expect(subject.focused()).to.be.true
    expect(subject.instance().focused).to.be.true
  })
})
