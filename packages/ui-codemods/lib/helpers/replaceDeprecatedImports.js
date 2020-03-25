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

const parseImport = require('../utils/parseImport')
const findTransform = require('../utils/findTransform')
const findImportDeclaration = require('../utils/findImportDeclaration')

function transformImportPath (importPath, parsedImport, transform, transformDefaults) {
  let updatedImportPath = transform.importPath || transformDefaults.importPath

  if (updatedImportPath) {
    updatedImportPath = typeof updatedImportPath === 'function' ? updatedImportPath(importPath, parsedImport) : updatedImportPath
  } else {
    updatedImportPath = importPath
  }

  return updatedImportPath
}

function updateImports (j, root, config, api, importDeclaration, importSpecifier, importPath) {
  let hasModifications = false
  const { transformDefaults = {}, transforms = [] } = config

  // This is the name of the export imported from the module. For example, in the import
  // `import { Foo as Bar } from '@instructure...` this would be Foo
  let moduleName
  if (importSpecifier && importSpecifier.value && importSpecifier.value.imported) {
    moduleName = importSpecifier.value.imported.name
  }

  // This is the local name created by the consumer. For example, in the import
  // `import { Foo as Bar } from '@instructure...` this would be Bar
  let localName = importSpecifier.value.local.name

  const parsedImport = parseImport(importPath)
  let transform = findTransform(transforms, importPath, parsedImport, moduleName)

  if (transform) {
    let importType = Object.keys(transform).includes('importType') ? transform.importType : transformDefaults.importType

    if (!importType) {
      importType = moduleName ? 'named' : 'default'
    }

    let updatedModuleName = transform.moduleName || transformDefaults.moduleName
    const currentModuleName = moduleName || parsedImport.moduleName

    if (updatedModuleName) {
      updatedModuleName = typeof updatedModuleName === 'function' ? updatedModuleName(currentModuleName) : updatedModuleName
    } else {
      updatedModuleName = currentModuleName
    }

    const updatedImportPath = transformImportPath(importPath, parsedImport, transform, transformDefaults)

    // If the importType we are transforming to is default, the existing import path is equal to the updated import path,
    // and there is no module name, that means we already have a default import at the specified import path and the
    // transform is unnecessary so we return false.
    if (importType === 'default' && importPath === updatedImportPath && !moduleName) {
      return false
    }

    // If the importType we are transforming to is named, the existing import path is equal to the updated import path,
    // and the module name is equal to the updated module name, the transform is unecessary so we return false.
    if (importType === 'named' && importPath === updatedImportPath && moduleName === updatedModuleName) {
      return false
    }

    // Now that we have the import path, check to see if there is already an import declaration with that path. For example,
    // if we were moving the module Foo to the import path `ui-bar`, check to see within the file if there is already a
    // `ui-bar` import path.
    const updatedDeclaration = findImportDeclaration(j, root, updatedImportPath)

    // Preserve any comments, we'll need to restore them after the modifications
    const { comments = [] } = (importDeclaration || {}).value || {}
    const { comments: existingComments = [] } = (updatedDeclaration || {}).value || {}

    const cleanup = (newDeclaration) => {
      hasModifications = true
      j(importSpecifier).remove()

      let removedImportDeclaration = false

      // Do some cleanup. If we no longer have any import specifiers in the line, remove it
      if (j(importDeclaration).find(j.ImportSpecifier).length === 0 && j(importDeclaration).find(j.ImportDefaultSpecifier).length === 0) {
        j(importDeclaration).remove()
        removedImportDeclaration = true
      }

      // Restore comments. If we have removed an import declaration, amend any comments to the updated location
      if (newDeclaration && removedImportDeclaration) {
        // This means we have a new declaration, and we removed the old declaration. Assign the comments from the old import
        // declaration to the new import declaration

        // eslint-disable-next-line no-param-reassign
        newDeclaration.comments = comments
      } else if (updatedDeclaration && updatedDeclaration.value) {
        // This means we have an updated import declaration. We need to restore any comments in the updated import declaration,
        // _and_ if we removed an import declaration we need to amend the old import declaration comments to the comments that
        // were already on the updated import declaration
        updatedDeclaration.value.comments = [...(existingComments || []), ...(removedImportDeclaration ? comments : [])]
      }
    }

    if (importType === 'named') {
      // We are migrating to a named import. The following query determines if there is already an existing import in the file
      // where this import needs to be moved

      if (updatedDeclaration) {
        // If we're here, it means that there's already another import declaration with the updated import path. For
        // example, we are moving `import { Foo } from 'ui-foo'` to `ui-bar` but `ui-bar` is already being used as
        // an import in the file. We need to amend this import to any existing ones.
        const updatedImportSpecifiers = j(updatedDeclaration).find(j.ImportSpecifier)
        const updatedImportDefaultSpecifiers = j(updatedDeclaration).find(j.ImportDefaultSpecifier)

        if (updatedImportSpecifiers.length > 0) {
          // If we're here, it means there's already one or more named imports from the module referenced in the import
          // path. For example, we have `import { Foo } from 'ui-foo'` and we want to move it to `ui-bar` but there is
          // already `import { Bar } from 'ui-bar'` defined in the file. The end result of this operation should be
          // `import { Bar, Foo } from 'ui-bar'`
          j(updatedDeclaration).find(j.ImportSpecifier).at(0).insertAfter(j.importSpecifier(j.identifier(updatedModuleName), j.identifier(localName)))
          cleanup()
        } else if (updatedImportDefaultSpecifiers.length > 0) {
          // Same case as above but there is a default import ex. `import Bar from 'ui-bar' the end result would be
          // `import Bar, { Foo } from 'ui-bar'`
          j(updatedDeclaration).find(j.ImportDefaultSpecifier).at(0).insertAfter(j.importSpecifier(j.identifier(updatedModuleName), j.identifier(localName)))
          cleanup()
        } else {
          // If we're here, the import is present but there are no named or default specifiers. For example we have
          // `import 'ui-bar'` and we want to move Foo from `import { Foo } from 'ui-foo'` to `ui-bar`. Amend the
          // import to the declaration so the end result will be `import { Foo } from 'ui-bar'`
          j(updatedDeclaration).replaceWith(j.importDeclaration([j.importSpecifier(j.identifier(updatedModuleName), j.identifier(localName))], j.stringLiteral(updatedImportPath)))
          cleanup()
        }
      } else {
        // Add a new import declaration because there isn't an existing one
        const newDeclaration = j.importDeclaration([j.importSpecifier(j.identifier(updatedModuleName), j.identifier(localName))], j.stringLiteral(updatedImportPath))
        j(importDeclaration).insertAfter(newDeclaration)
        cleanup(newDeclaration)
      }
    } else {
      // We're moving to default imports. For example, we are going from `import { Foo } from '@instructure/ui-something`
      // to `import Foo from '@instructure/ui-something-else'

      if (updatedDeclaration) {
        // There is already an import from this same path, we need to amend this default import to that one.
        const updatedImportSpecifiers = j(updatedDeclaration).find(j.ImportSpecifier)
        const updatedImportDefaultSpecifiers = j(updatedDeclaration).find(j.ImportDefaultSpecifier)

        if (updatedImportDefaultSpecifiers.length > 0) {
          // This case occurs if there is already a default import at the updated path. For example, you are trying
          // to move `import { Something } from 'ui-foo'` to a default import `import SomethingElse from 'ui-bar'`.
          // We don't want to break things by overriding it, so we'll skip this one and throw the following warning.
          if (api && api.report) {
            api.report(`[Warning]: Skipping transform for import \`${moduleName}\` to default import for \`${updatedImportPath}\`. There is already a default import specified for that import path and the transformation would be breaking.`)
          }
        } else if (updatedImportSpecifiers.length > 0) {
          // This case occurs if the import path is defined in the file and there exist one or more named imports already
          // for the import path. We need to insert the default import before the named imports. For example, we have an
          // import like `import { Something } from 'ui-foo'` and we want to move it to a default import from the path
          // 'ui-bar'. There already exists in the file `import { AnotherThing } from 'ui-bar'`. The end result will be
          // `import Something, { AnotherThing } from 'ui-bar'`
          j(updatedDeclaration).find(j.ImportSpecifier).at(0).insertBefore(j.importDefaultSpecifier(j.identifier(localName)))
          cleanup()
        } else {
          // This case occurs if the import doesn't have named or default specifiers but there is still an import that
          // matches the updated import path. ex. we have `import { Something } from 'ui-foo' and we want to update the
          // import path to `ui-bar` but there is already `import 'ui-bar'` in the file. We add the default import to the
          // existing import declaration.
          j(updatedDeclaration).replaceWith(j.importDeclaration([j.importDefaultSpecifier(j.identifier(localName))], j.stringLiteral(updatedImportPath)))
          cleanup()
        }
      } else {
        // Add a new default declaration after b/c there isn't one currently
        const newDeclaration = j.importDeclaration([j.importDefaultSpecifier(j.identifier(localName))], j.stringLiteral(updatedImportPath))
        j(importDeclaration).insertAfter(newDeclaration)
        cleanup(newDeclaration)
      }
    }
  }

  return hasModifications
}

