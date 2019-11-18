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
import { passthroughProps } from '../passthroughProps'

describe('passthroughProps', async () => {
  /* eslint-disable mocha/no-synchronous-tests */
  it('should passthrough standard dom attributes', () => {
    const props = {
      id: 'myId',
      title: 'My title'
    }
    expect(Object.keys(passthroughProps(props)).length).to.equal(2)
  })

  it('should passthrough data attributes', () => {
    const props = {
      'data-test': true
    }
    expect(Object.keys(passthroughProps(props)).length).to.equal(1)
  })

  it('should passthrough valid react props', () => {
    const props = {
      ref: () => {},
      innerHTML: '<span>hello world</span>'
    }
    expect(Object.keys(passthroughProps(props)).length).to.equal(2)
  })

  it('should passthrough props prefixed with "on"', () => {
    const props = {
      onClick: () => {},
      onCustomCallback: () => {},
      onChange: () => {}
    }
    expect(Object.keys(passthroughProps(props)).length).to.equal(3)
  })

  it('should omit invalid props', () => {
    const props = {
      myCustomProp: 'hello'
    }
    expect(Object.keys(passthroughProps(props)).length).to.equal(0)
  })

  it('should omit certain react props', () => {
    const props = {
      style: { color: 'blue' },
      className: 'myClass',
      children: 'hello world',
      theme: { themeVar: 'myColor' }
    }
    expect(Object.keys(passthroughProps(props)).length).to.equal(0)
  })

  it('should passthrough and omit correct props', () => {
    const props = {
      id: 'myId',
      title: 'My title',
      'data-test': true,
      className: 'myClassName',
      children: 'hello world',
      style: { color: 'blue' },
      theme: { themeVar: 'myColor' },
      withSomething: false,
      onCustomCallback: null,
      onChange: null
    }

    expect(passthroughProps(props)).to.deep.equal({
      id: 'myId',
      title: 'My title',
      'data-test': true,
      onCustomCallback: null,
      onChange: null
    })
  })
  /* eslint-enable mocha/no-synchronous-tests */
})
