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


import getOptionId from '../getOptionId'

describe('getOptionId', () => {
  it('gives out null when no valid id or value is present', () => {
    expect(getOptionId()).to.equal(null)
    expect(getOptionId({})).to.equal(null)
    expect(getOptionId({ children: '1' })).to.equal(null)
    expect(getOptionId([2])).to.equal(null)
    expect(getOptionId(3)).to.equal(null)
  })

  it('prioritizes id attribute over value', () => {
    expect(getOptionId({ id: 1, value: 2 })).to.equal(1)
    expect(getOptionId({ notId: 1, value: 2 })).to.equal(2)
    expect(getOptionId({ id: undefined, value: 2 })).to.equal(2)  // eslint-disable-line no-undefined
    expect(getOptionId({ id: null, value: 2 })).to.equal(2)
    expect(getOptionId({ id: 'not null?', value: 2 })).to.equal('not null?')
    let id = {}
    expect(getOptionId({ id, value: 2 })).to.equal(id)
    id = []
    expect(getOptionId({ id, value: 2 })).to.equal(id)
    id = () => {}
    expect(getOptionId({ id, value: 2 })).to.equal(id)
  })
})
