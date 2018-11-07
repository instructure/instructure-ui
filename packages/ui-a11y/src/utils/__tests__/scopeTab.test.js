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
import { expect, mount, within, stub } from '@instructure/ui-test-utils'
import scopeTab from '../scopeTab'

describe('scopeTab', async () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  afterEach(() => {
    node && node.parentNode && node.parentNode.removeChild(node)
    node = null
  })

  const MOCK_EVENT = {
    shiftKey: false,
    preventDefault: () => {}
  }

  it('should scope tab within container', async () => {
    const subject = await mount(
      <div>
        <div data-test-container>
          <input data-test-input1 />
          <input data-test-input2 />
        </div>
        <input data-test-input3 />
      </div>
    )

    const element = within(subject.getDOMNode())
    const container = (await element.find({css: '[data-test-container'})).getDOMNode()
    const input1 = (await element.find({css: '[data-test-input1]'})).getDOMNode()
    const input2 = (await element.find({css: '[data-test-input2]'})).getDOMNode()

    await input2.focus()

    scopeTab(container, MOCK_EVENT)

    expect(document.activeElement).to.equal(input1)
  })

  it('should not attempt scoping when no tabbable children', async () => {
    const subject = await mount(
      <div>
        <div data-test-container>
          <input data-test-input1 />
          <input data-test-input2 />
        </div>
        <input data-test-input3 />
      </div>
    )

    const element = within(subject.getDOMNode())
    const input2 = (await element.find({css: '[data-test-input2]'})).getDOMNode()

    await input2.focus()

    scopeTab(node, MOCK_EVENT)

    expect(document.activeElement).to.equal(input2)
  })

  it('should execute callback when provided instead of default behavior', async () => {
    const cb = stub()
    const subject = await mount(
      <div>
        <div data-test-container>
          <input data-test-input1 />
          <input data-test-input2 />
        </div>
        <input data-test-input3 />
      </div>
    )

    const element = within(subject.getDOMNode())
    const container = (await element.find({css: '[data-test-container'})).getDOMNode()
    const input2 = (await element.find({css: '[data-test-input2]'})).getDOMNode()

    await input2.focus()

    scopeTab(container, MOCK_EVENT, cb)

    expect(cb).to.have.been.called()
  })
})
