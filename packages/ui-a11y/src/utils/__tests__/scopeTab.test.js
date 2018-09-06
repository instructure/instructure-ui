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
import scopeTab from '../scopeTab'

describe('scopeTab', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  afterEach(() => {
    node && node.parentNode && node.parentNode.removeChild(node)
    node = null
  })

  const testbed = new Testbed(
    <div>
      <div data-test-container>
        <input data-test-input1 />
        <input data-test-input2 />
      </div>
      <input data-test-input3 />
    </div>
  )

  const findInput = (subject, id) => {
    return subject.find(`[data-test-input${id}]`).getDOMNode()
  }

  const findContainer = (subject) => {
    return subject.find('[data-test-container]').getDOMNode()
  }

  const MOCK_EVENT = {
    shiftKey: false,
    preventDefault: () => {}
  }

  it('should scope tab within container', () => {
    const subject = testbed.render()

    findInput(subject, 2).focus()

    scopeTab(findContainer(subject), MOCK_EVENT)

    expect(document.activeElement).to.equal(findInput(subject, 1))
  })

  it('should not attempt scoping when no tabbable children', () => {
    const subject = testbed.render()
    const two = findInput(subject, 2)

    two.focus()
    scopeTab(node, MOCK_EVENT)

    expect(document.activeElement).to.equal(two)
  })

  it('should execute callback when provided instead of default behavior', () => {
    const subject = testbed.render()

    findInput(subject, 2).focus()
    const spy = testbed.spy()

    scopeTab(findContainer(subject), MOCK_EVENT, spy)
    expect(spy).to.have.been.calledOnce()
    expect(document.activeElement).to.not.equal(findInput(subject, 1))
  })
})
