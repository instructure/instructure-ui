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
import { isEmpty, camelize } from '@instructure/ui-utils'
import { logError as error } from '@instructure/console'

/**
 * ---
 * category: utilities/themes
 * ---
 * Given a theme object, a string of space delimited prop values,
 * and a propName prefix, combines each prop value with the
 * propName prefix and replaces it with a corresponding value
 * from the theme object.
 *
 * @param {String} componentName - the name of the component (for error messages)
 * @param {Object} componentTheme - a theme object of keys and values
 * @param {String} propValue - a space delimited string of values
 * @param {String} propName - a prefix to combine with each propValue
 * @returns {String} a string with each value replaced with a value from the theme object
 */
function getShorthandPropValue(
  componentName,
  componentTheme,
  propValue,
  propName
) {
  if (typeof propValue !== 'string' || isEmpty(componentTheme)) {
    return
  }

  return propValue
    .split(' ')
    .map((shortHandValue) => {
      if (shortHandValue === 'auto' || shortHandValue === '0') {
        return shortHandValue
      }

      if (shortHandValue === 'none') {
        return '0'
      }

      if (shortHandValue === 'circle') {
        return '100%'
      }

      if (shortHandValue === 'pill') {
        return '999em'
      }

      const themeVariableName = camelize(`${propName}-${shortHandValue}`)
      const themeVariableValue = componentTheme[themeVariableName]

      error(
        themeVariableValue,
        `[${componentName}] '${themeVariableName}' is an invalid '${propName}' value.`
      )

      return themeVariableValue || '0'
    })
    .join(' ')
    .trim()
}

export default getShorthandPropValue
export { getShorthandPropValue }
