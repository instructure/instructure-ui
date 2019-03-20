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
import { camelize, pascalize } from '../convertCase'


describe('convertCase', () => {
  describe('camelize', () => {
    it('handles hyphenated strings', () => {
      expect(camelize('foo-bar')).to.equal('fooBar')
      expect(camelize('baz-qux-foo')).to.equal('bazQuxFoo')
      expect(camelize('xx-small')).to.equal('xxSmall')
      expect(camelize('border-radius-x-large')).to.equal('borderRadiusXLarge')
      expect(camelize('margin-xxLarge')).to.equal('marginXxLarge')
    })

    it('does not modify already camel cased strings', () => {
      expect(camelize('fooBar')).to.equal('fooBar')
      expect(camelize('bazQuxFoo')).to.equal('bazQuxFoo')
    })
  })

  describe('pascalize', () => {
    it('handles hyphenated strings', () => {
      expect(pascalize('foo-bar')).to.equal('FooBar')
      expect(pascalize('baz-qux-foo')).to.equal('BazQuxFoo')
      expect(pascalize('x-large')).to.equal('XLarge')
      expect(pascalize('x-x-small')).to.equal('XXSmall')
    })

    it('handles camel cased strings', () => {
      expect(pascalize('fooBar')).to.equal('FooBar')
      expect(pascalize('bazQuxFoo')).to.equal('BazQuxFoo')
      expect(pascalize('xLarge')).to.equal('XLarge')
      expect(pascalize('borderRadiusLarge')).to.equal('BorderRadiusLarge')
    })

    it('does not modify already pascal cased strings', () => {
      expect(pascalize('FooBar')).to.equal('FooBar')
      expect(pascalize('BazQuxFoo')).to.equal('BazQuxFoo')
      expect(pascalize('XLarge')).to.equal('XLarge')
      expect(pascalize('BorderRadiusLarge')).to.equal('BorderRadiusLarge')
    })
  })
})

