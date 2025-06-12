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

import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { createChainedFunction } from '../createChainedFunction'

describe('createChainedFunction', () => {
  it('should return null if no function provided', () => {
    expect(createChainedFunction(null, undefined)).toEqual(null)
  })

  it('should return a function', () => {
    expect(typeof createChainedFunction(() => {})).toEqual('function')
  })

  it('should throw an error if something other than function, null, undefined provided', () => {
    expect(() => {
      // @ts-expect-error intentionally bad code
      createChainedFunction(12345)
    }).toThrow(Error)
  })

  it('should execute all the functions', () => {
    const spies = Array.from({ length: 5 }, () => vi.fn())
    const chain = createChainedFunction(...spies)

    chain!()

    spies.forEach((spy) => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
