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

import { camelize } from '@instructure/ui-utils/lib/convertCase'
import warning from '@instructure/ui-utils/lib/warning'

/**
 * ---
 * category: utilities/themes
 * ---
 * Given a theme object, a string of space delimited prop values,
 * and a propName prefix, combines each prop value with the
 * propName prefix and replaces it with a corresponding value
 * from the theme object.
 *
 * @param {String} componentName - the name of the component (for warnings)
 * @param {Object} theme - a theme object of keys and values
 * @param {String} propValues - a space delimited string of values
 * @param {String} propName - a prefix to combine with each propValue
 * @returns {String} a string with each value replaced with a value from the theme object
 */
export default function getShorthandPropValue (componentName, theme, propValues, propName) {
  if (typeof propValues !== 'string') {
    return null
  }

  return propValues
    .split(' ')
    .map((propValue) => {
      if (propValue === 'auto' || propValue === '0') {
        return propValue
      }

      if (propValue === 'none') {
        return '0'
      }

      const value = camelize(`${propName}-${propValue}`)

      const theme_value = theme[value]
      warning(theme_value, '[%s] %s is an invalid %s value.', componentName, value, propName)

      return theme_value || '0'
    })
    .join(' ')
    .trim()
}
