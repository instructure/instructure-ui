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
import { getFontSize } from '@instructure/ui-dom-utils'

import { px } from '../px'

describe('px', () => {
  let node: HTMLDivElement | null

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  afterEach(() => {
    node && node.parentNode && node.parentNode.removeChild(node)
    node = null
  })

  it('handles px units', () => {
    expect(px('30px')).toEqual(30)
  })

  it('converts rem to px', () => {
    expect(px('50rem')).toEqual(50 * getFontSize())
  })

  it('converts em to px', () => {
    node!.style.fontSize = '24px'
    expect(px('10em', node)).toEqual(10 * getFontSize(node))
  })

  it('handles unitless input', () => {
    expect(px('4')).toEqual(4)
  })
})
