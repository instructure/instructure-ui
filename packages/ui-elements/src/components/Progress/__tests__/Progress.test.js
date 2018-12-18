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
import { expect, mount, stub } from '@instructure/ui-test-utils'

import Progress from '../index'
import ProgressLocator from '../locator'

describe('<Progress />', async () => {
  it('should render', async () => {
    await mount(<Progress label="Chapters read" valueMax={60} valueNow={30} />)
    expect(await ProgressLocator.find()).to.exist()
  })

  it('should render a progress element', async () => {
    await mount(<Progress label="Chapters read" valueMax={60} valueNow={30} />)

    const componentRoot = await ProgressLocator.find()
    const progress = await componentRoot.find('progress')

    expect(progress).to.exist()
    expect(progress.getAttribute('value')).to.equal('30')
    expect(progress.getAttribute('aria-valuemax')).to.equal('60')
    expect(progress.getAttribute('aria-valuetext')).to.equal('30 / 60')
  })

  it('should provide an elementRef', async () => {
    const elementRef = stub()
    await mount(
      <Progress
        label="Chapters read"
        valueMax={60}
        valueNow={30}
        elementRef={elementRef}
      />
    )

    const progress = await ProgressLocator.find()
    expect(elementRef).to.have.been.calledWith(progress.getDOMNode())
  })

  it('should render with the specified tag when `as` prop is set', async () => {
    await mount(
      <Progress
        label="Chapters read"
        valueMax={60}
        valueNow={30}
        as="li"
      />
    )
    expect(await ProgressLocator.find('li')).to.exist()
  })

  it('should format the displayed value according to the formatDisplayedValue prop', async () => {
    await mount(
      <Progress
        label="Chapters read"
        valueMax={60}
        valueNow={30}
        formatDisplayedValue={(valueNow, valueMax) => `${valueNow} of ${valueMax}`}
      />
    )
    expect(await ProgressLocator.find(':contains(30 of 60)')).to.exist()
  })

  it('should display proper values when the variant is set to circle', async () => {
    await mount(
      <Progress
        label="Chapters read"
        valueMax={80}
        valueNow={25}
        formatValueText={(valueNow, valueMax) => `${valueNow} out of ${valueMax}`}
      />
    )

    const componentRoot = await ProgressLocator.find()
    const progress = await componentRoot.find('progress')
    expect(progress.getAttribute('aria-valuenow')).to.equal('25')
    expect(progress.getAttribute('aria-valuemax')).to.equal('80')
    expect(progress.getAttribute('aria-valuetext')).to.equal('25 out of 80')
  })

  it('should meet a11y standards when rendered as a progress bar', async () => {
    await mount(
      <Progress
        label="Chapters read"
        valueMax={60}
        valueNow={30}
        variant="bar"
      />
    )
    const progress = await ProgressLocator.find()

    expect(await progress.accessible()).to.be.true()
  })

  it('should meet a11y standards when rendered as a progress circle', async () => {
    await mount(
      <Progress
        label="Chapters read"
        valueMax={60}
        valueNow={30}
        variant="circle"
      />
    )

    const progress = await ProgressLocator.find()

    expect(await progress.accessible()).to.be.true()
  })
})
