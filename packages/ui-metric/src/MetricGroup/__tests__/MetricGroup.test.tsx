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

import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { runAxeCheck } from '@instructure/ui-axe-check'
import { MetricGroup } from '@instructure/ui-metric/latest'
import { Metric } from '@instructure/ui-metric/latest'

describe('<MetricGroup />', () => {
  let consoleErrorMock: any

  beforeEach(() => {
    // Mocking console to prevent test output pollution and expect for messages
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorMock.mockRestore()
  })

  it('should render children', async () => {
    const { container } = await render(
      <MetricGroup>
        <Metric renderLabel="Grade" renderValue="80%" />
        <Metric renderLabel="Late" renderValue="4" />
        <Metric renderLabel="Missing" renderValue="2" />
      </MetricGroup>
    )

    expect(container).toHaveTextContent('Grade80%Late4Missing2')
  })

  it('passes props through to MetricGroup element', async () => {
    await render(
      <MetricGroup data-testid="metric-group" data-automation="foo">
        <Metric renderLabel="Grade" renderValue="80%" />
        <Metric renderLabel="Late" renderValue="4" />
        <Metric renderLabel="Missing" renderValue="2" />
      </MetricGroup>
    )

    const metric = page.getByTestId('metric-group').element()
    expect(metric).toHaveAttribute('data-automation', 'foo')
  })

  describe('for a11y', () => {
    it('should meet standards', async () => {
      const { container } = await render(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )
      const axeCheck = await runAxeCheck(container)

      expect(axeCheck).toBe(true)
    })

    it('should have role=grid with aria-readonly=true', async () => {
      await render(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )
      const grids = page.getByRole('grid').elements()

      expect(grids.length).toBe(1)
      expect(grids[0]).toHaveAttribute('aria-readonly', 'true')
    })

    it('should have role=row', async () => {
      await render(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )
      const rows = page.getByRole('row').elements()

      expect(rows.length).toBe(3)
    })

    it('should have role=gridcell', async () => {
      await render(
        <MetricGroup>
          <Metric renderLabel="Grade" renderValue="80%" />
          <Metric renderLabel="Late" renderValue="4" />
          <Metric renderLabel="Missing" renderValue="2" />
        </MetricGroup>
      )
      const cells = page.getByRole('gridcell').elements()

      expect(cells.length).toBe(3)
    })
  })
})
