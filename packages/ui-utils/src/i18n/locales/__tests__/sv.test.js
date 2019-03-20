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
import numeral from 'numeral'
import '../sv'

numeral.locale('sv')


describe('ordinal', () => {
  it('formats 1 ordinal as 1:a', () => {
    expect(numeral(1).format('0o')).to.equal('1:a')
  })

  it('formats 2 ordinal as 2:a', () => {
    expect(numeral(2).format('0o')).to.equal('2:a')
  })

  it('formats 10 ordinal as 10:e', () => {
    expect(numeral(10).format('0o')).to.equal('10:e')
  })

  it('formats 11 ordinal as 11:e', () => {
    expect(numeral(11).format('0o')).to.equal('11:e')
  })

  it('formats 12 ordinal as 12:e', () => {
    expect(numeral(12).format('0o')).to.equal('12:e')
  })

  it('formats 20 ordinal as 20:e', () => {
    expect(numeral(20).format('0o')).to.equal('20:e')
  })

  it('formats 21 ordinal as 21:a', () => {
    expect(numeral(21).format('0o')).to.equal('21:a')
  })

  it('formats 22 ordinal as 22:a', () => {
    expect(numeral(22).format('0o')).to.equal('22:a')
  })

  it('formats 23 ordinal as 23:e', () => {
    expect(numeral(23).format('0o')).to.equal('23:e')
  })
})

