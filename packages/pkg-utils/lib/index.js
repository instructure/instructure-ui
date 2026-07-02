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

const {
  readPackage,
  getPackage,
  getPackageJSON,
  getPackagePath
} = require('./get-package')
// Keep these `require`s out of the `module.exports` object literal below.
// Inline `require()` calls in the literal defeat cjs-module-lexer's static
// analysis, so ESM consumers doing `import * as pkgUtils` only see the first
// export and get `undefined` for the rest (e.g. getPackageJSON).
const getPackages = require('./get-packages')
const getChangedPackages = require('./get-changed-packages')
const readPkgUp = require('read-pkg-up')

module.exports = {
  getPackages,
  getChangedPackages,
  readPkgUp,
  readPkg: getPackageJSON,
  readPackage,
  getPackage,
  getPackageJSON,
  getPackagePath
}
