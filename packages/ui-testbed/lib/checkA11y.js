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

const reject = require('lodash.reject')
const axe = require('axe-core')

module.exports = function checkA11y (node, options = {}, done) {
  const exclude = options.exclude || []
  const ignores = options.ignores || []
  const axeConfig = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'section508', 'best-practice']
    }
  }

  axe.a11yCheck({ include: [node], exclude }, axeConfig, (result) => {
    const violations = reject(result.violations, (violation) => {
      return (ignores.indexOf(violation.id) >= 0)
    })

    violations.forEach((violation) => {
      /* eslint-disable no-console */
      console.groupCollapsed(`[${violation.id}] ${violation.help}`)
      violation.nodes.forEach((node) => {
        const el = document.querySelector(node.target.toString())
        if (!el) {
          console.log(node.target.toString())
        } else {
          console.log(el)
        }
      })
      console.groupEnd()
      /* eslint-enable no-console */
    })

    done({
      violations,
      error: violations.length > 0 ? new Error(formatError(violations)) : null
    })
  })
}

function formatError (violations) {
  return violations.map((violation) => {
    return [
      `[${violation.id}] ${violation.help}`,
      violation.nodes.map((node) => {
        return node.target.toString()
      }).join('\n'),
      violation.description,
      `${violation.helpUrl}\n`
    ].join('\n')
  })
}
