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
import getScrollParents from '../getScrollParents'

describe('getScrollParents', async () => {
  const node = (
    <div>
      <div id="item-1">
        <div id="item-2">
          <span id="item-3">hello</span>
          <span id="sibling-1">hello</span>
          <span id="sibling-2">hello</span>
          <span id="sibling-3">hello</span>
        </div>
      </div>
      <div id="ht" style={{ height: '50px' }} />
      <div id="scroll-parent" style={{ height: '200px', overflow: 'scroll' }}>
        <div>
          <div id="scroll-child" style={{ height: '500px' }}>hello</div>
        </div>
      </div>

      <div id="scroll-parent-rel" style={{ height: '200px', overflow: 'scroll', position: 'relative' }}>
        <div style={{ height: '200px', overflow: 'scroll' }}>
          <div id="scroll-child-rel" style={{ height: '500px', position: 'absolute' }}>hello</div>
        </div>
      </div>

      <div style={{ height: '200px', overflow: 'scroll' }}>
        <div id="scroll-child-fixed" style={{ height: '500px', position: 'fixed' }}>hello</div>
      </div>
    </div>
  )

  it('should find scroll parent for inline elements', async () => {
    await mount(node)

    const child = document.getElementById('scroll-child')
    const parent = document.getElementById('scroll-parent')

    expect(getScrollParents(child)[0]).to.be.equal(parent)
  })

  it('should ignore static parents when absolute', async () => {
    await mount(node)

    const child = document.getElementById('scroll-child-rel')
    const parent = document.getElementById('scroll-parent-rel')

    expect(getScrollParents(child)[0]).to.be.equal(parent)
  })

  it('should handle fixed', async () => {
    await mount(node)

    const child = document.getElementById('scroll-child-fixed')
    const scrollParent = getScrollParents(child)[0]

    expect(scrollParent === document).to.be.equal(true)
  })
})
