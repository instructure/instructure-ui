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

import path from 'path'
import pkgUtils from '@instructure/pkg-utils'
import { default as resolve } from 'eslint-module-utils/resolve.js'

/**
 * An ESLint plugin that checks against local relative imports from another package
 *
 * This code will fail:
 * `import { abc } from '../../packages/ui-i18n'`
 *
 * This code is OK:
 * `import { abc } from '@instructure/ui-i18n'`
 *
 * Usage:
 * Add `instructurePlugin.configs.recommended` to your flat ESLint configuration
 */
const plugin = {
  meta: {
    name: "instructure-no-relative-imports-plugin",
    version: "1.0.0"
  },
  configs: {},
  rules: {
    "no-relative-imports": {
      create(context) {
        return {
          ImportDeclaration(node) {
            checkImportForRelativePackage(node.source.value, node.source, context)
          },
          CallExpression(node) {
            if (isStaticRequire(node)) {
              const [firstArgument] = node.arguments
              checkImportForRelativePackage(firstArgument.value, firstArgument, context)
            }
          }
        }
      }
    }
  }
}

function findNamedPackage(filePath) {
  const found = pkgUtils.readPackage({ cwd: filePath })
  if (found.packageJson && !found.packageJson.name) {
    return findNamedPackage(path.join(found.path, '../..'))
  }
  return found
}

function checkImportForRelativePackage(importPath, node, context) {
  if (!isImportParentOrIndexOrSibling(importPath, context)) {
    return
  }
  const resolvedImport = resolve.default(importPath, context)
  const resolvedContext = context.getFilename()
  if (!resolvedImport || !resolvedContext) {
    return
  }
  const importPkg = findNamedPackage(resolvedImport)
  const contextPkg = findNamedPackage(resolvedContext)
  if (
    importPkg.packageJson &&
    contextPkg.packageJson &&
    importPkg.packageJson.name !== contextPkg.packageJson.name
  ) {
    const importBaseName = path.basename(importPath)
    const importRoot = path.dirname(importPkg.path)
    const properImport = path.join(
      importPkg.packageJson.name,
      importBaseName === path.basename(importRoot) ? '' : importBaseName
    )
    context.report({
      node,
      message:
        'Relative import from another package is not allowed. ' +
        `Use "${properImport}" instead of "${importPath}"`
    })
  }
}

// from https://github.com/import-js/eslint-plugin-import/blob/main/src/core/importType.js#L48
function isRelativeToParent(name) {
  return (/^\.\.$|^\.\.[\\/]/).test(name)
}

function isIndex(name) {
  const indexFiles = ['.', './', './index', './index.js']
  return indexFiles.indexOf(name) !== -1
}

function isRelativeToSibling(name) {
  return (/^\.[\\/]/).test(name)
}

function isImportParentOrIndexOrSibling(name, context) {
  const path = resolve.default(name, context)
  const { settings } = context
  if (isRelativeToParent(name, settings, path)) { return true }
  if (isIndex(name, settings, path)) { return true }
  if (isRelativeToSibling(name, settings, path)) { return true }
  return false
}

function isStaticRequire(node) {
  return (
    node &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal' &&
    typeof node.arguments[0].value === 'string'
  )
}

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
  recommended: [{
    plugins: {
      "@instructure": plugin
    },
    rules: {
      "@instructure/no-relative-imports": "error"
    }
  }]
})

export default plugin
