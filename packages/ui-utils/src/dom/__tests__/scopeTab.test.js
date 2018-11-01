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

import { expect } from '@instructure/ui-test-utils'
import scopeTab from '../scopeTab'

describe('scopeTab', async () => {
  let container, node
  const MOCK_EVENT = {
    shiftKey: false,
    preventDefault: () => {}
  }

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)

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
    container && container.parentNode && container.parentNode.removeChild(container)
    container = null
    node && node.parentNode && node.parentNode.removeChild(node)
    node = null
  })

  it('should scope tab within container', async () => {
    const nested = document.querySelector('.scopeTab--NESTED')
    const one = document.querySelector('.scopeTab--ONE')
    const two = document.querySelector('.scopeTab--TWO')

    await two.focus()

    scopeTab(nested, MOCK_EVENT)

    expect(document.activeElement).to.equal(one)
  })

  it('should not attempt scoping when no tabbable children', async () => {
    const two = document.querySelector('.scopeTab--TWO')

    await two.focus()

    scopeTab(node, MOCK_EVENT)

    expect(document.activeElement).to.equal(two)
  })
})
