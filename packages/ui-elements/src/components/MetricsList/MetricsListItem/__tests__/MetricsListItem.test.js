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

import MetricsListItem from '../index'
import MetricsListItemLocator from '../locator'

describe('<MetricsListItem />', async () => {
  it('should render the label', async () => {
    await mount(<MetricsListItem label="Grade" value="80%" />)

    const metricsListItem = await MetricsListItemLocator.find()
    expect(await metricsListItem.find(':contains(Grade)')).to.exist()
  })

  it('should render the value', async () => {
    await mount(<MetricsListItem label="Grade" value="80%" />)

    const metricsListItem = await MetricsListItemLocator.find()
    expect(await metricsListItem.find(':contains(80%)')).to.exist()
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()
      expect(await metricsListItem.accessible({
        ignores: ['aria-required-parent']
      })).to.be.true()
    })

    it('should have role="row" for the container', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()
      expect(metricsListItem.getAttribute('role')).to.equal('row')
    })

    it('should have role="gridcell" for the value', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()
      const value = await metricsListItem.find('[role="gridcell"]')
      expect(value.getTextContent()).to.equal('80%')
    })

    it('should have role=rowheader for the label', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()
      const label = await metricsListItem.find('[role="rowheader"]')
      expect(label.getTextContent()).to.equal('Grade')
    })
  })
})
