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

import { canUseDOM } from '@instructure/ui-dom-utils'
import { isEdge } from '@instructure/ui-utils'

let cachedReturnVal
/**
 * ---
 * category: utilities/DOM
 * ---
 * check if CSS custom properties (CSS variables) are supported
 * @returns {Boolean} true if the DOM is available and CSS variables are supported
 */
function customPropertiesSupported () {
  if (typeof cachedReturnVal !== 'undefined') return cachedReturnVal

  // Since JSDOM doesn't need to support CSS Custom properties to work correctly, we will
  // say that they are supported if we are in JSDOM. This will keep unnecessary style tags
  // from being added to the DOM, keeping test output clean.
  const environmentIsJSDOM =
    navigator && navigator.userAgent && navigator.userAgent.includes('jsdom')
  const browserSupportsCustomProperties =
    window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--primary)')

  return cachedReturnVal = (
    canUseDOM &&
    !isEdge && // polyfill edge until improved css variable support
    (browserSupportsCustomProperties || environmentIsJSDOM)
  )
}

export default customPropertiesSupported
export { customPropertiesSupported }
