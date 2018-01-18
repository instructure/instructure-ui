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

import canUseDOM from '@instructure/ui-utils/lib/dom/canUseDOM'

/**
* ---
* category: utilities/i18n
* ---
* Localization utilities
* @module Locale
*/
export default {
  /**
  * Return the locale from the browser
  * @returns {String} locale (defaults to 'en')
  */
  browserLocale (nav) {
    let language = 'en-US'

    if (canUseDOM && window && window.navigator) {
      if (window.navigator.languages && window.navigator.languages.length > 0) {
        language = window.navigator.languages[0]
      } else if (window.navigator.language) {
        language = window.navigator.language || window.navigator.browserLanguage
      }
    }

    return nav ? nav.language : language
  }
}
