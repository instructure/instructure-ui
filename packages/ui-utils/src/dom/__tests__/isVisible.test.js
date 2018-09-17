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
import isVisible from '../isVisible'

describe('isVisible', () => {
  const testbed = new Testbed(
    <div id="test">Hello world!</div>
  )

  it('should recognize visible elements', () => {
    testbed.render()
    const visible = isVisible(document.getElementById('test'))
    expect(visible).to.equal(true)
  })

  it('should recognize elements with display: none', () => {
    testbed.render({
      children: (
        <span id="test-2" style={{display: 'none'}}>Hello world!</span>
      )
    })
    const visible = isVisible(document.getElementById('test-2'))
    expect(visible).to.equal(false)
  })

  it('should recognize elements hidden with clip', () => {
    testbed.render({
      children: (
        <span id="test-2" style={{
          position: 'absolute',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)'
        }}>
          Hello world!
        </span>
      )
    })
    const visible = isVisible(document.getElementById('test-2'))
    expect(visible).to.equal(false)
  })

  it('should recognize clipped elements that are not hidden', () => {
    testbed.render({
      children: (
        <span id="test-2" style={{
          position: 'absolute',
          overflow: 'hidden',
          clip: 'rect(0,0,10px,0)'
        }}>
          Hello world!
        </span>
      )
    })
    const visible = isVisible(document.getElementById('test-2'))
    expect(visible).to.equal(true)
  })

  it('should recursively check parent visibility', () => {
    testbed.render({
      style: {visibility: 'hidden'},
      children: (
        <span>
          <span id="test-2" style={{visibility: 'visible'}}>Hello world!</span>
        </span>
      )
    })
    const nonrecursive = isVisible(document.getElementById('test-2'), false)
    const recursive = isVisible(document.getElementById('test-2'))
    expect(nonrecursive).to.equal(true)
    expect(recursive).to.equal(false)
  })
})
