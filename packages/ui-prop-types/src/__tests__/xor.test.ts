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

type XorTestProps = {
  foo: string | null
  bar: number | null
  baz: ((...args: any) => any) | null
}

describe('xor', () => {
  afterEach(() => {
    // actually SinonStub type
    ;(console as any).error.restore && (console.error as any).restore()
  })

  it('should accept when only one of the specified props is set', () => {
    const errorSpy = stub(console, 'error')

    const props: XorTestProps = {
      foo: 'foo',
      bar: null,
      baz: null
    }

    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { foo: PropTypes.string },
            props,
            propName,
            componentName
          )
          return null
        },
        'bar',
        'baz'
      )(props, 'foo', 'TestComponent')
    ).to.not.exist()

    props.foo = null
    props.bar = 27
    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { bar: PropTypes.number },
            props,
            propName,
            componentName
          )
          return null
        },
        'foo',
        'baz'
      )(props, 'bar', 'TestComponent')
    ).to.not.exist()

    props.bar = null
    props.baz = () => {}
    //propTypeArgs[1] = 'baz'
    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { baz: PropTypes.func },
            props,
            propName,
            componentName
          )
          return null
        },
        'foo',
        'bar'
      )(props, 'baz', 'TestComponent')
    ).to.not.exist()

    props.foo = null
    props.bar = null
    props.baz = null
    //propTypeArgs[1] = 'foo'
    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { foo: PropTypes.string },
            props,
            propName,
            componentName
          )
          return null
        },
        'bar',
        'baz'
      )(props, 'foo', 'TestComponent')
    ).to.not.exist()

    expect(errorSpy).to.not.have.been.called()
  })

  it('should reject when more than one of the specified props is set', () => {
    const props: XorTestProps = {
      foo: 'foo',
      bar: 27,
      baz: null
    }

    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { foo: PropTypes.string },
            props,
            propName,
            componentName
          )
          return null
        },
        'bar',
        'baz'
      )(props, 'foo', 'TestComponent')
    ).to.be.an.instanceOf(Error)

    props.baz = () => {}

    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { bar: PropTypes.number },
            props,
            propName,
            componentName
          )
          return null
        },
        'foo',
        'baz'
      )(props, 'bar', 'TestComponent')
    ).to.be.an.instanceOf(Error)

    props.foo = null
    expect(
      xor(
        (
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { baz: PropTypes.func },
            props,
            propName,
            componentName
          )
          return null
        },
        'foo',
        'bar'
      )(props, 'baz', 'TestComponent')
    ).to.be.an.instanceOf(Error)
  })

  it('should still validate the prop', () => {
    const errorSpy = stub(console, 'error')

    const props = {
      foo: 27,
      bar: null,
      baz: null
    }

    xor(
      (
        props: { [key: string]: any },
        propName: string,
        componentName: string
      ) => {
        checkPropTypes(
          { foo: PropTypes.string },
          props,
          propName,
          componentName
        )
        return null
      },
      'bar',
      'baz'
    )(props, 'foo', 'TestComponent')

    expect(errorSpy).to.have.been.calledOnce()
  })
})
