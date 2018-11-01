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
import transformSelection, { transformCursor } from '../transformSelection'

describe('transformSelection', () => {
  it('should work with transformCursor', () => {
    const selectionStart = 2
    const selectionEnd = 3
    const selectionDirection = 'none'
    const value = '1a2345'

    expect(transformSelection({
      selectionStart,
      selectionEnd,
      selectionDirection,
      value
    }, '12345')).to.eql({
      selectionStart: 1,
      selectionEnd: 2,
      selectionDirection
    })
  })
})

describe('transformCursor', () => {
  it('should retain cursor at the end', () => {
    const dirtyValue = '12asdfghjk'
    const cleanedValue = '12'
    const cursorIndex = dirtyValue.length

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(cleanedValue.length)
  })

  it('should retain cursor at the start', () => {
    const dirtyValue = '12dfghjkl67'
    const cleanedValue = '1267'
    const cursorIndex = 0

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(0)
  })

  it('should retain cursor between cleaned values', () => {
    const dirtyValue = '12dfghjkl67'
    const cleanedValue = '1267'
    const cursorIndex = 6

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(2)
  })

  it('should retain cursor after cleaned values', () => {
    const dirtyValue = '12dfghjkl67'
    const cleanedValue = '1267'
    const cursorIndex = dirtyValue.length - 1

    expect(transformCursor(
      cursorIndex, dirtyValue, cleanedValue
    )).to.equal(3)
  })
})
