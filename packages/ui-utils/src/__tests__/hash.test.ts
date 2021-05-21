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

describe('hash', () => {
  it('should error if supplied value is undefined', () => {
    let error = false

    try {
      expect(hash(undefined)).to.equal('')
    } catch (err) {
      error = true
    }

    expect(error).to.be.true()
  })

  it('should allow specifying a max length', () => {
    const result = hash('some value', 4)
    expect(result).to.exist()
    expect(result.length).to.equal(4)
  })

  describe('strings', () => {
    it('hashes two identical strings to the same value', () => {
      const result1 = hash('Some string with3_ distinct$() !_)(* va1ues')
      const result2 = hash('Some string with3_ distinct$() !_)(* va1ues')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes different strings to different values', () => {
      const result1 = hash('Some string with3_ distinct$() !_)(* va1ues')
      const result2 = hash('Some string with3_ distinct$() !_)(* va1ues ')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  describe('numbers', () => {
    it('hashes two identical numbers to the same value', () => {
      const result1 = hash(532)
      const result2 = hash(532)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes two different numbers to different values', () => {
      const result1 = hash(532)
      const result2 = hash(5321)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  describe('booleans', () => {
    it('hashes true to the same value', () => {
      const result1 = hash(true)
      const result2 = hash(true)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes false to the same value', () => {
      const result1 = hash(false)
      const result2 = hash(false)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes true and false to different values', () => {
      const result1 = hash(true)
      const result2 = hash(false)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })
  })

  describe('functions', () => {
    it('hashes two identical arrow function expressions to the same value', () => {
      const result1 = hash(() => 'foo')
      const result2 = hash(() => 'foo')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes two different arrow function expressions to different values', () => {
      const result1 = hash(() => 'foo')
      const result2 = hash(() => 'bar')

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    it('hashes two identical functions to the same value', () => {
      const result1 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      const result2 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes two identical functions with different names to different values', () => {
      const result1 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      const result2 = hash(function myFunc1() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    it('hashes two identical functions with different bodies to different values', () => {
      const result1 = hash(function myFunc() {
        const foo = 1
        const bar = 2
        return foo + bar
      })

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

  describe('objects', () => {
    it('hashes two identical simple objects to the same value', () => {
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      const result2 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes two identical simple objects with rearranged keys to the same value', () => {
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      const result2 = hash({
        baz: 'baz',
        foo: 'foo',
        bar: 'bar'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })

    it('hashes two different simple objects to different values', () => {
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })

      const result2 = hash({
        foo: 'foo',
        bar: 'ba',
        baz: 'baz'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    it('hashes two identical complex objects to the same value', () => {
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

    it('hashes two identical complex objects with rearranged keys to the same value', () => {
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

    it('hashes two different simple objects to different values', () => {
      const result1 = hash({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      })
      const result2 = hash({
        foo: 'foo',
        bar: 'ba',
        baz: 'baz'
      })

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    it('hashes two different complex objects to the same value', () => {
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

  describe('classes', () => {
    it('hashes two identical classes to the same value', () => {
      const result1 = hash(
        class Something {
          private _settings: number
          constructor(settings: number) {
            this._settings = settings
          }

          get settings() {
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      const result2 = hash(
        class Something {
          private _settings: number
          constructor(settings: number) {
            this._settings = settings
          }

          get settings() {
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

    it('hashes two classes with different content to different values', () => {
      const result1 = hash(
        class Something {
          private _settings: number
          constructor(settings: number) {
            this._settings = settings
          }
          get settings() {
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      const result2 = hash(
        class Something {
          private _settings: number
          constructor(settings: number) {
            this._settings = settings
          }

          get settings() {
            return this._settings
          }

          doSomething = () => {
            return 'doing something else'
          }
        }
      )

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.not.equal(result2)
    })

    it('hashes two classes with different names to different values', () => {
      const result1 = hash(
        class Something {
          private _settings: number
          constructor(settings: number) {
            this._settings = settings
          }

          get settings() {
            return this._settings
          }

          doSomething = () => {
            return 'doing something'
          }
        }
      )

      const result2 = hash(
        class Somethin {
          private _settings: number
          constructor(settings: number) {
            this._settings = settings
          }

          get settings() {
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

    it('hashes null to the same value', () => {
      const result1 = hash(null)
      const result2 = hash(null)

      expect(result1).to.exist()
      expect(result2).to.exist()

      expect(result1).to.equal(result2)
    })
  })
})
