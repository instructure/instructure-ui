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
import {
  mirrorShorthandCorners,
  mirrorShorthandEdges
} from '../mirrorShorthand'

describe('convertRtlShorthandEdges', () => {
  it('should not modify 1 value syntax', () => {
    const value = 'x-small'
    const result = mirrorShorthandEdges(value)
    expect(result).to.equal(value)
  })

  it('should not modify 2 value syntax', () => {
    const value = 'x-small xx-large'
    const result = mirrorShorthandEdges(value)
    expect(result).to.equal(value)
  })

  it('should not modify 3 value syntax', () => {
    const value = 'x-small medium x-large'
    const result = mirrorShorthandEdges(value)
    expect(result).to.equal(value)
  })

  it('should swap the second and fourth values with 4 value syntax', () => {
    const result = mirrorShorthandEdges('auto x-small none x-large')
    expect(result).to.equal('auto x-large none x-small')
  })
})

describe('convertRtlShorthandCorners', () => {
  it('should not modify 1 value syntax', () => {
    const value = 'x-small'
    const result = mirrorShorthandCorners(value)
    expect(result).to.equal(value)
  })

  it('should swap the first and second values with 2 value syntax', () => {
    const result = mirrorShorthandCorners('x-small xx-large')
    expect(result).to.equal('xx-large x-small')
  })

  it('should convert 3 value syntax to 4 value syntax and switch the values appropriately', () => {
    const result = mirrorShorthandCorners('x-small medium x-large')
    expect(result).to.equal('medium x-small medium x-large')
  })

  it('should appropriately switch shorthand values to rtl with 4 value syntax', () => {
    const result = mirrorShorthandCorners('auto x-small none x-large')
    expect(result).to.equal('x-small auto x-large none')
  })
})
