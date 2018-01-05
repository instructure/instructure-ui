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

  it('should not call onDismiss when esc keyUp default is prevented', () => {
    const onDismiss = testbed.stub()
    const subject = testbed.render({
      onDismiss
    })

    subject.simulate('keyUp', { keyCode: keycode.codes.esc, defaultPrevented: true })

    expect(onDismiss).to.not.have.been.called
  })
})
