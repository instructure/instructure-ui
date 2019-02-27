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

const postcss = require('postcss')

module.exports = postcss.plugin('postcss-themeable-styles', () => {
  return (css, result) => {
    css.walkRules((rule) => {
      rule.walkDecls((decl) => {
        let { value } = decl
        getMatches(value, /var\(--([^)]+)\)?/g)
          .forEach((match) => {
            const matcher = new RegExp(match[0].replace(/[\\^$*+?.()|[\]{}]/g, '\\$&'), 'gm')
            // eslint-disable-next-line no-useless-escape
            value = value.replace(matcher, `\$\{theme.${match[1]} || 'none'\}`)
          })
        decl.value = value // eslint-disable-line no-param-reassign
      })
    })
  }
})

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
