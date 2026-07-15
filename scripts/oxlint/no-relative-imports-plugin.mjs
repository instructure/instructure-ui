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

import fs from 'node:fs'
import path from 'node:path'

/**
 * An oxlint JS-plugin that checks against local relative imports from another package.
 *
 * Reimplementation of `scripts/eslint/no-relative-imports-plugin.mjs` for oxlint's alpha
 * JS-plugin system (https://oxc.rs/docs/guide/usage/linter/js-plugins.html). Oxlint's JS-plugin
 * `context` does not provide `eslint-module-utils`'s resolver, so this version walks up from
 * each side of a relative import to the nearest `package.json` using plain `fs`/`path` instead.
 *
 * This code will fail:
 * `import { abc } from '../../packages/ui-i18n'`
 *
 * This code is OK:
 * `import { abc } from '@instructure/ui-i18n'`
 *
 * Usage (in `.oxlintrc.json`):
 * ```json
 * {
 *   "jsPlugins": ["./scripts/oxlint/no-relative-imports-plugin.mjs"],
 *   "rules": { "instructure/no-relative-imports": "error" }
 * }
 * ```
 */

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

function isImportParentOrIndexOrSibling(name) {
  if (isRelativeToParent(name)) return true
  if (isIndex(name)) return true
  if (isRelativeToSibling(name)) return true
  return false
}

// Walks up from `startPath` to the nearest directory that actually exists on disk -
// `startPath` itself may not exist yet (e.g. an import path resolved without an extension).
function nearestExistingDir(startPath) {
  let dir = startPath
  while (dir && !fs.existsSync(dir)) {
    dir = path.dirname(dir)
  }
  if (dir && fs.existsSync(dir) && !fs.statSync(dir).isDirectory()) {
    dir = path.dirname(dir)
  }
  return dir
}

/**
 * Walks up from `startPath` to find the nearest named `package.json`.
 * Exported for direct unit testing (see `__node_tests__/no-relative-imports-plugin.test.ts`).
 */
export function findNamedPackage(startPath) {
  let dir = nearestExistingDir(startPath)
  while (dir) {
    const pkgPath = path.join(dir, 'package.json')
    if (fs.existsSync(pkgPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
        if (packageJson.name) {
          return { path: dir, packageJson }
        }
      } catch {
        // malformed package.json - keep walking up
      }
    }
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return { path: startPath, packageJson: null }
}

/**
 * Pure rule logic, independent of oxlint's context/AST shape, so it can be unit-tested directly.
 * Returns the violation message, or null when the import is fine.
 */
export function checkImportForRelativePackage(importPath, contextFilename) {
  if (!isImportParentOrIndexOrSibling(importPath)) return null
  if (!contextFilename) return null
  const resolvedImport = path.resolve(path.dirname(contextFilename), importPath)
  const importPkg = findNamedPackage(resolvedImport)
  const contextPkg = findNamedPackage(contextFilename)
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
    return (
      'Relative import from another package is not allowed. ' +
      `Use "${properImport}" instead of "${importPath}"`
    )
  }
  return null
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

// `meta.name` becomes the rule namespace prefix oxlint derives for a bare jsPlugins path entry
// (e.g. "instructure/no-relative-imports"), analogous to the original `@instructure` ESLint
// plugin scope used in eslint.config.mjs's `@instructure/no-relative-imports`.
const plugin = {
  meta: {
    name: 'instructure',
    version: '1.0.0'
  },
  rules: {
    'no-relative-imports': {
      create(context) {
        return {
          ImportDeclaration(node) {
            const message = checkImportForRelativePackage(
              node.source.value,
              context.filename
            )
            if (message) {
              context.report({ node: node.source, message })
            }
          },
          CallExpression(node) {
            if (isStaticRequire(node)) {
              const [firstArgument] = node.arguments
              const message = checkImportForRelativePackage(
                firstArgument.value,
                context.filename
              )
              if (message) {
                context.report({ node: firstArgument, message })
              }
            }
          }
        }
      }
    }
  }
}

export default plugin
