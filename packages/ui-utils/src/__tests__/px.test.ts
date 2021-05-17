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
import { getFontSize } from '@instructure/ui-dom-utils'

import { px } from '../px'

describe('px', () => {
  // @ts-expect-error ts-migrate(7034) FIXME: Variable 'node' implicitly has type 'any' in some ... Remove this comment to see the full error message
  let node

  beforeEach(() => {
    node = document.createElement('div')
    document.body.appendChild(node)
  })

  afterEach(() => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'node' implicitly has an 'any' type.
    node && node.parentNode && node.parentNode.removeChild(node)
    node = null
  })

  it('handles px units', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(px('30px')).to.equal(30)
  })

  it('converts rem to px', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(px('50rem')).to.equal(50 * getFontSize())
  })

  it('converts em to px', () => {
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'node' implicitly has an 'any' type.
    node.style.fontSize = '24px'
    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'node' implicitly has an 'any' type.
    expect(px('10em', node)).to.equal(10 * getFontSize(node))
  })

  it('handles unitless input', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(px('4')).to.equal(4)
  })
})
