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
import { mergeDeep } from '../mergeDeep'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('mergeDeep', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should merge object properties without affecting any object', () => {
    const obj1 = { a: 0, b: 1 }
    const obj2 = { c: 2, d: 3 }
    const obj3 = { a: 4, d: 5 }

    const expected = { a: 4, b: 1, c: 2, d: 5 }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
    expect(mergeDeep({}, obj1, obj2, obj3)).to.deep.equal(expected)
    expect(expected).to.not.deep.equal(obj1)
    expect(expected).to.not.deep.equal(obj2)
    expect(expected).to.not.deep.equal(obj3)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should do a deep merge', () => {
    const obj1 = { a: { b: 1, c: 1, d: { e: 1, f: 1 } } }
    const obj2 = { a: { b: 2, d: { f: 'f' } } }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
    expect(mergeDeep(obj1, obj2)).to.deep.equal({
      a: { b: 2, c: 1, d: { e: 1, f: 'f' } }
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not merge strings', () => {
    const obj1 = { a: 'foo' }
    const obj2 = { a: { b: 2, d: { f: 'f' } } }
    const obj3 = { a: 'bar' }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    const result = mergeDeep(obj1, obj2, obj3)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.equal('bar')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should clone objects during merge', () => {
    const obj1 = { a: { b: 1 } }
    const obj2 = { a: { c: 2 } }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    const result = mergeDeep({}, obj1, obj2)

    expect(result).to.deep.equal({ a: { b: 1, c: 2 } })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.not.deep.equal(obj1.a)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.not.deep.equal(obj2.a)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not merge an object into an array', () => {
    const obj1 = { a: { b: 1 } }
    const obj2 = { a: ['foo', 'bar'] }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    const result = mergeDeep({}, obj1, obj2)

    expect(result).to.deep.equal({ a: ['foo', 'bar'] })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should deep clone arrays during merge', () => {
    const obj1 = { a: [1, 2, [3, 4]] }
    const obj2 = { b: [5, 6] }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
    const result = mergeDeep(obj1, obj2)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.deep.equal([1, 2, [3, 4]])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a[2]).to.deep.equal([3, 4])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'b' does not exist on type '{}'.
    expect(result.b).to.deep.equal(obj2.b)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should union when both values are array', () => {
    const obj1 = { a: [1, 2, [3, 4]] }
    const obj2 = { a: [5, 6] }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
    const result = mergeDeep(obj1, obj2)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.deep.equal([1, 2, [3, 4], 5, 6])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a[2]).to.deep.equal([3, 4])
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should union when the first value is an array', () => {
    const obj1 = { a: [1, 2, [3, 4]] }
    const obj2 = { a: 5 }
    const obj3 = { a: 6 }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    const result = mergeDeep(obj1, obj2, obj3)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.deep.equal([1, 2, [3, 4], 5, 6])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a[2]).to.deep.equal([3, 4])
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should uniquify array values', () => {
    const obj1 = { a: ['foo'] }
    const obj2 = { a: ['bar'] }
    const obj3 = { a: 'foo' }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    const result = mergeDeep(obj1, obj2, obj3)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'a' does not exist on type '{}'.
    expect(result.a).to.deep.equal(['foo', 'bar'])
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should copy source properties', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    expect(mergeDeep({ test: true }).test).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should not clone objects created with custom constructor', () => {
    function TestType() {}
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    const func = new TestType()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    expect(mergeDeep(func)).to.deep.equal(func)
  })
})
