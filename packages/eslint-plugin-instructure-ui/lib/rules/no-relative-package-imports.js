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
const path = require('path')
const { readPackage } = require('@instructure/pkg-utils')

const resolve = require('eslint-module-utils/resolve').default
const resolveImportType = require('eslint-plugin-import/lib/core/importType').default

module.exports = {
  meta: {
    docs: {},
  },

  create: function noRelativePackages (context) {

    function findNamedPackage (filePath) {
      const found = readPackage({cwd: filePath})
      // console.log(found)
      if (found.pkg && !found.pkg.name) {
        return findNamedPackage(path.join(found.path, '../..'))
      }
      return found
    }

    function checkImportForRelativePackage (importPath, node) {
      const potentialViolationTypes = ['parent', 'index', 'sibling']
      if (potentialViolationTypes.indexOf(resolveImportType(importPath, context)) === -1) {
        return
      }

      const resolvedImport = resolve(importPath, context)
      const resolvedContext = context.getFilename()

      if (!resolvedImport || !resolvedContext) {
        return
      }

      const importPkg = findNamedPackage(resolvedImport)
      const contextPkg = findNamedPackage(resolvedContext)

      if (importPkg.pkg && contextPkg.pkg && importPkg.pkg.name !== contextPkg.pkg.name) {
        const importBaseName = path.basename(importPath)
        const importRoot = path.dirname(importPkg.path)
        const properPath = path.relative(importRoot, resolvedImport)
        const properImport = path.join(
          importPkg.pkg.name,
          path.dirname(properPath),
          importBaseName === path.basename(importRoot) ? '' : importBaseName
        )
        context.report({
          node,
          message: 'Relative import from another package is not allowed. ' +
            `Use "${properImport}" instead of "${importPath}"`,
        })
      }
    }

    return {
      ImportDeclaration(node) {
        checkImportForRelativePackage(node.source.value, node.source)
      },
      CallExpression(node) {
        if (isStaticRequire(node)) {
          const [ firstArgument ] = node.arguments
          checkImportForRelativePackage(firstArgument.value, firstArgument)
        }
      },
    }
  },
}

function isStaticRequire (node) {
  return node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal' &&
    typeof node.arguments[0].value === 'string'
}
