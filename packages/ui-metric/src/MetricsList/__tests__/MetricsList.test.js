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

import { MetricsList } from '../index'
import { MetricsListItem } from '../MetricsListItem'
import { MetricsListLocator } from '../MetricsListLocator'

describe('<MetricsList />', async () => {
  it('should render children', async () => {
    await mount(
      <MetricsList>
        <MetricsListItem label="Grade" value="80%" />
        <MetricsListItem label="Late" value="4" />
        <MetricsListItem label="Missing" value="2" />
      </MetricsList>
    )
    const list = await MetricsListLocator.find()

    expect(list.getTextContent()).to.equal('Grade80%Late4Missing2')
  })

  it('passes props through to MetricsList element', async () => {
    await mount(
      <MetricsList data-automation="foo">
        <MetricsListItem label="Grade" value="80%" />
        <MetricsListItem label="Late" value="4" />
        <MetricsListItem label="Missing" value="2" />
      </MetricsList>
    )

    expect(await MetricsListLocator.find()).to.have.attribute(
      'data-automation',
      'foo'
    )
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(
        <MetricsList>
          <MetricsListItem label="Grade" value="80%" />
          <MetricsListItem label="Late" value="4" />
          <MetricsListItem label="Missing" value="2" />
        </MetricsList>
      )

      const metricsList = await MetricsListLocator.find()
      expect(await metricsList.accessible()).to.be.true()
    })

    it('should have role=grid with aria-readonly=true', async () => {
      await mount(
        <MetricsList>
          <MetricsListItem label="Grade" value="80%" />
          <MetricsListItem label="Late" value="4" />
          <MetricsListItem label="Missing" value="2" />
        </MetricsList>
      )

      const metricsList = await MetricsListLocator.find()
      const grids = await metricsList.findAll('[role="grid"]')

      expect(grids.length).to.equal(1)
      expect(grids[0].getAttribute('aria-readonly')).to.equal('true')
    })

    it('should have role=row', async () => {
      await mount(
        <MetricsList>
          <MetricsListItem label="Grade" value="80%" />
          <MetricsListItem label="Late" value="4" />
          <MetricsListItem label="Missing" value="2" />
        </MetricsList>
      )

      const metricsList = await MetricsListLocator.find()
      const rows = await metricsList.findAll('[role="row"]')

      expect(rows.length).to.equal(3)
    })

    it('should have role=gridcell', async () => {
      await mount(
        <MetricsList>
          <MetricsListItem label="Grade" value="80%" />
          <MetricsListItem label="Late" value="4" />
          <MetricsListItem label="Missing" value="2" />
        </MetricsList>
      )

      const metricsList = await MetricsListLocator.find()
      const cells = await metricsList.findAll('[role="gridcell"]')

      expect(cells.length).to.equal(3)
    })
  })
})
