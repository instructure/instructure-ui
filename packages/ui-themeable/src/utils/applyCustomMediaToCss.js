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


/**
 * ---
 * category: utilities/themes
 * ---
 * Polyfill custom media for [themeable](#themeable) components.
 * Searches for strings like `(--mediumMin)` and replaces it with the
 * variable value (e.g. `variables.mediumMin`)
 * @param {String} cssText the CSS text to apply the custom media to
 * @param {Object} variables object containing custom media variables
 * @returns {String} CSS text with custom media values applied
 */
export default function applyCustomMediaToCss (cssText, variables) {
  const matches = getMatches(cssText, /@media\s*[^(]*\((--[^)]+)\)?/g)
  let result = cssText

  matches.forEach((match) => {
    const matcher = new RegExp(match[1].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm')

    result = result.replace(matcher, variables[match[1]])
  })

  return result
}

function getMatches (str, regex) {
  const matches = []
  let match
  let matcher = regex

  matcher.lastIndex = 0
  matcher = new RegExp(matcher.source, 'g')

  // eslint-disable-next-line no-cond-assign
  while ((match = matcher.exec(str)) !== null) {
    matches.push(match)

    if (matcher.lastIndex === match.index) {
      matcher.lastIndex++
    }
  }

  return matches
}
