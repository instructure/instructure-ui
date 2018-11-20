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
import { expect, mount, spy } from '@instructure/ui-test-utils'

import View from '@instructure/ui-layout/lib/components/View'

import Pill from '../index'
import PillLocator from '../locator'

describe('<Pill />', async () => {
  it('should render', async () => {
    await mount(<Pill text="Overdue" />)
    expect(await PillLocator.find()).to.exist()
  })

  it('should display text', async () => {
    await mount(<Pill text="Overdue" />)
    const pill = await PillLocator.find()
    expect(await pill.find(':contains(Overdue)')).to.exist()
  })

  it('should render without a Tooltip when text overflows max-width', async () => {
    await mount(<Pill text="hello" />)
    const pill = await PillLocator.find()
    expect(await pill.findTooltipContent({ expectEmpty: true })).to.not.exist()
  })

  it('should render with a Tooltip when text overflows max-width', async () => {
    const text = "some really super incredibly long text that will force overflow"
    await mount(<Pill text={text} />)

    const pill = await PillLocator.find()

    await pill.focus()

    const tooltip = await pill.findTooltipContent()

    expect(tooltip.getTextContent()).to.equal(text)
  })

  it('should meet a11y standards', async () => {
    await mount(<Pill text="Overdue" />)
    const pill = await PillLocator.find()
    expect(await pill.accessible()).to.be.true()
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
        const warning = `Warning: ${View.disallowedPropWarning(prop, Pill)}`

        if (Object.keys(allowedProps).indexOf(prop) < 0) {
          it(`should NOT allow the '${prop}' prop`, async () => {
            const props = {
              [prop]: 'foo'
            }
            const consoleWarn = spy(console, 'warn')
            await mount(<Pill text="Overdue" {...props} />)

            expect(consoleWarn).to.have.been.calledWith(warning)
          })
        } else {
          it(`should allow the '${prop}' prop`, async () => {
            const props = { [prop]: allowedProps[prop] }
            const consoleWarn = spy(console, 'warn')
            await mount(<Pill text="Overdue" {...props} />)
            expect(consoleWarn).to.not.have.been.calledWith(warning)
          })
        }
    })
  })
})
