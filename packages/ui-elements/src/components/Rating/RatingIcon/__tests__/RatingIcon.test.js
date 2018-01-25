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
import RatingIcon from '../index'
import Transition from '@instructure/ui-motion/lib/components/Transition'

describe('<RatingIcon />', () => {
  const testbed = new Testbed(
    <RatingIcon />
  )

  it('transitions when filled on render and animateFill is true', () => {
    const subject = testbed.render({
      filled: true,
      animateFill: true
    })

    testbed.tick() // delay
    testbed.raf()

    expect(subject.find(Transition)).to.be.present
  })

  it('transitions when filled after render and animateFill is true', (done) => {
    const subject = testbed.render({
      filled: false,
      animateFill: true
    })

    expect(subject.find(Transition).length).to.equal(0)

    subject.setProps({
      filled: true
    }, () => {
      testbed.defer(() => { // update state
        testbed.raf()
        expect(subject.find(Transition)).to.be.present
        done()
      })
    })
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()
    subject.should.be.accessible(done)
  })
})
