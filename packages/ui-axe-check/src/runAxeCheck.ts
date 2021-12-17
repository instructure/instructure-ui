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

import axeCore from 'axe-core'

type AxeCheckOptions = {
  exclude?: string | string[]
  /**
   * Violations to ignore/filter out. 'color-contrast' is automatically excluded
   * because we test color contrast in theme tests.
   */
  ignores?: string[]
}

export default async function runAxe(
  element: string,
  options: AxeCheckOptions = {}
) {
  let result: Error | true = true
  const context: axeCore.ContextObject = {
    include: [element],
    exclude: options.exclude
  }
  const config = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'section508', 'best-practice']
    }
  } as axeCore.RunOptions

  try {
    const axeResult = await axeCore.run(context, config)

    // violations to ignore/filter out
    const ignores = [
      ...(options.ignores || []),
      'aria-hidden-focus', // TODO: remove this and fix the broken tests
      'color-contrast' // because we test color contrast in theme tests
    ]

    const violations = (axeResult.violations || []).filter(
      (violation) => !ignores.includes(violation.id)
    )

    violations.forEach((violation) => {
      /* eslint-disable no-console */
      console.groupCollapsed(`[${violation.id}] ${violation.help}`)
      violation.nodes.forEach(function (node) {
        const el = document.querySelector(node.target.toString())
        if (!el) {
          console.info(node.target.toString())
        } else {
          console.info(el)
        }
      })
      console.groupEnd()
      /* eslint-enable no-console */
    })

    if (violations.length > 0) {
      result = new Error(formatError(violations))
    }
  } catch (err: any) {
    result = err
  }
  return result
}

function formatError(violations: axeCore.Result[]) {
  return violations
    .map((violation) => {
      return [
        `[${violation.id}] ${violation.help}`,
        violation.nodes
          .map(function (node) {
            return node.target.toString()
          })
          .join('\n'),
        violation.description,
        `${violation.helpUrl}\n`
      ].join('\n')
    })
    .join('\n')
}
