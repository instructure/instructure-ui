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
import { childrenOrValue } from '../index'

describe('childrenOrValue', () => {
  it('should accept when as="input", value is provided, and children is null', () => {
    const props = {
      as: 'input',
      value: 'hello world',
      children: null
    }

    expect(childrenOrValue(props, 'children', 'TestComponent')).to.not.exist()
  })

  it('should accept when as is not input, value is null, and children are provided', () => {
    const props = {
      as: 'div',
      value: null,
      children: 'hello world'
    }

    expect(childrenOrValue(props, 'value', 'TestComponent')).to.not.exist()
  })

  it('should reject when as="input" and children is not null or value is undefined', () => {
    const props: { as: string; children: string | null } = {
      as: 'input',
      children: 'hello world'
    }

    expect(
      childrenOrValue(props, 'children', 'TestComponent')
    ).to.be.an.instanceOf(Error)

    props.children = null
    expect(
      childrenOrValue(props, 'children', 'TestComponent')
    ).to.be.an.instanceOf(Error)
  })

  it('should reject when as is not input, value is not null or children are undefined', () => {
    const props: { as: string; value: string | null } = {
      as: 'div',
      value: 'hello world'
    }

    expect(
      childrenOrValue(props, 'value', 'TestComponent')
    ).to.be.an.instanceOf(Error)

    props.value = null
    expect(
      childrenOrValue(props, 'value', 'TestComponent')
    ).to.be.an.instanceOf(Error)
  })
})
