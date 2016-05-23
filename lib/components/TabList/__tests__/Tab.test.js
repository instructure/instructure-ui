import React from 'react'
import Tab from '../Tab'

describe('<Tab />', function () {
  const testbed = createTestbed(
    <Tab id="foo" index={0} controls="foo-panel">Tab Label</Tab>
  )

  it('should render children', function () {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Tab Label')
  })

  it('should have appropriate role attribute', function () {
    const subject = testbed.render()

    expect(subject.getAttribute('role'))
      .to.equal('tab')
  })

  it('should have appropriate aria attributes', function () {
    const subject = testbed.render()

    expect(subject.getAttribute('aria-selected'))
      .to.not.exist
    expect(subject.getAttribute('aria-disabled'))
      .to.not.exist
  })

  it('should set the aria-selected attribute', function () {
    const subject = testbed.render({
      selected: true
    })

    expect(subject.getAttribute('aria-selected'))
      .to.equal('true')
  })

  it('should set the aria-disabled attribute', function () {
    const subject = testbed.render({
      disabled: true
    })

    expect(subject.getAttribute('aria-disabled'))
      .to.equal('true')
  })

  it('should set the tabindex to 0 when selected', function () {
    const subject = testbed.render({
      selected: true
    })

    expect(subject.getAttribute('tabindex'))
      .to.equal('0')
  })

  it('should set the tabindex to -1 when not selected', function () {
    const subject = testbed.render({
      selected: false
    })

    expect(subject.getAttribute('tabindex'))
      .to.equal('-1')
  })

  it('should remove the tabindex attribute when disabled', function () {
    const subject = testbed.render({
      disabled: true
    })

    expect(subject.getAttribute('tabindex'))
      .to.not.exist
  })

  it('should call onClick when clicked', function () {
    const onClick = testbed.sandbox.stub()
    const index = 2

    const subject = testbed.render({
      index,
      onClick
    })

    subject.trigger('click')

    expect(onClick).to.have.been.called
    expect(onClick.args[0][0]).to.equal(2)
  })

  it('should NOT call onClick when clicked and tab is disabled', function () {
    const onClick = testbed.sandbox.stub()

    const subject = testbed.render({
      disabled: true,
      onClick
    })

    subject.trigger('click')

    expect(onClick).to.not.have.been.called
  })

  it('should call onKeyDown when keys are pressed', function () {
    const onKeyDown = testbed.sandbox.stub()
    const index = 2

    const subject = testbed.render({
      index,
      onKeyDown
    })

    subject.keyDown('enter')

    expect(onKeyDown).to.have.been.called
    expect(onKeyDown.args[0][0]).to.equal(2)
  })

  it('should NOT call onKeyDown when keys are pressed and tab is disabled', function () {
    const onKeyDown = testbed.sandbox.stub()

    const subject = testbed.render({
      disabled: true,
      onKeyDown
    })

    subject.keyDown('enter')

    expect(onKeyDown).to.not.have.been.called
  })

  it('should focus itself when focus is set and it is selected', function () {
    const subject = testbed.render({
      selected: true,
      focus: true
    })

    expect(subject.focused()).to.be.true
  })

  it('should not focus itself when it is not selected', function () {
    const subject = testbed.render({
      selected: false,
      focus: true
    })

    expect(subject.focused()).to.be.false
  })
})
