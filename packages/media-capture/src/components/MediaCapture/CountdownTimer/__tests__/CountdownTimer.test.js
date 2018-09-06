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
import CountdownTimer from '../index'

describe('<CountdownTimer />', () => {
  const testbed = new Testbed(<CountdownTimer actions={{ countdownComplete: () => {}}} />)

  it('should render', () => {
    const countdownTimer = testbed.render()
    expect(countdownTimer).to.be.present()
  })

  describe('counting down', () => {
    it('decreases the value by 1 every 1000ms', () => {
      const countdownTimer = testbed.render({
        countdownFrom: 5
      })

      expect(countdownTimer.find('time').text()).to.eql('5')
      testbed.tick(1000)
      expect(countdownTimer.find('time').text()).to.eql('4')
      testbed.tick(1000)
      expect(countdownTimer.find('time').text()).to.eql('3')
    })

    it('invokes clearCountdown when the countdown reaches 0', () => {
      const countdownTimer = testbed.render({
        countdownFrom: 5
      })
      const clearCountdown = testbed.spy(countdownTimer.instance(), 'clearCountdown')

      expect(clearCountdown.callCount).to.eql(0)
      testbed.tick(5000)
      expect(clearCountdown.callCount).to.eql(1)
    })
  })
})
