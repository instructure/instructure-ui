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

const fs = require('fs')
const path = require('path')

/**
 * Given a template file or directory containing template files, replaces template
 * variables of the form `${SOME_VARIABLE}` with the provided values.
 *
 * For example, given a template file with the following content:
 * ```js
 * // /someuser/project/src/example_template.js
 * const ${FUNC_NAME} = () => {
 *   return ${SOME_STRING}
 * }
 * ```
 *
 * If we executed the function with these arguments:
 * ```js
 * replaceTemplateVariables(
 *   root: '/someuser/project/src/example_template.js'
 *   values: { FUNC_NAME: 'myFunc', SOME_STRING: 'hello world' }
 * )
 * ```
 *
 * The file would be modified as follows:
 * ```js
 * // /someuser/project/src/example_template.js
 * const myFunc = () => {
 *   return 'hello world'
 * }
 * ```
 *
 * @param {Object} argv
 * @param {String} argv.root - The path to the file or root directory.
 * @param {Object} argv.values - A mapping of template variable names to replacement values
*/
module.exports = (argv) => {
  const { root, values } = argv

  const replaceTemplateVariables = ({ currentPath }) => {
    if (fs.statSync(currentPath).isDirectory()) {
      const items = fs.readdirSync(currentPath)

      items.forEach((item) => {
        replaceTemplateVariables({ currentPath: path.join(currentPath, item) })
      })
    } else if (fs.statSync(currentPath).isFile()) {
      const data = fs.readFileSync(currentPath, 'utf-8')

      let result = data
      Object.keys(values).forEach((templateValue) => {
        result = result.replace(new RegExp(`\\\${${templateValue}}`, 'g'), values[templateValue])
      })

      if (result !== data) {
        fs.writeFileSync(currentPath, result, 'utf-8')
      }
    }
  }

  replaceTemplateVariables({ currentPath: root })
}
