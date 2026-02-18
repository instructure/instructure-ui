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

import type { Transform } from 'jscodeshift'
import type { InstUICodemod } from './utils/instUICodemodExecutor'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import { printWarning } from './utils/codemodHelpers'
import { isImportSpecifier } from './utils/codemodTypeCheckers'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mappingData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../ui-icons/src/lucide/mapping.json'),
    'utf-8'
  )
)
const iconMapping = mappingData.mappingOverrides as Record<string, string>

const ICON_IMPORT_PATHS = [
  '@instructure/ui-icons',
  '@instructure/ui-icons/es/svg'
]
const NEW_ICON_IMPORT_PATH = '@instructure/ui-icons'

/**
 * Convert kebab-case to PascalCase.
 * Example: 'accessibility-2' -> 'Accessibility2'
 */
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * Returns the new icon export name for the given legacy icon name,
 * or null if no mapping exists.
 * Example: 'IconA11yLine' -> 'Accessibility2InstUIIcon'
 */
function getNewIconName(oldName: string): string | null {
  const match = oldName.match(/^Icon(.+?)(Line|Solid)$/)
  if (!match) return null
  const mappedName = iconMapping[match[1]]
  if (!mappedName) return null
  return kebabToPascal(mappedName) + 'InstUIIcon'
}

/**
 * Migrates from legacy InstUI icons to new stroke-based and custom icons
 */
const migrateToNewIcons: Transform = (
  file,
  api,
  options?: { fileName?: string; usePrettier?: boolean }
) => {
  return instUICodemodExecutor(migrateToNewIconsCodemod, file, api, options)
}

const migrateToNewIconsCodemod: InstUICodemod = (j, root, filePath) => {
  let hasModifications = false
  const newIconNames = new Set<string>()
  // localIconName -> newIconName (handles aliased imports like `import { A as B }`)
  const replacements = new Map<string, string>()

  root.find(j.ImportDeclaration).forEach((path) => {
    if (!ICON_IMPORT_PATHS.includes(path.node.source.value as string)) return

    const remainingSpecifiers: typeof path.node.specifiers = []

    path.node.specifiers?.forEach((spec) => {
      if (!isImportSpecifier(spec)) {
        remainingSpecifiers.push(spec)
        return
      }

      const oldIconName = spec.imported.name as string
      const localIconName = (spec.local?.name as string) ?? oldIconName
      const newIconName = getNewIconName(oldIconName)

      if (!newIconName) {
        remainingSpecifiers.push(spec)
        printWarning(
          filePath,
          spec.loc?.start.line,
          `No mapping found for icon: ${oldIconName}. Please migrate manually.`
        )
        return
      }

      replacements.set(localIconName, newIconName)
      newIconNames.add(newIconName)
      hasModifications = true
    })

    if (remainingSpecifiers.length === 0) {
      j(path).remove()
    } else {
      // eslint-disable-next-line no-param-reassign
      path.node.specifiers = remainingSpecifiers
    }
  })

  if (!hasModifications) return false

  // Rename JSX usages
  root.find(j.JSXElement).forEach((path) => {
    const opening = path.node.openingElement
    const closing = path.node.closingElement
    if (opening.name.type !== 'JSXIdentifier') return

    const newName = replacements.get(opening.name.name)
    if (!newName) return

    opening.name.name = newName
    if (closing?.name.type === 'JSXIdentifier') {
      closing.name.name = newName
    }
  })

  // Add new import at the top, sorted alphabetically
  const specifiers = Array.from(newIconNames)
    .sort()
    .map((name) => j.importSpecifier(j.identifier(name), j.identifier(name)))
  const newImport = j.importDeclaration(
    specifiers,
    j.literal(NEW_ICON_IMPORT_PATH)
  )
  const firstImport = root.find(j.ImportDeclaration).at(0)
  if (firstImport.length > 0) {
    firstImport.insertBefore(newImport)
  } else {
    root.get().node.program.body.unshift(newImport)
  }

  return true
}

export default migrateToNewIcons
export { migrateToNewIconsCodemod }
