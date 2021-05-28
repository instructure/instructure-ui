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
import {
  expect,
  mount,
  stub,
  wait,
  within,
  find
} from '@instructure/ui-test-utils'

import { Transition } from '../index'
import generateStyle from '../styles'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
const getClass = (type, phase) => {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  const styles = generateStyle({}, { type })
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return styles.classNames[phase]
}

describe('<Transition />', async () => {
  const types = [
    'fade',
    'scale',
    'slide-down',
    'slide-up',
    'slide-left',
    'slide-right'
  ]

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
  const expectTypeClass = function (type) {
    it(`should correctly apply classes for '${type}'`, async () => {
      const subject = await mount(
        <Transition type={type} in={true}>
          <div>hello</div>
        </Transition>
      )

      const transition = within(subject.getDOMNode())

      expect(transition.hasClass(getClass(type, 'entered'))).to.be.true()
    })
  }

  types.forEach((type) => {
    expectTypeClass(type)
  })

  it('should correctly apply enter and exit classes', async () => {
    const type = 'fade'

    const subject = await mount(
      <Transition type={type} in={true}>
        <div>hello</div>
      </Transition>
    )

    const transition = within(subject.getDOMNode())
    expect(transition.hasClass(getClass(type, 'entered'))).to.be.true()

    await subject.setProps({ in: false })
    await wait(() => {
      expect(transition.hasClass(getClass(type, 'exited'))).to.be.true()
    })
  })

  it('should remove component from DOM when `unmountOnExit` is set', async () => {
    const subject = await mount(
      <Transition type="fade" in={true} unmountOnExit={true}>
        <div>hello</div>
      </Transition>
    )

    expect(subject.getDOMNode()).to.exist()

    await subject.setProps({ in: false })

    expect(await find(':contains(hello)', { expectEmpty: true })).to.not.exist()
  })

  it('should not execute enter transition with `transitionEnter` set to false', async () => {
    const onEntering = stub()

    const subject = await mount(
      <Transition
        type="fade"
        in={false}
        transitionEnter={true}
        onEntering={onEntering}
      >
        <div>hello</div>
      </Transition>
    )

    await subject.setProps({ in: true })
    expect(onEntering).to.not.have.been.called()
  })

  it('should not execute exit transition with `transitionExit` set to false', async () => {
    const onExiting = stub()

    const subject = await mount(
      <Transition
        type="fade"
        in={true}
        transitionExit={false}
        onExiting={onExiting}
      >
        <div>hello</div>
      </Transition>
    )

    await subject.setProps({ in: false })
    expect(onExiting).to.not.have.been.called()
  })

  it('should correctly call enter methods', async () => {
    const onEnter = stub()

    const onEntering = stub()

    const onEntered = stub()

    await mount(
      <Transition
        type="fade"
        in={true}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        <div>hello</div>
      </Transition>
    )

    await wait(() => {
      expect(onEnter).to.have.been.called()
      expect(onEntering).to.have.been.called()
      expect(onEntered).to.have.been.called()
    })
  })

  it('should correctly call exit methods', async () => {
    const onExit = stub()

    const onExiting = stub()

    const onExited = stub()

    const subject = await mount(
      <Transition
        type="fade"
        in={true}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div>hello</div>
      </Transition>
    )

    await subject.setProps({ in: false })

    await wait(() => {
      expect(onExit).to.have.been.called()
      expect(onExiting).to.have.been.called()
      expect(onExited).to.have.been.called()
    })
  })
})
