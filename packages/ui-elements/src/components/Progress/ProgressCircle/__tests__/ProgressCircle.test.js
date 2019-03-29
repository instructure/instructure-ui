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
import { expect, mount, within, stub } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/components/View'

import ProgressCircle from '../index'

import styles from '../styles.css'

describe('<ProgressCircle />', async () => {
  it('should render', async () => {
    const subject = await mount(
      <ProgressCircle
        label="Loading completion"
        valueNow={40}
        valueMax={60}
      />
    )

    expect(subject.getDOMNode()).to.exist()
  })

  it('meter should have a radius', async () => {
    const subject = await mount(
      <ProgressCircle
        label="Loading completion"
        valueNow={40}
        valueMax={60}
      />
    )

    const progressCircle = within(subject.getDOMNode())
    const meterCircle = await progressCircle.find(`circle.${styles.meter}`)
    expect(meterCircle.getAttribute('r')).to.exist()
  })

  it('meter should have a stroke-dashoffset', async () => {
    const subject = await mount(
      <ProgressCircle
        label="Loading completion"
        valueNow={40}
        valueMax={60}
      />
    )

    const progressCircle = within(subject.getDOMNode())
    const meterCircle = await progressCircle.find(`circle.${styles.meter}`)

    expect(!!meterCircle.getComputedStyle()
      .getPropertyValue('stroke-dashoffset')).to.be.true()
  })

  it('stroke-dashoffset should be 0 if valueNow > valueMax', async () => {
    const subject = await mount(
      <ProgressCircle
        label="Loading completion"
        valueNow={70}
        valueMax={60}
      />
    )

    const progressCircle = within(subject.getDOMNode())
    const meterCircle = await progressCircle.find(`circle.${styles.meter}`)

    expect(meterCircle.getComputedStyle().getPropertyValue('stroke-dashoffset'))
      .to.equal('0px')
  })

  it('should render the value if a formatter function is provided', async () => {
    const subject = await mount(
      <ProgressCircle
        label="Loading completion"
        valueNow={40}
        valueMax={60}
        formatDisplayedValue={(valueNow, valueMax) => `${valueNow} / ${valueMax}`}
      />
    )

    const progressCircle = within(subject.getDOMNode())
    expect(await progressCircle.find(':contains("40 / 60")')).to.exist()
  })

  describe('size x-small', () => {
    it('meter should have a radius', async () => {
      const subject = await mount(
        <ProgressCircle
          label="Loading completion"
          valueNow={70}
          valueMax={60}
          size="x-small"
        />
      )

      const progressCircle = within(subject.getDOMNode())
      const meterCircle = await progressCircle.find(`circle.${styles.meter}`)

      expect(meterCircle.getAttribute('r')).to.exist()
    })

    it('meter should have a stroke-dashoffset', async () => {
      const subject = await mount(
        <ProgressCircle
          label="Loading completion"
          valueNow={70}
          valueMax={60}
          size="x-small"
        />
      )

      const progressCircle = within(subject.getDOMNode())
      const meterCircle = await progressCircle.find(`circle.${styles.meter}`)

      expect(!!meterCircle.getComputedStyle()
        .getPropertyValue('stroke-dashoffset')).to.be.true()
    })
  })

  it('should meet a11y standards', async () => {
    const subject = await mount(
      <ProgressCircle
        label="Loading completion"
        valueNow={40}
        valueMax={60}
      />
    )

    const progressCircle = within(subject.getDOMNode())
    expect(await progressCircle.accessible()).to.be.true()
  })

  describe('when passing down props to View', async () => {
    const allowedProps = {
      margin: 'small',
      elementRef: () => {},
      as: 'div'
    }

    Object.keys(View.propTypes)
      .filter(prop => prop !== 'theme' && prop !== 'children')
      .forEach((prop) => {
        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const consoleError = stub(console, 'error')
            const props = {
              [prop]: 'foo'
            }
            const warning = `Warning: [ProgressCircle] prop '${prop}' is not allowed.`
            await mount(
              <ProgressCircle
                label="Loading completion"
                valueNow={40}
                valueMax={60}
                {...props}
              />
            )
            expect(consoleError)
              .to.be.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleError = stub(console, 'error')
            await mount(
              <ProgressCircle
                label="Loading completion"
                valueNow={40}
                valueMax={60}
                {...props}
              />
            )
            expect(consoleError).to.not.be.called()
          })
        }
    })
  })
})
