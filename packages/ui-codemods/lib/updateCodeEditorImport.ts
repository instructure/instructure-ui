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

import { Collection, JSCodeshift, Transform } from 'jscodeshift'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import { printWarning } from './utils/codemodHelpers'

/**
 * * updates the codeEditor imports
 */
const updateCodeEditorImport: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(updateCodeEditor, file, api, options)
}

const updateCodeEditor = (
  j: JSCodeshift,
  root: Collection,
  filePath: string
) => {
  // Flag to track if we made any changes to the file
  let hasModifications = false

  // Find all import declarations in the file
  root.find(j.ImportDeclaration).forEach((importDecl) => {
    // Get the source value (what's being imported from)
    const source = importDecl.node.source.value

    // Only process imports from '@instructure/ui' or 'ui'
    if (source === '@instructure/ui' || source === 'ui') {
      // Filter to find only CodeEditor imports (including renamed ones)
      const codeEditorSpecifiers = importDecl.node.specifiers?.filter(
        (specifier) =>
          specifier.type === 'ImportSpecifier' && // Must be a named import
          specifier.imported.name === 'CodeEditor' // Checks the original name
      )

      // Filter to find all other imports that aren't CodeEditor
      const otherSpecifiers = importDecl.node.specifiers?.filter(
        (specifier) =>
          !(
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.name === 'CodeEditor'
          )
      )

      // If we found any CodeEditor imports in this declaration
      if (codeEditorSpecifiers?.length) {
        hasModifications = true
        const line = importDecl.node.loc?.start.line

        // Print warning about the migration
        printWarning(
          filePath,
          line,
          'CodeEditor was removed from the ui package. You might need to add the ui-code-editor dependency.'
        )

        /**
         * Create new import for ui-code-editor
         * This handles all cases:
         * - import { CodeEditor } → import { CodeEditor } from '@instructure/ui-code-editor'
         * - import { CodeEditor as Editor } → import { CodeEditor as Editor } from '@instructure/ui-code-editor'
         */
        const newImport = j.importDeclaration(
          codeEditorSpecifiers, // Preserves original or renamed imports
          j.literal('@instructure/ui-code-editor')
        )

        // Insert the new import after the original one
        importDecl.insertAfter(newImport)

        /**
         * Handle the original import declaration
         * Two scenarios:
         * 1. There are other imports to keep in the original
         * 2. This was only importing CodeEditor
         */
        if (otherSpecifiers?.length) {
          // Scenario 1: Keep other imports in original declaration
          // Example: import { Button } remains after CodeEditor is moved
          // eslint-disable-next-line no-param-reassign
          importDecl.node.specifiers = otherSpecifiers
        } else {
          // Scenario 2: No other imports - transfer comments and remove original
          // Preserve any comments from the original import
          if (importDecl.node.comments) {
            newImport.comments = importDecl.node.comments
          }
          // Remove the now-empty original import
          j(importDecl).remove()
        }
      }
    }
  })

  return hasModifications
}

export default updateCodeEditorImport
export { updateCodeEditor }
