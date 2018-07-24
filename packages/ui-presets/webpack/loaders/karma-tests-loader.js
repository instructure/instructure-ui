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
const loaderUtils = require('loader-utils')
const path = require('path')
const glob = require('glob')

module.exports = function (source, map) {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const options = loaderUtils.getOptions(this) || {}
  const ignore = (options.ignore || []).concat(['**/node_modules/**'])
  const cwd = options.cwd || process.cwd()
  const pattern = options.pattern || '**/*.test.js'

  glob(pattern, {
    cwd,
    strict: true,
    absolute: true,
    ignore,
  }, (err, globResult) => {
    if (err) {
      callback(err)
      return
    }

    const scopes = process.env.UI_TEST_SCOPE_PATHS
    const testFilePaths = globResult.map(filePath => path.normalize(filePath))
      .filter((testFilePath) => {
        if (typeof scopes !== 'string') return true
        const relativePath = path.relative(cwd, testFilePath)
        const scopePaths = scopes.split(',').map(p => path.normalize(p.trim()))
        return scopePaths
          .findIndex(scopePath => (relativePath === scopePath || relativePath.startsWith(scopePath))) >= 0
      })
      .map(filePath => `require('${filePath}')`)

    let tests = ''

    if (testFilePaths.length > 0) {
      tests = testFilePaths.join(';\n')
    } else {
      tests = `describe('WHEN NO TESTS MATCH', function () { it('should pass', function () { expect(true) }) })`
    }

    callback(null, tests, map)
  })
}
