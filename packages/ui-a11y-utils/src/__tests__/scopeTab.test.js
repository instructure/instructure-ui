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
import { expect, mount, within, stub, wait } from '@instructure/ui-test-utils'
import { scopeTab } from '../scopeTab'

const MOCK_EVENT = {
  shiftKey: false,
  preventDefault: () => {}
}

describe('scopeTab', async () => {
  it('should scope tab within container', async () => {
    const subject = await mount(
      <div>
        <div id="container">
          <input id="first" />
          <input id="second" />
        </div>
      </div>
    )

    const fixture = within(subject.getDOMNode())

    const container = await fixture.find('#container')
    const first = await fixture.find('#first')
    const second = await fixture.find('#second')

    await second.focus()

    await wait(() => {
      expect(second.focused()).to.be.true()
    })

    scopeTab(container.getDOMNode(), MOCK_EVENT)

    await wait(() => {
      expect(first.focused()).to.be.true()
    })
  })

  it('should not attempt scoping when no tabbable children', async () => {
    const subject = await mount(
      <div>
        <div id="container">Hello</div>
        <input />
      </div>
    )

    const fixture = within(subject.getDOMNode())

    const input = await fixture.find('input')
    const container = await fixture.find('#container')

    await input.focus()

    scopeTab(container.getDOMNode(), MOCK_EVENT)

    await wait(() => {
      expect(input.focused()).to.be.true()
    })
  })

  it('should execute callback when provided instead of default behavior', async () => {
    const cb = stub()
    const subject = await mount(
      <div>
        <div id="container">
          <input />
        </div>
      </div>
    )

    const fixture = within(subject.getDOMNode())

    const container = await fixture.find('#container')
    const input = await fixture.find('input')

    await input.focus()

    scopeTab(container.getDOMNode(), MOCK_EVENT, cb)

    await wait(() => {
      expect(cb).to.have.been.called()
    })
  })
})
