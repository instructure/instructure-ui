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
import { pascalize } from '../pascalize'

describe('convertCase', () => {
  describe('pascalize', () => {
    it('handles hyphenated strings', () => {
      expect(pascalize('foo-bar')).toEqual('FooBar')
      expect(pascalize('baz-qux-foo')).toEqual('BazQuxFoo')
      expect(pascalize('x-large')).toEqual('XLarge')
      expect(pascalize('x-x-small')).toEqual('XXSmall')
    })

    it('handles camel cased strings', () => {
      expect(pascalize('fooBar')).toEqual('FooBar')
      expect(pascalize('bazQuxFoo')).toEqual('BazQuxFoo')
      expect(pascalize('xLarge')).toEqual('XLarge')
      expect(pascalize('borderRadiusLarge')).toEqual('BorderRadiusLarge')
    })

    it('does not modify already pascal cased strings', () => {
      expect(pascalize('FooBar')).toEqual('FooBar')
      expect(pascalize('BazQuxFoo')).toEqual('BazQuxFoo')
      expect(pascalize('XLarge')).toEqual('XLarge')
      expect(pascalize('BorderRadiusLarge')).toEqual('BorderRadiusLarge')
    })
  })
})
