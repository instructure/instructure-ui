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

import { MetricGroup } from '../index'
import { Metric } from '../../Metric'
import { MetricGroupLocator } from '../MetricGroupLocator'

describe('<MetricGroup />', async () => {
  it('should render children', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MetricGroup>
        <Metric renderLabel="Grade" renderValue="80%" />
        <Metric renderLabel="Late" renderValue="4" />
        <Metric renderLabel="Missing" renderValue="2" />
      </MetricGroup>
    )
    const list = await MetricGroupLocator.find()

    expect(list.getTextContent()).to.equal('Grade80%Late4Missing2')
  })

  it('should not allow invalid children', async () => {
    const cs = spy(console, 'error')
    const warning =
      "Warning: Failed prop type: Expected one of Metric in MetricGroup but found 'div'"

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MetricGroup>
        <div>foo</div>
      </MetricGroup>
    )

    expect(cs).to.have.been.calledWithMatch(warning)
  })

  it('passes props through to MetricGroup element', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <MetricGroup data-automation="foo">
        <Metric renderLabel="Grade" renderValue="80%" />
        <Metric renderLabel="Late" renderValue="4" />
        <Metric renderLabel="Missing" renderValue="2" />
      </MetricGroup>
    )

    expect(await MetricGroupLocator.find()).to.have.attribute(
      'data-automation',
      'foo'
    )
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )

      const metricGroup = await MetricGroupLocator.find()
      expect(await metricGroup.accessible()).to.be.true()
    })

    it('should have role=grid with aria-readonly=true', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )

      const metricGroup = await MetricGroupLocator.find()
      const grids = await metricGroup.findAll('[role="grid"]')

      expect(grids.length).to.equal(1)
      expect(grids[0].getAttribute('aria-readonly')).to.equal('true')
    })

    it('should have role=row', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )

      const metricGroup = await MetricGroupLocator.find()
      const rows = await metricGroup.findAll('[role="row"]')

      expect(rows.length).to.equal(3)
    })

    it('should have role=gridcell', async () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      await mount(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )

      const metricGroup = await MetricGroupLocator.find()
      const cells = await metricGroup.findAll('[role="gridcell"]')

      expect(cells.length).to.equal(3)
    })
  })
})
