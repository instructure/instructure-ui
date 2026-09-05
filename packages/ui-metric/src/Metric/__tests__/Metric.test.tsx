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
import { describe, it, expect, vi } from 'vitest'

import { Metric } from '@instructure/ui-metric/latest'

describe('<Metric />', () => {
  it('should render the label', async () => {
    const { container } = await render(
      <Metric renderLabel="Grade" renderValue="80%" />
    )

    expect(container).toMatchTextContent('Grade')
  })

  it('should render the value', async () => {
    const { container } = await render(
      <Metric renderLabel="Grade" renderValue="80%" />
    )

    expect(container).toMatchTextContent('80%')
  })

  it('passes props through to Metric element', async () => {
    await render(
      <Metric
        data-testid="metric"
        data-automation="foo"
        renderLabel="Grade"
        renderValue="80%"
      />
    )
    const metric = page.getByTestId('metric').element()

    expect(metric).toHaveAttribute('data-automation', 'foo')
  })

  it('should not have role="gridcell" for the value', async () => {
    await render(<Metric renderLabel="Grade" renderValue="80%" />)
    const value = page.getByText('80%').element()

    expect(value).not.toHaveAttribute('role', 'gridcell')
  })

  it('should not have role=rowheader for the label', async () => {
    await render(<Metric renderLabel="Grade" renderValue="80%" />)
    const label = page.getByText('Grade').element()

    expect(label).not.toHaveAttribute('role', 'rowheader')
  })

  it('should allow ReactNodes as labels and values', async () => {
    const { container } = await render(
      <Metric renderLabel={<div>hello</div>} />
    )

    expect(container).toMatchTextContent('hello')
  })

  it('should allow methods as labels', async () => {
    const renderLabel = vi.fn()
    await render(<Metric renderLabel={renderLabel} />)

    expect(renderLabel).toHaveBeenCalled()
  })

  it('should allow methods as values', async () => {
    const renderValue = vi.fn()
    await render(<Metric renderValue={renderValue} />)

    expect(renderValue).toHaveBeenCalled()
  })
})
