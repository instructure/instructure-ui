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

module.exports = function findTransform (transforms, importPath, parsedImport, moduleName) {
  return (transforms.find(({ where = {} }) => {
    // If `where` has no entries, there are no matching transforms
    if (Object.keys(where).length === 0) return false

    let performedTest = false
    let foundTransform = true

    if (where.moduleName) {
      performedTest = true

      if (moduleName) { // Give preference to the module name parsed from the AST vs. the import path string
        foundTransform = foundTransform && where.moduleName === moduleName
      } else {
        foundTransform = foundTransform && where.moduleName === parsedImport.moduleName
      }
    }

    if (where.moduleNames) {
      performedTest = true

      if (moduleName) {
        foundTransform = foundTransform && where.moduleNames.includes(moduleName)
      } else {
        foundTransform = foundTransform && where.moduleNames.includes(parsedImport.moduleName)
      }
    }

    if (where.packageName) {
      performedTest = true

      foundTransform = foundTransform && where.packageName === parsedImport.fullName
    }

    if (where.packageNames) {
      performedTest = true

      foundTransform = foundTransform && where.packageNames.includes(parsedImport.fullName)
    }

    if (where.importPath) {
      performedTest = true

      foundTransform = foundTransform && where.importPath === importPath
    }

    if (where.importPattern) {
      performedTest = true

      foundTransform = foundTransform && new RegExp(where.importPattern).test(importPath)
    }

    return performedTest && foundTransform
  }) || {}).transform
}