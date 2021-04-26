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
import { hash } from '../hash'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('hash', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should error if supplied value is undefined', () => {
    let error = false

    try {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      expect(hash(undefined)).to.equal('')
    } catch (err) {
      error = true
    }

    expect(error).to.be.true()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should allow specifying a max length', () => {
    const result = hash('some value', 4)
    expect(result).to.exist()
    expect(result.length).to.equal(4)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('strings', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical strings to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash('Some string with3_ distinct$() !_)(* va1ues')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash('Some string with3_ distinct$() !_)(* va1ues')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes different strings to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash('Some string with3_ distinct$() !_)(* va1ues')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash('Some string with3_ distinct$() !_)(* va1ues ')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('numbers', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical numbers to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(532)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(532)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two different numbers to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(532)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(5321)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('booleans', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes true to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(true)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(true)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes false to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(false)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(false)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes true and false to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(true)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(false)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('functions', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical arrow function expressions to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(() => 'foo')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(() => 'foo')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two different arrow function expressions to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(() => 'foo')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(() => 'bar')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical functions to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical functions with different names to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(function myFunc1() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical functions with different bodies to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(function myFunc() {
        const foo = 1
        const baz = 2
        return foo + baz
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('objects', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical simple objects to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical simple objects with rearranged keys to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        baz: 'baz',
        foo: 'foo',
        bar: 'bar'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two different simple objects to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        foo: 'foo',
        bar: 'ba',
        baz: 'baz'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical complex objects to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: [
          {
            qux: 'qux',
            qang: 'qaz'
          },
          {
            ['foo-bar']: true
          }
        ],
        baz: () => {
          const hello = 'hello'
          const world = 'world'

          return hello + world
        }
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        foo: 'foo',
        bar: [
          {
            qux: 'qux',
            qang: 'qaz'
          },
          {
            ['foo-bar']: true
          }
        ],
        baz: () => {
          const hello = 'hello'
          const world = 'world'

          return hello + world
        }
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical complex objects with rearranged keys to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: [
          {
            qux: 'qux',
            qang: 'qaz'
          },
          {
            ['foo-bar']: true
          }
        ],
        baz: () => {
          const hello = 'hello'
          const world = 'world'

          return hello + world
        }
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        bar: [
          {
            qux: 'qux',
            qang: 'qaz'
          },
          {
            ['foo-bar']: true
          }
        ],
        foo: 'foo',
        baz: () => {
          const hello = 'hello'
          const world = 'world'

          return hello + world
        }
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two different simple objects to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        foo: 'foo',
        bar: 'ba',
        baz: 'baz'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two different complex objects to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash({
        foo: 'foo',
        bar: [
          {
            qux: 'qux',
            qang: 'qaz'
          },
          {
            ['foobar']: true
          }
        ],
        baz: () => {
          const hello = 'hello'
          const world = 'world'

          return hello + world
        }
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash({
        foo: 'foo',
        bar: [
          {
            qux: 'qux',
            qang: 'qaz'
          },
          {
            ['foo-bar']: true
          }
        ],
        baz: () => {
          const hello = 'hello'
          const world = 'world'

          return hello + world
        }
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('classes', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two identical classes to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(
        class Something {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'settings' implicitly has an 'any' type.
          constructor(settings) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            this._settings = settings
          }

          // @ts-expect-error ts-migrate(1056) FIXME: Accessors are only available when targeting ECMASc... Remove this comment to see the full error message
          get settings() {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(
        class Something {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'settings' implicitly has an 'any' type.
          constructor(settings) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            this._settings = settings
          }

          // @ts-expect-error ts-migrate(1056) FIXME: Accessors are only available when targeting ECMASc... Remove this comment to see the full error message
          get settings() {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two classes with different content to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(
        class Something {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'settings' implicitly has an 'any' type.
          constructor(settings) {
            // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'settings' because it is a read-o... Remove this comment to see the full error message
            this.settings = settings
          }

          // @ts-expect-error ts-migrate(1056) FIXME: Accessors are only available when targeting ECMASc... Remove this comment to see the full error message
          get settings() {
            return this.settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(
        class Something {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'settings' implicitly has an 'any' type.
          constructor(settings) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            this._settings = settings
          }

          // @ts-expect-error ts-migrate(1056) FIXME: Accessors are only available when targeting ECMASc... Remove this comment to see the full error message
          get settings() {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes two classes with different names to different values', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(
        class Something {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'settings' implicitly has an 'any' type.
          constructor(settings) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            this._settings = settings
          }

          // @ts-expect-error ts-migrate(1056) FIXME: Accessors are only available when targeting ECMASc... Remove this comment to see the full error message
          get settings() {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(
        class Somethin {
          // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'settings' implicitly has an 'any' type.
          constructor(settings) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            this._settings = settings
          }

          // @ts-expect-error ts-migrate(1056) FIXME: Accessors are only available when targeting ECMASc... Remove this comment to see the full error message
          get settings() {
            // @ts-expect-error ts-migrate(2551) FIXME: Property '_settings' does not exist on type 'Somet... Remove this comment to see the full error message
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hashes null to the same value', () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result1 = hash(null)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const result2 = hash(null)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })
  })
})
