import React from 'react'
import Transition from '../index'

import styles from '../styles.css'

describe('<Transition />', function () {
  const testbed = new Testbed(
    <Transition type="fade">
      <div>hello</div>
    </Transition>
  )

  const types = ['fade', 'scale', 'slide-down', 'slide-up', 'slide-left', 'slide-right']

  const expectTypeClass = function (type) {
    it(`should correctly apply type classest for ${type}`, function () {
      const subject = testbed.render({
        in: true,
        type: type
      })
      expect(subject.hasClass(styles[type])).to.be.true
    })
  }

  types.forEach(function (type) {
    expectTypeClass(type)
  })

  it('should correctly apply enter and exit classes', function (done) {
    const subject = testbed.render({
      in: true,
      type: 'fade'
    })

    testbed.tick() // entering

    expect(subject.hasClass(styles['fade--entered']))
      .to.be.true

    subject.setProps({ in: false }, () => {
      testbed.tick() // trigger exiting -> exited

      expect(subject.hasClass(styles['fade--exited']))
        .to.be.true
      done()
    })
  })

  it('should remove component from DOM when `unmountOnExit` is set', function (done) {
    const subject = testbed.render({
      in: true,
      unmountOnExit: true
    })

    expect(subject.getDOMNode()).to.not.equal(null)

    subject.setProps({ in: false }, () => {
      testbed.defer(() => {
        testbed.tick() // entered -> exiting
        testbed.tick() // exiting -> exited
        expect(subject.getDOMNode()).to.equal(null)
        done()
      })
    })
  })

  it('should not execute enter transition with `transitionEnter` set to false', function () {
    const onEntering = testbed.stub()

    testbed.render({
      in: true,
      transitionEnter: false,
      onEntering
    })

    expect(onEntering).to.not.have.been.called
  })

  it('should not execute exit transition with `transitionExit` set to false', function () {
    const onExiting = testbed.stub()

    testbed.render({
      in: true,
      transitionExit: false,
      onExiting
    })

    expect(onExiting).to.not.have.been.called
  })

  it('should correctly call enter methods', function () {
    const onEnter = testbed.stub()
    const onEntering = testbed.stub()
    const onEntered = testbed.stub()

    testbed.render({
      in: true,
      onEnter,
      onEntering,
      onEntered
    })

    testbed.tick() // exited -> entering
    testbed.tick() // entering -> entered

    expect(onEnter).to.have.been.called
    expect(onEntering).to.have.been.called
    expect(onEntered).to.have.been.called
  })

  it('should correctly call exit methods', function (done) {
    const onExit = testbed.stub()
    const onExiting = testbed.stub()
    const onExited = testbed.stub()

    const subject = testbed.render({
      in: true,
      onExit,
      onExiting,
      onExited
    })

    subject.setProps({ in: false }, () => {
      testbed.defer(() => {
        testbed.tick() // entered -> exiting
        testbed.tick() // exiting -> exited
        expect(onExit).to.have.been.called
        expect(onExiting).to.have.been.called
        expect(onExited).to.have.been.called
        done()
      })
    })
  })
})
