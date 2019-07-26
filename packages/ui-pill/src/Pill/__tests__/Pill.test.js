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
import { expect, mount, wait } from '@instructure/ui-test-utils'

import { Pill } from '../index'
import PillLocator from '../locator'

describe('<Pill />', async () => {
  it('should render', async () => {
    await mount(<Pill>Overdue</Pill>)
    expect(await PillLocator.find()).to.exist()
  })

  it('should display text', async () => {
    await mount(<Pill>Overdue</Pill>)
    const pill = await PillLocator.find()
    expect(await pill.find(':contains(Overdue)')).to.exist()
  })

  it('should render without a Tooltip when text does not overflow max-width', async () => {
    await mount(<Pill>hello</Pill>)
    const pill = await PillLocator.find()
    expect(await pill.findTooltipContent({ expectEmpty: true })).to.not.exist()
  })

  it('should render a Tooltip when text overflows max-width', async () => {
    const text = "some really super incredibly long text that will force overflow"
    await mount(<Pill>{text}</Pill>)

    const pill = await PillLocator.find()

    await pill.focus()

    const tooltip = await pill.findTooltipContent()

    await wait(() => {
      expect(tooltip).to.have.text(text)
    })
  })

  it('should meet a11y standards', async () => {
    await mount(<Pill>Overdue</Pill>)
    const pill = await PillLocator.find()
    expect(await pill.accessible()).to.be.true()
  })
})
