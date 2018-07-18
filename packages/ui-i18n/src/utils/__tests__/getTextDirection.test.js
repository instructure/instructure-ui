/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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
import React from 'react'
import getTextDirection from '../getTextDirection'

describe('getTextDirection', () => {
  const testbed = new Testbed(<div><h1>Hello</h1></div>)

  beforeEach(() => {
    testbed.setTextDirection('ltr')
    getTextDirection.resetDefault()
  })

  it('defaults the dir of <html>', () => {
    expect(getTextDirection()).to.equal(document.documentElement.getAttribute('dir'))
  })

  it('defaults to the dir of <html> when passed an element', () => {
    const subject = testbed.render()

    expect(getTextDirection(subject.node)).to.equal('ltr')
  })

  it('returns "rtl" if the `dir` of the element is "rtl"', () => {
    const subject = testbed.render({
      dir: 'rtl'
    })

    expect(getTextDirection(subject.node)).to.equal('rtl')
  })

  it('inherits value set by ancestor', () => {
    const subject = testbed.render({
      dir: 'rtl'
    })

    expect(getTextDirection(subject.find('h1').node)).to.equal('rtl')
  })
})
