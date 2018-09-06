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
import Page from '../index'

describe('<Page />', () => {
  let _input
  const testbed = new Testbed(
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

  it('should render with a function as child', () => {
    const subject = testbed.render()

    expect(subject.text()).to.equal('Hello World')
  })

  it('should focus default element', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.find('input').focused()).to.be.true()
  })

  it('should use context', () => {
    const pageSpy = testbed.spy()
    const history = [1, 4, 3]
    const navigate = () => {}

    testbed.render({
        children: pageSpy
      }, {
        history,
        navigateToPreviousPage: navigate
      })

    expect(pageSpy.calledOnce).to.equal(true)
    expect(pageSpy.args[0][0]).to.equal(history)
    expect(pageSpy.args[0][1]).to.equal(navigate)
  })
})
