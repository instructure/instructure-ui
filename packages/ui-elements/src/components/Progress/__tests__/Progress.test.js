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
import Progress from '../index'

describe('<Progress />', () => {
  const testbed = new Testbed(
    <Progress label="Chapters read" valueMax={60} valueNow={30} />
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present
  })

  it('should render a progress element', () => {
    const subject = testbed.render()
    const progress = subject.find('progress')
    expect(progress).to.be.present
    expect(progress.getAttribute('value')).to.equal('30')
    expect(progress.getAttribute('aria-valuemax')).to.equal('60')
    expect(progress.getAttribute('aria-valuetext')).to.equal('30 / 60')
  })

  it('should format the displayed value according to the formatDisplayedValue prop', () => {
    const subject = testbed.render({formatDisplayedValue: function (valueNow, valueMax) {
      return `${valueNow} of ${valueMax}`
    }})

    expect(subject.text()).to.equal('30 of 60')
  })

  it('should display proper values when the variant is set to circle', () => {
    const subject = testbed.render({
      variant: 'circle',
      valueMax: 80,
      valueNow: 25,
      formatValueText: function (valueNow, valueMax) {
        return `${valueNow} out of ${valueMax}`
      }
    })

    const progress = subject.find('progress')
    expect(progress.getAttribute('aria-valuenow')).to.equal('25')
    expect(progress.getAttribute('aria-valuemax')).to.equal('80')
    expect(progress.getAttribute('aria-valuetext')).to.equal('25 out of 80')
  })

  it('should meet a11y standards when rendered as a progress bar', (done) => {
    const subject = testbed.render({
      variant: 'bar'
    })

    subject.should.be.accessible(done, {
      ignores: [
        'aria-allowed-role' // TODO: remove this when we fix the role
      ]
    })
  })

  it('should meet a11y standards when rendered as a progress circle', (done) => {
    const subject = testbed.render({
      variant: 'circle'
    })

    subject.should.be.accessible(done)
  })
})
