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
import { mount, expect } from '@instructure/ui-test-utils'
import { isVisible } from '../isVisible'

describe('isVisible', async () => {
  it('should recognize visible elements', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(<div id="test">Hello world!</div>)
    const visible = isVisible(document.getElementById('test'))
    expect(visible).to.equal(true)
  })

  it('should recognize elements with display: none', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div id="test">
        <span id="test-2" style={{ display: 'none' }}>
          Hello world!
        </span>
      </div>
    )
    const visible = isVisible(document.getElementById('test-2'))
    expect(visible).to.equal(false)
  })

  it('should recognize elements hidden with clip', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div id="test">
        <span
          id="test-2"
          style={{
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)'
          }}
        >
          Hello world!
        </span>
      </div>
    )

    const visible = isVisible(document.getElementById('test-2'))
    expect(visible).to.equal(false)
  })

  it('should recognize clipped elements that are not hidden', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div id="test">
        <span
          id="test-2"
          style={{
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0,0,10px,0)'
          }}
        >
          Hello world!
        </span>
      </div>
    )

    const visible = isVisible(document.getElementById('test-2'))
    expect(visible).to.equal(true)
  })

  it('should recursively check parent visibility', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div id="test" style={{ visibility: 'hidden' }}>
        <span>
          <span id="test-2" style={{ visibility: 'visible' }}>
            Hello world!
          </span>
        </span>
      </div>
    )

    const nonrecursive = isVisible(document.getElementById('test-2'), false)
    const recursive = isVisible(document.getElementById('test-2'))
    expect(nonrecursive).to.equal(true)
    expect(recursive).to.equal(false)
  })

  it('should not recursively check text nodes', async () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    await mount(
      <div id="test" style={{ visibility: 'hidden' }}>
        <span>
          <span id="test-2" style={{ visibility: 'visible' }}>
            Hello world!
          </span>
        </span>
      </div>
    )
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const textNode = document.getElementById('test-2').childNodes[0]
    const nonrecursive = isVisible(textNode, false)
    const recursive = isVisible(textNode)
    expect(nonrecursive).to.equal(true)
    expect(recursive).to.equal(false)
  })
})
