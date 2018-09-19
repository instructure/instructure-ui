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
const globby = require('globby')
const loadConfig = require('@instructure/config-loader')

module.exports = function (source, map) {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const options = Object.assign({}, loadConfig('tests'), loaderUtils.getOptions(this))

  const files = options.files || ['**/*.test.js']
  const ignore = (options.ignore || []).concat(['**/node_modules/**'])
  const cwd = options.cwd || process.cwd()

  globby(files, { ignore })
    .then((matches) => {
      const scopes = process.env.UI_TEST_SCOPE_PATHS
      const allFilePaths = matches
        .map(filePath => path.normalize(filePath))
        .filter((testFilePath) => {
          if (typeof scopes !== 'string') return true
          const scopePaths = scopes.split(',').map(p => path.normalize(p.trim()))
          return scopePaths
            .findIndex(scopePath => (testFilePath === scopePath || testFilePath.startsWith(scopePath))) >= 0
        })

      let result

      // BEGIN TODO once all of the legacy/Testbed tests are converted, remove the following:
      const USE_TESTBED = process.env.USE_TESTBED
      const TESTBED_REMOVE_THIS = options.TESTBED_REMOVE_THIS || []
      const matchesTestbedPath = function (filePath) {
        return TESTBED_REMOVE_THIS.findIndex(testbedFilePath => filePath.startsWith(testbedFilePath)) >= 0
      }
      const testbedFilePaths = allFilePaths
        .filter((filePath) => {
          return matchesTestbedPath(filePath)
        })

      const testFilePaths = allFilePaths
        .filter((filePath) => {
          return !matchesTestbedPath(filePath)
        })

      if (USE_TESTBED) {
        if (testbedFilePaths.length > 0 && parseFloat(process.env.REACT_VERSION) < 16) {
          const testbedFileRequires = testbedFilePaths.map(filePath => `require('./${path.relative(cwd, filePath)}')`)
          const testbedTests = testbedFileRequires.join(';\n')
          result = `
describe('ui-testbed', function () {
  require('${require.resolve('@instructure/ui-testbed')}');
  ${testbedTests}
})
`
        }
      // END TODO (remove Testbed)
    } else {
      if (testFilePaths.length > 0) {
        const testFileRequires = testFilePaths.map(filePath => `require('./${path.relative(cwd, filePath)}')`)
        result = `
describe('ui-test-utils', function () {
${testFileRequires.join(';\n')}
})
`
      }
    }

      if (!result) {
        result = `
describe('WHEN NO TESTS MATCH...', () => {
  it('should still pass', () => {})
})
`
      }

      callback(null, `
${result}
console.log('REACT VERSION', '${process.env.REACT_VERSION}');
`, map)

    }).catch((error) => {
      callback(error)
    })
}
