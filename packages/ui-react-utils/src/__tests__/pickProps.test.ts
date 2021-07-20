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

import PropTypes from 'prop-types'
import { expect } from '@instructure/ui-test-utils'
import { pickProps } from '../pickProps'

describe('pickProps', () => {
  it('should work with propTypes', () => {
    //arrange
    const propTypes = {
      prop1: PropTypes.string.isRequired,
      prop2: PropTypes.number
    }

    const inputProps = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp: 'excessiveValue'
    }

    const expectedResult = {
      prop1: 'hello',
      prop2: 42
    }
    //act
    const actualResult = pickProps(inputProps, propTypes)

    //assert
    expect(actualResult).to.be.eql(expectedResult)
  })

  it('should add the `include` keys to the result with PropTypes', () => {
    const propTypes = {
      prop1: PropTypes.string.isRequired,
      prop2: PropTypes.number
    }
    const inputProps = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp1: 'excessiveValue1',
      excessiveProp2: 'excessiveValue2'
    }
    const expectedResult = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp2: 'excessiveValue2'
    }

    const actualResult = pickProps(inputProps, propTypes, ['excessiveProp2'])

    expect(actualResult).to.be.eql(expectedResult)
  })

  it('should work with an input of a list allowed prop names', () => {
    const allowedPropKeys = ['prop1', 'prop2']
    const inputProps = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp1: 'excessiveValue1'
    }
    const expectedResult = {
      prop1: 'hello',
      prop2: 42
    }

    const actualResult = pickProps(inputProps, allowedPropKeys)

    expect(actualResult).to.be.eql(expectedResult)
  })

  it('should add the `include` keys to the result with a list allowed prop names', () => {
    const allowedPropKeys = ['prop1', 'prop2']
    const inputProps = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp1: 'excessiveValue1',
      excessiveProp2: 'excessiveValue2'
    }
    const expectedResult = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp2: 'excessiveValue2'
    }

    const actualResult = pickProps(inputProps, allowedPropKeys, [
      'excessiveProp2'
    ])

    expect(actualResult).to.be.eql(expectedResult)
  })
})
