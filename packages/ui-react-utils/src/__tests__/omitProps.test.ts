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
import { omitProps } from '../omitProps'

describe('omitProps', () => {
  it('should work with PropTypes', () => {
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
      excessiveProp: 'excessiveValue'
    }

    //act
    const actualResult = omitProps(inputProps, propTypes)

    //assert
    expect(actualResult).to.be.eql(expectedResult)
  })
  it('should work with PropTypes and exclude the given keys', () => {
    //arrange
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
      excessiveProp2: 'excessiveValue2'
    }

    //act
    const actualResult = omitProps(inputProps, propTypes, ['excessiveProp1'])

    //assert
    expect(actualResult).to.be.eql(expectedResult)
  })
  it('should work with an input of a list allowed prop names', () => {
    //arrange
    const allowedPropKeys = ['prop1', 'prop2']

    const inputProps = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp1: 'excessiveValue1',
      excessiveProp2: 'excessiveValue2'
    }

    const expectedResult = {
      excessiveProp1: 'excessiveValue1',
      excessiveProp2: 'excessiveValue2'
    }

    //act
    const actualResult = omitProps(inputProps, allowedPropKeys)

    //assert
    expect(actualResult).to.be.eql(expectedResult)
  })
  it('should work with an input of a list allowed prop names and exclude the given keys', () => {
    //arrange
    const allowedPropKeys = ['prop1', 'prop2']

    const inputProps = {
      prop1: 'hello',
      prop2: 42,
      excessiveProp1: 'excessiveValue1',
      excessiveProp2: 'excessiveValue2'
    }

    const expectedResult = {
      excessiveProp2: 'excessiveValue2'
    }

    //act
    const actualResult = omitProps(inputProps, allowedPropKeys, [
      'excessiveProp1'
    ])

    //assert
    expect(actualResult).to.be.eql(expectedResult)
  })
})
