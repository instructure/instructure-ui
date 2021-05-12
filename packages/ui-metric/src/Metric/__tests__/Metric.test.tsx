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
import { expect, mount } from '@instructure/ui-test-utils'

import { Metric } from '../index'
import { MetricLocator } from '../MetricLocator'

describe('<Metric />', async () => {
  it('should render the label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Metric renderLabel="Grade" renderValue="80%" />)

    const metric = await MetricLocator.find()

    expect(await metric.findWithText('Grade')).to.exist()
  })

  it('should render the value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Metric renderLabel="Grade" renderValue="80%" />)

    const metric = await MetricLocator.find()

    expect(await metric.findWithText('80%')).to.exist()
  })

  it('passes props through to Metric element', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <Metric data-automation="foo" renderLabel="Grade" renderValue="80%" />
    )

    expect(await MetricLocator.find()).to.have.attribute(
      'data-automation',
      'foo'
    )
  })

  it('should not have role="gridcell" for the value', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Metric renderLabel="Grade" renderValue="80%" />)

    const metric = await MetricLocator.find()
    const value = await metric.findWithText('80%')

    expect(
      await value.find('[role="gridcell"]', { expectEmpty: true })
    ).to.not.exist()
  })

  it('should not have role=rowheader for the label', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<Metric renderLabel="Grade" renderValue="80%" />)

    const metric = await MetricLocator.find()
    const label = await metric.findWithText('Grade')

    expect(
      await label.find('[role="rowheader"]', { expectEmpty: true })
    ).to.not.exist()
  })
})
