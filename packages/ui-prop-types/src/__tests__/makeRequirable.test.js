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
import { makeRequirable } from '../index'

function mockValidator (props, propName, componentName) {
  const propValue = props[propName]
  if (propValue === 'purple') {
    return new Error(`Purple is not accepted in ${componentName}!`)
  }
}

mockValidator.isRequired = makeRequirable(mockValidator)

describe('makeRequirable', () => {
  it('should validate when not required', () => {
    const props = {
      value: 'green'
    }

    const args = [
      props,
      'value',
      'TestComponent'
    ]

    expect(mockValidator(...args)).to.not.exist()

    props.value = 'purple'
    expect(mockValidator(...args)).to.be.an.instanceOf(Error)
  })

  it('should validate when required', () => {
    const props = {
      value: 'green'
    }

    const args = [
      props,
      'value',
      'TestComponent'
    ]

    expect(mockValidator.isRequired(...args)).to.not.exist()

    props.value = 'purple'
    expect(mockValidator.isRequired(...args)).to.be.an.instanceOf(Error)
  })

  it('should error if required prop is null or undefined', () => {
    const props = {
      value: null
    }

    const args = [
      props,
      'value',
      'TestComponent'
    ]

    // null values are accepted when not required
    expect(mockValidator(...args)).to.not.exist()

    // null values are rejected when required
    expect(mockValidator.isRequired(...args)).to.be.an.instanceOf(Error)

    // undefined values are accepted when not required
    args[1] = 'undefinedProp'
    expect(mockValidator(...args)).to.not.exist()

    // undefined values are rejected when not required
    expect(mockValidator.isRequired(...args)).to.be.an.instanceOf(Error)
  })
})

