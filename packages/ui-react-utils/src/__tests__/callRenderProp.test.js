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
import { expect, mount, within } from '@instructure/ui-test-utils'
import { callRenderProp } from '../callRenderProp'

describe('callRenderProp', async () => {
  /* eslint-disable mocha/no-synchronous-tests */
  it('strings', () => {
    expect(callRenderProp('foo')).to.equal('foo')
  })

  it('numbers', () => {
    expect(callRenderProp(2)).to.equal(2)
  })

  it('arrays', () => {
    const prop = ['foo', 'bar', 'baz']
    expect(callRenderProp(prop)).to.deep.equal(prop)
    expect(callRenderProp([])).to.deep.equal([])
  })

  it('booleans', () => {
    expect(callRenderProp(false)).to.equal(false)
  })

  it('JSX literals', () => {
    const Foo = () => <div>hello</div>
    expect(callRenderProp(<Foo />)).to.deep.equal(<Foo />)
  })
  /* eslint-enable mocha/no-synchronous-tests */

  it('React classes', async () => {
    class Foo extends React.Component {
      render () {
        return <div>hello</div>
      }
    }

    const Result = callRenderProp(Foo)
    expect(Result).to.deep.equal(<Foo />)

    const subject = await mount(Result)
    expect(subject.getDOMNode()).to.exist()
  })

  it('functions', async () => {
    const Baz = () => 'some text'
    const result = callRenderProp(Baz)

    const subject = await mount(<div>{result}</div>)
    expect(within(subject.getDOMNode()).find(':textContent(some text)')).to.exist()
  })
})
