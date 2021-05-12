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
import { getOffsetParents } from '../getOffsetParents'

describe('getOffsetParents', async () => {
  const node = (
    <div>
      <div id="parent-1" style={{ transform: '200px', position: 'relative' }}>
        <div>
          <div id="child-1" style={{ height: '500px' }}>
            hello
          </div>
        </div>
      </div>

      <div style={{ transform: '200px', position: 'absolute' }}>
        <div style={{ position: 'absolute' }}>
          <div id="child-2">hello</div>
        </div>
      </div>

      <div>
        <div id="child-3">hello</div>
      </div>
    </div>
  )

  it('should find offset parent for inline elements', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(node)

    const child = document.getElementById('child-1')
    const parent = document.getElementById('parent-1')

    expect(getOffsetParents(child)[0]).to.be.equal(parent)
  })

  it('should ignore static parents when absolute', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(node)

    const child = document.getElementById('child-2')

    expect(getOffsetParents(child).length).to.be.equal(3)
  })

  it('should handle fixed', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(node)

    const child = document.getElementById('child-3')

    expect(getOffsetParents(child).length).to.be.equal(1)
  })
})
