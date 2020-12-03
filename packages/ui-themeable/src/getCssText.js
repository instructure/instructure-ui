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

import { replaceValuesWithVariableNames } from './replaceValuesWithVariableNames'
import { formatVariableNames } from './formatVariableNames'
import { applyCustomMediaToCss } from './applyCustomMediaToCss'

/**
 * ---
 * category: utilities/themes
 * ---
 * Returns the CSS as a string with variables applied
 * @module getCssText
 * @param {Function} template A template function that returns the CSS as a string with variables injected
 * @param {Object} variables JS variables
 * @param {string} prefix CSS variable prefix/namespace
 * @returns {String} css text
 */
function getCssText(template, variables, prefix) {
  const variableNames = variables
    ? replaceValuesWithVariableNames(variables, prefix)
    : {}

  // inject the CSS variable names into the style template
  let cssText = template(variableNames)

  // inject values for @custom-media rules (https://www.w3.org/TR/2016/WD-mediaqueries-4-20160126/#custom-mq)
  const customMedia = variables ? () => formatVariableNames(variables) : {}
  cssText = applyCustomMediaToCss(cssText, customMedia)

  const cssVariablesString = variables
    ? formatVariableNames(variables, prefix)
    : ''

  // append the CSS variables (defaults) to the result
  cssText = [cssText, variablesToCSSText(cssVariablesString)].join('\n')

  return cssText
}

function variablesToCSSText(variables = {}) {
  const rules = []
  for (const key in variables) {
    if (
      Object.prototype.hasOwnProperty.call(variables, key) &&
      typeof variables[key] !== 'undefined'
    ) {
      rules.push(`${key}: ${variables[key]}`)
    }
  }

  if (rules.length > 0) {
    return `
      :root {
        ${rules.join(';\n')};
      }
    `
  } else {
    return ''
  }
}

export default getCssText
export { getCssText }
