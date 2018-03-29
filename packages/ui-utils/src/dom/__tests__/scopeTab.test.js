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

import scopeTab from '../scopeTab'

describe('scopeTab', () => {
  let container
  const MOCK_EVENT = {
    shiftKey: false,
    preventDefault: () => {}
  }

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <div class="scopeTab--NESTED">
        <input class="scopeTab--ONE" />
        <input class="scopeTab--TWO" />
      </div>
      <input class="scopeTab--THREE" />
    `

    document.body.appendChild(container)
  })

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })

  it('should scope tab within container', () => {
    const nested = document.querySelector('.scopeTab--NESTED')
    const one = document.querySelector('.scopeTab--ONE')
    const two = document.querySelector('.scopeTab--TWO')

    two.focus()

    scopeTab(nested, MOCK_EVENT)

    expect(document.activeElement).to.equal(one)
  })

  it('should not attempt scoping when no tabbable children', () => {
    const node = document.createElement('div')
    const two = document.querySelector('.scopeTab--TWO')

    two.focus()

    scopeTab(node, MOCK_EVENT)

    expect(document.activeElement).to.equal(two)
  })
})
