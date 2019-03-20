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
import parseQuery from '../parseQuery'


describe('@parseQuery', () => {
  it('returns the correct matches for width', () => {
    const query = {small: { minWidth: 100 }, medium: { minWidth: 500 }, large: { maxWidth: 700 }}

    let results = parseQuery(query)({ width: 100, height: 500 })
    expect(results.small).to.be.true()
    expect(results.medium).to.be.false()
    expect(results.large).to.be.true()

    results = parseQuery(query)({ width: 500, height: 500 })
    expect(results.small).to.be.true()
    expect(results.medium).to.be.true()
    expect(results.large).to.be.true()

    results = parseQuery(query)({ width: 701, height: 500 })
    expect(results.small).to.be.true()
    expect(results.medium).to.be.true()
    expect(results.large).to.be.false()
  })

  it('returns the correct matches for height', () => {
    const query = {small: { minHeight: 100 }, medium: { maxHeight: 500 }, large: { minHeight: 700 }}

    let results = parseQuery(query)({ width: 500, height: 100 })
    expect(results.small).to.be.true()
    expect(results.medium).to.be.true()
    expect(results.large).to.be.false()

    results = parseQuery(query)({ width: 500, height: 501 })
    expect(results.small).to.be.true()
    expect(results.medium).to.be.false()
    expect(results.large).to.be.false()

    results = parseQuery(query)({ width: 500, height: 700 })
    expect(results.small).to.be.true()
    expect(results.medium).to.be.false()
    expect(results.large).to.be.true()
  })

  it('returns the correct matches for combinations of width and height', () => {
    const query = {foo: { minHeight: 100 }, bar: { minWidth: 200 }, baz: { maxHeight: 700 }, qux: { maxWidth: 500}}

    let results = parseQuery(query)({ width: 200, height: 100 })
    expect(results.foo).to.be.true()
    expect(results.bar).to.be.true()
    expect(results.baz).to.be.true()
    expect(results.qux).to.be.true()

    results = parseQuery(query)({ width: 501, height: 701 })

    expect(results.foo).to.be.true()
    expect(results.bar).to.be.true()
    expect(results.baz).to.be.false()
    expect(results.qux).to.be.false()

    results = parseQuery(query)({ width: 199, height: 99 })
    expect(results.foo).to.be.false()
    expect(results.bar).to.be.false()
    expect(results.baz).to.be.true()
    expect(results.qux).to.be.true()
  })
})

