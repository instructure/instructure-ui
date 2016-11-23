import React from 'react'
import Transition from '../index'

import styles from '../styles.css'

describe('<Transition />', function () {
  const testbed = new Testbed(
    <Transition>
      <div>hello</div>
    </Transition>
  )

  it('should correctly apply type classes', function () {
    const types = ['fade', 'scale', 'slide-down', 'slide-up', 'slide-left', 'slide-right']
    types.forEach(function (type) {
      const subject = testbed.render({
        in: true,
        type: type
      })
      expect(subject.dom().className)
        .to.contain(styles[type])
    })
  })

  it('should correctly apply enter and exit classes', function () {
    const subject = testbed.render({
      in: true,
      type: 'fade'
    })

    expect(subject.dom().className)
      .to.contain(styles['fade--entered'])

    subject.props('in', false)

    expect(subject.dom().className)
      .to.contain(styles['fade--exited'])
  })

  it('should remove component from DOM when `unmountOnExit` is set', function () {
    const subject = testbed.render({
      in: true,
      unmountOnExit: true
    })

    expect(subject.dom()).to.not.equal(null)
    subject.props('in', false)
    expect(subject.dom()).to.equal(null)
  })

  it('should not execute enter transition with `transitionEnter` set to false', function () {
    const onEntering = testbed.sandbox.stub()

    testbed.render({
      in: true,
      transitionEnter: false,
      onEntering
    })

    expect(onEntering).to.not.have.been.called
  })

  it('should not execute exit transition with `transitionExit` set to false', function () {
    const onExiting = testbed.sandbox.stub()

    testbed.render({
      in: true,
      transitionExit: false,
      onExiting
    })

    expect(onExiting).to.not.have.been.called
  })

  it('should correctly call enter methods', function () {
    const onEnter = testbed.sandbox.stub()
    const onEntering = testbed.sandbox.stub()
    const onEntered = testbed.sandbox.stub()

    testbed.render({
      in: true,
      onEnter,
      onEntering,
      onEntered
    })

    expect(onEnter).to.have.been.called
    expect(onEntering).to.have.been.called
    expect(onEntered).to.have.been.called
  })

  it('should correctly call exit methods', function () {
    const onExit = testbed.sandbox.stub()
    const onExiting = testbed.sandbox.stub()
    const onExited = testbed.sandbox.stub()

    const subject = testbed.render({
      in: true,
      onExit,
      onExiting,
      onExited
    })

    subject.props('in', false)
    expect(onExit).to.have.been.called
    expect(onExiting).to.have.been.called
    expect(onExited).to.have.been.called
  })
})
