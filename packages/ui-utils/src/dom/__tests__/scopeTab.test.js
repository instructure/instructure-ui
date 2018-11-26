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
import { expect, mount, within, wait, spy } from '@instructure/ui-test-utils'
import scopeTab from '../scopeTab'

const MOCK_EVENT = {
  shiftKey: false,
  preventDefault: () => {}
}

describe('scopeTab', async () => {
  it('output the deprecation warning', async () => {
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
    const input = await fixture.find('input')
    const second = await fixture.find('#second')

    await second.focus()

    await wait(() => {
      expect(second.focused()).to.be.true()
    })

    const consoleWarn = spy(console, 'warn')

    scopeTab(container.getDOMNode(), MOCK_EVENT)

    expect(consoleWarn)
      .to.have.been.calledWith([
        'Warning: [scopeTab] was deprecated in version 5.0.0.',
        'It has been moved from @instructure/ui-utils to @instructure/ui-a11y.'
      ].join(' '))

    await wait(() => {
      expect(input.focused()).to.be.true()
    })
  })
})
