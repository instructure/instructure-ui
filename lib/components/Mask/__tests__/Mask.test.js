import React from 'react'
import keycode from 'keycode'
import Mask from '../index'

describe('<Mask />', () => {
  const testbed = new Testbed(<Mask />)

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should have tabIndex -1 when onDismiss is provided', () => {
    const subject = testbed.render({
      onDismiss: testbed.stub()
    })

    expect(subject.getAttribute('tabindex')).to.equal('-1')
  })

  it('should call onClick prop when clicked', () => {
    const onClick = testbed.stub()
    const subject = testbed.render({
      onClick
    })
    subject.click()
    expect(onClick).to.have.been.called
  })

  it('should call onKeyUp prop with keyup event', () => {
    const onKeyUp = testbed.stub()
    const subject = testbed.render({
      onKeyUp
    })
    subject.keyUp('enter')
    expect(onKeyUp).to.have.been.called
  })

  it('should call onDismiss prop when clicked if onDismiss is provided', () => {
    const onDismiss = testbed.stub()

    const subject = testbed.render({
      onDismiss
    })

    subject.click()

    expect(onDismiss).to.have.been.called
  })

  it('should call onDismiss prop when Esc key pressed if onDismiss is provided', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      onDismiss
    })

    subject.keyUp('escape')

    expect(onDismiss).to.have.been.called
  })
})
