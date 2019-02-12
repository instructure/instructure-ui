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

import uid from '../index'

/* eslint-disable mocha/no-synchronous-tests */
describe('uid', () => {
  it('generates a specified length', () => {
    expect(uid('', 5).length).to.equal(5)
    expect(uid('', 8).length).to.equal(8)
    expect(uid('', 12).length).to.equal(12)
    expect(uid('', 16).length).to.equal(16)
  })

  it('should run a bunch and never get duplicates', () => {
    const results = new Set()
    for (let x = 0; x < 5000; x++) {
      results.add(expect(uid('', 7)))
    }
    expect(results.size).to.be.eql(5000)
  })
})
/* eslint-enable mocha/no-synchronous-tests */
