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

import { transformSelection, transformCursor } from '../transformSelection'

describe('transformSelection', () => {
  it('should work with transformCursor', () => {
    const paramObj = {
      selectionStart: 2,
      selectionEnd: 3,
      selectionDirection: 'none',
      value: '1x2345'
    }

    const result = transformSelection(paramObj as HTMLTextAreaElement, '12345')

    expect(result).toEqual({
      selectionStart: 1,
      selectionEnd: 2,
      selectionDirection: 'none'
    })
  })
})

describe('transformCursor', () => {
  it('should retain cursor at the end', () => {
    const dirtyValue = '12_xxxx_'
    const cleanedValue = '12'
    const cursorIndex = dirtyValue.length

    expect(transformCursor(cursorIndex, dirtyValue, cleanedValue)).toBe(
      cleanedValue.length
    )
  })

  it('should retain cursor at the start', () => {
    const dirtyValue = '12_xxxx_67'
    const cleanedValue = '1267'
    const cursorIndex = 0

    expect(transformCursor(cursorIndex, dirtyValue, cleanedValue)).toBe(0)
  })

  it('should retain cursor between cleaned values', () => {
    const dirtyValue = '12_xxxx_67'
    const cleanedValue = '1267'
    const cursorIndex = 6

    expect(transformCursor(cursorIndex, dirtyValue, cleanedValue)).toBe(2)
  })

  it('should retain cursor after cleaned values', () => {
    const dirtyValue = '12_xxxx_67'
    const cleanedValue = '1267'
    const cursorIndex = dirtyValue.length - 1

    expect(transformCursor(cursorIndex, dirtyValue, cleanedValue)).toBe(3)
  })
})
