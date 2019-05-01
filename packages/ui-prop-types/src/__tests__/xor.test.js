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

import PropTypes, { checkPropTypes } from 'prop-types'
import { expect, stub } from '@instructure/ui-test-utils'

import { xor } from '../index'

describe('xor', () => {
  afterEach(() => {
    console.error.restore && console.error.restore()
  })

  it('should accept when only one of the specified props is set', () => {
    const errorSpy = stub(console, 'error')

    const props = {
      foo: 'foo',
      bar: null,
      baz: null
    }

    const propTypeArgs = [
      props,
      'foo',
      'TestComponent'
    ]

    expect(xor(
      (...args) => {
        checkPropTypes({ foo: PropTypes.string }, ...args)
      },
      'bar',
      'baz'
    )(...propTypeArgs)).to.not.exist()

    props.foo = null
    props.bar = 27
    propTypeArgs[1] = 'bar'
    expect(xor(
      (...args) => {
        checkPropTypes({ bar: PropTypes.number }, ...args)
      },
      'foo',
      'baz'
    )(...propTypeArgs)).to.not.exist()

    props.bar = null
    props.baz = () => {}
    propTypeArgs[1] = 'baz'
    expect(xor(
      (...args) => {
        checkPropTypes({ baz: PropTypes.func }, ...args)
      },
      'foo',
      'bar'
    )(...propTypeArgs)).to.not.exist()

    props.foo = null
    props.bar = null
    props.baz = null
    propTypeArgs[1] = 'foo'
    expect(xor(
      (...args) => {
        checkPropTypes({ foo: PropTypes.string }, ...args)
      },
      'bar',
      'baz'
    )(...propTypeArgs)).to.not.exist()

    expect(errorSpy).to.not.have.been.called()
  })

  it('should reject when more than one of the specified props is set', () => {
    const props = {
      foo: 'foo',
      bar: 27,
      baz: null
    }

    const propTypeArgs = [
      props,
      'foo',
      'TestComponent'
    ]

    expect(xor(
      (...args) => {
        checkPropTypes({ foo: PropTypes.string }, ...args)
      },
      'bar',
      'baz'
    )(...propTypeArgs)).to.be.an.instanceOf(Error)

    props.baz = () => {}
    propTypeArgs[1] = 'bar'
    expect(xor(
      (...args) => {
        checkPropTypes({ bar: PropTypes.number }, ...args)
      },
      'foo',
      'baz'
    )(...propTypeArgs)).to.be.an.instanceOf(Error)

    props.foo = null
    propTypeArgs[1] = 'baz'
    expect(xor(
      (...args) => {
        checkPropTypes({ baz: PropTypes.func }, ...args)
      },
      'foo',
      'bar'
    )(...propTypeArgs)).to.be.an.instanceOf(Error)
  })

  it('should still validate the prop', () => {
    const errorSpy = stub(console, 'error')

    const props = {
      foo: 27,
      bar: null,
      baz: null
    }

    const propTypeArgs = [
      props,
      'foo',
      'TestComponent'
    ]

    xor(
      (...args) => {
        checkPropTypes({ foo: PropTypes.string }, ...args)
      },
      'bar',
      'baz'
    )(...propTypeArgs)

    expect(errorSpy).to.have.been.calledOnce()
  })
})

