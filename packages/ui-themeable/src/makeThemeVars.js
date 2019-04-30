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

import { camelize } from '@instructure/ui-utils'

/**
 * ---
 * category: utilities/themes
 * ---
 * Given a prefix and a theme object, prepends the object keys with
 * the designated prefix and camel cases the concatenation.
 *
 * @param {String} prefix - a string to prepend to object keys
 * @param {Object} vars - an object
 * @returns {Object} a modified object with prefixed keys
 */
function makeThemeVars (prefix, vars) {
  const themeVars = {}
  Object.keys(vars).forEach(variable => {
    themeVars[camelize(`${prefix}-${variable}`)] = vars[variable]
  })
  return themeVars
}

export default makeThemeVars
export { makeThemeVars }