/**
 * Find imports
 *
 * Example:
 *  import Modal from 'instructure-ui/lib/Modal'
 */
module.exports = function replaceDeprecatedImports (j, root, config, api) {
  let hasModifications = false

  root
    .find(j.ImportDeclaration)
    .forEach((importDeclaration) => {
      j(importDeclaration).find(j.StringLiteral).forEach((source) => {
        // Collect the string portion of the import, ex. `import Baz from '@instructure/ui-baz'` this would
        // look at the `@instructure/ui-baz` portion
        const importPath = source.value.value

        const importSpecifiers = j(importDeclaration).find(j.ImportSpecifier)
        const importDefaultSpecifiers = j(importDeclaration).find(j.ImportDefaultSpecifier)

        if (importSpecifiers.length > 0 || importDefaultSpecifiers.length > 0) {
          // This will look for named imports, ex. `import { Foo } from '@instructure...`
          importSpecifiers.forEach((importSpecifier) => {
            hasModifications = updateImports(j, root, config, api, importDeclaration, importSpecifier, importPath) || hasModifications
          })

          // This will look for default imports, ex. `import Foo from '@instructure...`
          importDefaultSpecifiers.forEach((importDefaultSpecifier) => {
            hasModifications = updateImports(j, root, config, api, importDeclaration, importDefaultSpecifier, importPath) || hasModifications
          })
        } else {
          // If we have a declaration, but no specifiers that means there is just the import path
          const { transformDefaults = {}, transforms = [] } = config
          const parsedImport = parseImport(importPath)
          const transform = findTransform(transforms, importPath, parsedImport)

          if (transform) {
            const updatedImportPath = transformImportPath(importPath, parsedImport, transform, transformDefaults)

            // Only proceed with the transform if it is necessary. If the import path is already equal to the updated import
            // path we skip it
            if (importPath !== updatedImportPath) {
              j(source).replaceWith(j.literal(updatedImportPath))
              hasModifications = true
            }
          }
        }
      })
    })

  return hasModifications
}
