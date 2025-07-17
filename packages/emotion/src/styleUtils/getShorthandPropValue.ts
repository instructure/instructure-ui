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
 * Gets prop values from a theme object for the given values.
 * @module getShorthandPropValue
 *
 * @param componentName The name of the component (just for error messages)
 * @param componentTheme A theme object of keys and values
 * @param propValue A space delimited string of values e.g. `"small large none"`
 * @param propName A prefix to combine with each propValue
 * @param matchCSSUnits Match valid CSS strings too like `1rem`. It's a simple
 * matcher, just checks whether the given string starts with a number and ends
 * with a string, e.g. `4rem`, `.5em`, `2.6px`, `5foo`
 * @returns A space-delimited string with the following values:
 * - `0` for the `0` or `none` `propValue`
 * - `auto` for the `auto` `propValue`
 * - `100%` for the `circle` `propValue`
 * - `999em` for the `pill` `propValue`
 * - The value in the theme object for the `${propName}-{nth propValue}` key, e.g.
 * `small` will be `0.2rem`
 */
function getShorthandPropValue(
  componentName: string,
  componentTheme: Record<string, string | number>,
  propValue: string | undefined,
  propName: string,
  matchCSSUnits: boolean = false
) {
  if (typeof propValue !== 'string' || isEmpty(componentTheme)) {
    return
  }
  return propValue
    .split(' ')
    .map((shortHandValue) => {
      if (shortHandValue === 'auto' || shortHandValue === '0') {
        return shortHandValue
      } else if (shortHandValue === 'none') {
        return '0'
      } else if (shortHandValue === 'circle') {
        return '100%'
      } else if (shortHandValue === 'pill') {
        return '999em'
      } else if (matchCSSUnits) {
        // try to match it as a CSS unit
        // matches [number][string] like '4rem', '.5em', '2.6px'
        if (shortHandValue.match(/^([+-]?(\d+\.?\d*|\.\d+))([a-zA-Z]+)$/)) {
          return shortHandValue
        }
      }
      const themeVariableName = camelize(`${propName}-${shortHandValue}`)
      const themeVariableValue = componentTheme[themeVariableName]
      error(
        typeof themeVariableValue !== 'undefined',
        `[${componentName}] '${themeVariableName}' is an invalid '${propName}' value.`
      )
      return themeVariableValue || '0'
    })
    .join(' ')
    .trim()
}

export default getShorthandPropValue
export { getShorthandPropValue }
