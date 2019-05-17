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
import { expect, mount, locator } from '@instructure/ui-test-utils'

import { MetricsListItem } from '../index'

const MetricsListItemLocator = locator(MetricsListItem.selector)

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

  it('passes props through to MetricsListItem element', async () => {
    await mount(
      <MetricsListItem
        data-automation="foo"
        label="Grade"
        value="80%"
      />
    )

    expect(await MetricsListItemLocator.find())
      .to.have.attribute('data-automation', 'foo')
  })

  describe('for a11y', async () => {
    it('should meet standards', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()
      expect(await metricsListItem.accessible({
        // MetricsListItem does have the required parent when it is used inside
        // of MetricsList which generates a container with role="grid". Ignore
        // here b/c we are testing it in isolation
        ignores: ['aria-required-parent']
      })).to.be.true()
    })

    it('should have role="row" for the container', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      expect(await MetricsListItemLocator.find())
        .to.have.attribute('role', 'row')
    })

    it('should have role="gridcell" for the value', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()

      expect(await metricsListItem.find('[role="gridcell"]'))
        .to.have.text('80%')
    })

    it('should have role=rowheader for the label', async () => {
      await mount(<MetricsListItem label="Grade" value="80%" />)

      const metricsListItem = await MetricsListItemLocator.find()

      expect(await metricsListItem.find('[role="rowheader"]'))
        .to.have.text('Grade')
    })
  })
})
