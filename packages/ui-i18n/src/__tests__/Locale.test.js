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
import Locale from '../Locale'

describe('browserLocale', () => {
  it('returns the navigator language if a navigator is explicity passed', () => {
    const navigator = { language: 'de' }
    expect(Locale.browserLocale(navigator)).to.equal('de')
  })

  describe('with document lang attribute', () => {
    it('returns the document locale if no navigator is passed', () => {
      document.documentElement.lang = 'fr'
      expect(Locale.browserLocale()).to.equal('fr')
    })
  })

  it('returns the browser locale if no navigator is passed, or "en-US" if no browser locale is set', () => {
    const expectedLanguage = navigator ? navigator.language : 'en-US'
    expect(Locale.browserLocale()).to.equal(expectedLanguage)
  })

  it('returns the default "en-US" if navigator is undefined and the DOM is unavailable', () => {
    expect(Locale.browserLocale(null, false)).to.equal('en-US')
  })
})
