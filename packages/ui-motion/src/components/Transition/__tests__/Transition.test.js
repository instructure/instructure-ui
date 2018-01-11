/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from 'react'
import Transition from '../index'

import styles from '../styles.css'

describe('<Transition />', () => {
  const testbed = new Testbed(
    <Transition type="fade">
      <div>hello</div>
    </Transition>
  )

  const types = ['fade', 'scale', 'slide-down', 'slide-up', 'slide-left', 'slide-right']

  const expectTypeClass = function (type) {
    it(`should correctly apply type classest for ${type}`, () => {
      const subject = testbed.render({
        in: true,
        type: type
      })
      expect(subject.hasClass(styles[type])).to.be.true
    })
  }

  types.forEach((type) => {
    expectTypeClass(type)
  })

  it('should correctly apply enter and exit classes', (done) => {
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

  it('should remove component from DOM when `unmountOnExit` is set', (done) => {
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

  it('should not execute enter transition with `transitionEnter` set to false', () => {
    const onEntering = testbed.stub()

    testbed.render({
      in: true,
      transitionEnter: false,
      onEntering
    })

    expect(onEntering).to.not.have.been.called
  })

  it('should not execute exit transition with `transitionExit` set to false', () => {
    const onExiting = testbed.stub()

    testbed.render({
      in: true,
      transitionExit: false,
      onExiting
    })

    expect(onExiting).to.not.have.been.called
  })

  it('should correctly call enter methods', () => {
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

  it('should correctly call exit methods', (done) => {
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
