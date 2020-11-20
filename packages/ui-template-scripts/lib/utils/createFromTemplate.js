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

const fse = require('fs-extra')
const path = require('path')

const template = require('lodash.template')

/**
 * Given a template file or directory containing a template, replaces template
 * variables of the form `<%= SOME_VARIABLE %>` with the provided values and
 * outputs source code to a specified location.
 *
 * For example, given a template file with the following content:
 * ```js
 * // /someuser/sometemplate/example_template.js
 * const <%= FUNC_NAME %> = () => {
 *   return <%= SOME_STRING %>
 * }
 * ```
 *
 * If we executed the function with these arguments:
 * ```js
 * createFromTemplate(
 *   template: '/someuser/sometemplate/example_template.js'
 *   dest: '/someuser/destination/myfunc.js'
 *   values: { FUNC_NAME: 'myFunc', SOME_STRING: 'hello world' }
 * )
 * ```
 *
 * The following file would be generated at the destination:
 * ```js
 * // /someuser/destination/myfunc.js
 * const myFunc = () => {
 *   return 'hello world'
 * }
 * ```
 *
 * @param {Object} argv
 * @param {String} argv.template - The path to the template file or directory.
 * @param {String} argv.dest - The path where the generated source will be located.
 * @param {Object} argv.values - A mapping of template variable names to replacement values.
 */
module.exports = (argv = {}) => {
  const { template: templatePath, dest, values = {} } = argv

  // Replace any template vars in filenames/dirnames
  const replaceBasenameTemplateVars = ({ basename }) => {
    let newBasename = basename
    Object.keys(values).forEach((templateValue) => {
      newBasename = newBasename.replace(
        new RegExp(`{${templateValue}}`, 'g'),
        values[templateValue]
      )
    })

    return newBasename
  }

  const generateSourceFromTemplate = ({ currentPath, destPath }) => {
    if (fse.statSync(currentPath).isDirectory()) {
      // Create the directory at the dest path
      const basename = path.basename(currentPath)
      const newBasename = replaceBasenameTemplateVars({ basename })
      const outputPath =
        basename !== newBasename
          ? path.join(path.dirname(destPath), newBasename)
          : destPath
      fse.mkdirSync(outputPath)

      const items = fse.readdirSync(currentPath)

      items.forEach((item) => {
        generateSourceFromTemplate({
          currentPath: path.join(currentPath, item),
          destPath: path.join(outputPath, item)
        })
      })
    } else if (fse.statSync(currentPath).isFile()) {
      const data = fse.readFileSync(currentPath, 'utf-8')

      const result = template(data)(values)

      const extension = path.extname(currentPath)
      const basename =
        extension === '.ejs'
          ? path.basename(currentPath, extension)
          : path.basename(currentPath)

      fse.outputFileSync(
        path.join(
          path.dirname(destPath),
          replaceBasenameTemplateVars({ basename })
        ),
        result,
        'utf-8'
      )
    }
  }

  generateSourceFromTemplate({ currentPath: templatePath, destPath: dest })
}
