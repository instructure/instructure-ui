import React from 'react'
import Transition from '../index'

import styles from '../styles.css'

const tick = (cb) => {
  setTimeout(() => {
    setTimeout(() => {
      cb()
    }, 0)
  }, 0)
}

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
      testbed.tick()

      tick(() => {
        expect(subject.getDOMNode()).to.equal(null)
        done()
      })
    })
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

    testbed.tick()

    expect(onEnter).to.have.been.called
    expect(onEntering).to.have.been.called
    expect(onEntered).to.have.been.called
  })

  it('should correctly call exit methods', function (done) {
    const onExit = testbed.sandbox.stub()
    const onExiting = testbed.sandbox.stub()
    const onExited = testbed.sandbox.stub()

    const subject = testbed.render({
      in: true,
      onExit,
      onExiting,
      onExited
    })

    subject.setProps({ in: false }, () => {
      expect(onExit).to.have.been.called
      expect(onExiting).to.have.been.called
      testbed.tick() // trigger exiting -> exited
      tick(() => {
        expect(onExited).to.have.been.called
        done()
      })
    })
  })
})
