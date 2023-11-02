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
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOffsetParents } from '../getOffsetParents'

describe('getOffsetParents', () => {
  // At rendering, we receive the node_wrapper and the body as extra offsetParents
  const node = (
    <div data-testid="node">
      <div
        data-testid="child_1_wrapper_parent"
        style={{ transform: '200px', position: 'relative' }}
      >
        <div data-testid="child_1_wrapper">
          <div data-testid="child-1" style={{ height: '500px' }}>
            Test
          </div>
        </div>
      </div>

      <div
        data-testid="child_2_wrapper_parent"
        style={{ transform: '200px', position: 'absolute' }}
      >
        <div data-testid="child_2_wrapper" style={{ position: 'absolute' }}>
          <div data-testid="child-2">Test</div>
        </div>
      </div>

      <div data-testid="child_3_wrapper">
        <div data-testid="child-3">Test</div>
      </div>
    </div>
  )

  it('should find offset parent for inline elements', () => {
    const { getByTestId } = render(node)
    const child = getByTestId('child-1')
    const parent = getByTestId('child_1_wrapper_parent')
    const offsetParents = getOffsetParents(child)

    expect(offsetParents[1]).toBe(parent)
  })

  it('should ignore static parents when absolute', () => {
    const { getByTestId } = render(node)
    const child = getByTestId('child-2')
    const offsetParents = getOffsetParents(child)

    expect(offsetParents.length).toBe(5)
  })

  it('should handle fixed', () => {
    const { getByTestId } = render(node)
    const child = getByTestId('child-3')
    const offsetParents = getOffsetParents(child)

    expect(offsetParents.length).toBe(4)
  })
})
