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
import View from '@instructure/ui-layout/lib/components/View'

import ProgressCircle from '../index'
import styles from '../styles.css'

describe('<ProgressCircle />', () => {
  const testbed = new Testbed(
    <ProgressCircle
      label="Loading completion"
      valueNow={40}
      valueMax={60}
    />
  )

  it('should render', () => {
    const subject = testbed.render()

    expect(subject).to.be.present()
  })

  it('meter should have a radius', () => {
    const subject = testbed.render()
    const meterCircle = subject.find(`circle.${styles.meter}`)

    expect(meterCircle.getAttribute('r')).to.exist()
  })

  it('meter should have a stroke-dashoffset', () => {
    const subject = testbed.render()
    const meterCircle = subject.find(`circle.${styles.meter}`)

    expect(meterCircle.getComputedStyle()
      .getPropertyValue('stroke-dashoffset')).to.exist()
  })

  it('stroke-dashoffset should be 0 if valueNow > valueMax', () => {
    const subject = testbed.render({
      valueNow: 70,
      valueMax: 60
    })
    const meterCircle = subject.find(`circle.${styles.meter}`)

    expect(meterCircle.getComputedStyle().getPropertyValue('stroke-dashoffset'))
      .to.equal('0px')
  })

  it('should render the value if a formatter function is provided', () => {
    const subject = testbed.render({
      valueNow: 40,
      valueMax: 60,
      formatDisplayedValue: function (valueNow, valueMax) {
        return `${valueNow} / ${valueMax}`
      }
    })

    expect(subject.text()).to.contain('40 / 60')
  })

  describe('size x-small', () => {
    it('meter should have a radius', () => {
      const subject = testbed.render({ size: 'x-small' })
      const meterCircle = subject.find(`circle.${styles.meter}`)

      expect(meterCircle.getAttribute('r')).to.exist()
    })

    it('meter should have a stroke-dashoffset', () => {
      const subject = testbed.render({ size: 'x-small' })
      const meterCircle = subject.find(`circle.${styles.meter}`)

      expect(meterCircle.getComputedStyle()
        .getPropertyValue('stroke-dashoffset')).to.exist()
    })
  })

  it('should meet a11y standards', (done) => {
    const subject = testbed.render()

    subject.should.be.accessible(done)
  })

  describe('when passing down props to View', () => {
    const allowedProps = {
      as: 'div',
      margin: 'small',
      display: View.defaultProps.display,
      elementRef: () => {}
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, () => {
            const subject = testbed.render({
              [prop]: 'foo'
            })
            expect(subject.find(View).props()[prop]).to.not.exist()
          })
        } else {
          it(`should pass down the '${prop}' prop and set it to '${allowedProps[prop]}'`, () => {
            const subject = testbed.render({
              [prop]: allowedProps[prop]
            })
            expect(subject.find(View).props()[prop]).to.equal(allowedProps[prop])
          })
        }
    })
  })
})
