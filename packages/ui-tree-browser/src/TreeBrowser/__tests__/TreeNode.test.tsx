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
import { TreeNode } from '@instructure/ui-tree-browser/latest'

describe('<TreeNode />', () => {
  it('should render children', async () => {
    await render(
      <TreeNode>
        <button>Hello World</button>
      </TreeNode>
    )
    const item = page.getByText('Hello World').element()

    expect(item).toBeInTheDocument()
  })

  it('supports containerRef prop', async () => {
    const containerRef = vi.fn()
    await render(
      <div data-testid="1">
        <TreeNode containerRef={containerRef}>
          <button>Hello World</button>
        </TreeNode>
      </div>
    )
    const div = page.getByTestId('1').element()

    expect(containerRef).toHaveBeenCalledWith(div)
  })
})
