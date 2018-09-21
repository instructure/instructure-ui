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

import MetricsList from '../index'
import MetricsListItem from '../MetricsListItem'
import MetricsListLocator from '../locator'

describe('<MetricsList />', async () => {
  it('should render children', async () => {
    await mount(
      <MetricsList>
        <MetricsListItem label="Grade" value="80%" />
        <MetricsListItem label="Late" value="4" />
        <MetricsListItem label="Missing" value="2" />
      </MetricsList>
    )

    const items = await MetricsListLocator.findAll('div[role="row"]')
    expect(items.length).to.equal(3)
  })

  it('should not allow invalid children', async () => {
    let error = false
    try {
      await mount(
        <MetricsList>
          <div>foo</div>
        </MetricsList>
      )
    } catch (e) {
      error = true
    }

    expect(error).to.be.true()
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

    it('should have role=grid', async () => {
      await mount(
        <MetricsList>
          <MetricsListItem label="Grade" value="80%" />
          <MetricsListItem label="Late" value="4" />
          <MetricsListItem label="Missing" value="2" />
        </MetricsList>
      )

      const metricsList = await MetricsListLocator.find()
      expect(metricsList.getAttribute('role')).to.equal('grid')
    })

    it('should have aria-readonly=true', async () => {
      await mount(
        <MetricsList>
          <MetricsListItem label="Grade" value="80%" />
          <MetricsListItem label="Late" value="4" />
          <MetricsListItem label="Missing" value="2" />
        </MetricsList>
      )

      const metricsList = await MetricsListLocator.find()
      expect(metricsList.getAttribute('aria-readonly')).to.equal('true')
    })
  })
})
