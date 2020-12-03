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

import { cloneArray } from '../cloneArray'
import { deepEqual } from '../deepEqual'

describe('cloneArray', () => {
  it('should return an array', () => {
    const arr = [['one', 'two']['three']]

    const newArr = cloneArray(arr)

    expect(Array.isArray(newArr)).to.equal(true)
  })

  it('should preserve sub arrays', () => {
    const arr = [['one', 'two'], ['three'], [4, 5, 6], [7, [8, 9, 10], 11, 12]]

    const newArr = cloneArray(arr)

    expect(newArr.length).to.equal(4)
    expect(newArr[0].length).to.equal(2)
    expect(newArr[2][1]).to.equal(5)
    expect(Array.isArray(newArr[3][1])).to.equal(true)
    expect(newArr[3][1][2]).to.equal(10)
  })

  it('should return a new array', () => {
    let arr = [['one', 'two'], ['three']]
    let newArr = cloneArray(arr)

    expect(deepEqual(arr, newArr)).to.equal(true)
    newArr[0][1] = 2
    expect(deepEqual(arr, newArr)).to.equal(false)

    let newArr2 = cloneArray(arr)
    arr[0][0] = 1
    expect(deepEqual(arr, newArr2)).to.equal(false)
  })
})
