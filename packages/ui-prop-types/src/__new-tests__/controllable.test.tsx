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

import { vi } from 'vitest'
import PropTypes, { checkPropTypes } from 'prop-types'
import '@testing-library/jest-dom'
import { controllable } from '../index'

describe('controllable', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should accept when prop type is correct and handler is provided', () => {
    const errorSpy = vi.spyOn(console, 'error')

    const props = {
      selected: true,
      onSelect: () => {},
      defaultSelected: false
    }
    // the "as any" casts are needed because its not needed to implement
    // the full requirable interface for the tests.
    expect(
      controllable(
        ((
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { selected: PropTypes.bool },
            props,
            propName,
            componentName
          )
          return null
        }) as any,
        'onSelect',
        'defaultSelected'
      )(props, 'selected', 'TestComponent')
    ).toBeNull()
    expect(errorSpy).not.toHaveBeenCalled()
  })

  it('should reject when the prop type is incorrect', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const props = {
      selected: 'wrong type supplied',
      onSelect: () => {},
      defaultSelected: false
    }

    expect(
      controllable(
        ((
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { selected: PropTypes.bool },
            props,
            propName,
            componentName
          )
          return null
        }) as any,
        'onSelect',
        'defaultSelected'
      )(props, 'selected', 'TestComponent')
    ).toBeNull()
    expect(errorSpy).toHaveBeenCalledTimes(1)
  })

  it('should reject when corresponding handler is not provided', () => {
    const props = {
      selected: true,
      onSelect: null,
      defaultSelected: false
    }
    expect(
      controllable(
        ((
          props: { [key: string]: any },
          propName: string,
          componentName: string
        ) => {
          checkPropTypes(
            { selected: PropTypes.bool },
            props,
            propName,
            componentName
          )
          return null
        }) as any,
        'onSelect',
        'defaultSelected'
      )(props, 'selected', 'TestComponent')
    ).toBeInstanceOf(Error)
  })
})
