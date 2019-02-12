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

import generatePropCombinations from '../generatePropCombinations'

/* eslint-disable mocha/no-synchronous-tests */
describe('generatePropCombinations', () => {
  it('should return [] when passed empty prop values', () => {
    expect(generatePropCombinations({}))
      .to.deep.equal([])
  })

  it('should work for a single prop/value', () => {
    expect(generatePropCombinations({ foo: ['a']}))
      .to.deep.equal([{foo: 'a'}])
  })

  it('should work for multiple values', () => {
    expect(generatePropCombinations({
      foo: ['a', 'b']
    }))
      .to.deep.equal([
        {foo: 'a'},
        {foo: 'b'}
      ])
  })

  it('should work with multiple props/values', () => {
    const result = generatePropCombinations({
      foo: [1, 2],
      bar: ['a', 'b']
    })
    expect(result)
      .to.deep.equal([
       {foo: 1, bar: 'a'},
       {foo: 2, bar: 'a'},
       {foo: 1, bar: 'b'},
       {foo: 2, bar: 'b'}
      ])
  })

  it('should filter props/values', () => {
    const result = generatePropCombinations({
      foo: [1, 2],
      bar: ['a', 'b']
    }, (props) => props.foo === 2)
    expect(result)
      .to.deep.equal([
       {foo: 1, bar: 'a'},
       {foo: 1, bar: 'b'}
      ])
  })

  it('should work with props with values of differing lengths', () => {
    const result = generatePropCombinations({
      foo: [1, 2],
      bar: ['a', 'b', 'c']
    })
    expect(result)
      .to.deep.equal([
       {foo: 1, bar: 'a'},
       {foo: 2, bar: 'a'},
       {foo: 1, bar: 'b'},
       {foo: 2, bar: 'b'},
       {foo: 1, bar: 'c'},
       {foo: 2, bar: 'c'}
      ])
  })

  it('should throw when a prop value is null', () => {
    expect(() => {
      generatePropCombinations({foo: null})
    }).to.throw(Error)
  })

  it('should throw when a single prop has empty values', () => {
    expect(() => {
      generatePropCombinations({foo: []})
    }).to.throw(Error)
  })

  it('should throw when one of the props has empty prop values', () => {
    expect(() => {
      generatePropCombinations({validField: [1, 2, 3], foo: []})
    }).to.throw(Error)
  })
})
/* eslint-enable mocha/no-synchronous-tests */
