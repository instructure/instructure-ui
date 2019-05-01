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
import { expect, mount, within} from '@instructure/ui-test-utils'
import { Page } from '../index'

describe('<Page />', async () => {
  let _input

  it('should render with a function as child', async () => {
    const subject = await mount(
      <Page defaultFocusElement={() => { return _input }}>
          {() => {
            return (
              <div>
                <input type="text" ref={(el) => { _input = el }} />
                <span>Hello World</span>
              </div>
            )
          }}
      </Page>
    )

    expect(subject.getDOMNode().textContent).to.equal('Hello World')
  })

  it('should focus default element', async () => {
    const subject = await mount(
      <Page defaultFocusElement={() => { return _input }}>
          {() => {
            return (
              <div>
                <input type="text" ref={(el) => { _input = el }} />
                <span>Hello World</span>
              </div>
            )
          }}
      </Page>
    )

    const page = within(subject.getDOMNode())
    const input = await page.find(':focusable')

    await page.focus()

    expect(input.focused()).to.be.true()
  })


})
