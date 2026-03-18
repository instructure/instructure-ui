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

import type { Collection, JSCodeshift, Transform } from 'jscodeshift'
import type { InstUICodemod } from './utils/instUICodemodExecutor'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import {
  findElement,
  findEveryImport,
  findImport,
  printWarning,
  renameElements,
  renameImportAndUsages
} from './utils/codemodHelpers'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMPORT_PATHS = [
  '@instructure/ui-icons',
  '@instructure/ui-icons/es/svg',
  '@instructure/ui'
]

const mappingData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../ui-icons/src/lucide/mapping.json'),
    'utf-8'
  )
)

const iconMappings = mappingData.mappingOverrides as Record<string, string>

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

const LEGACY_ICON_PATTERN = /^Icon(.+?)(Line|Solid)$/

/**
 * Warns about legacy icons that has no mappings and have to be migrated manually
 */
function warnUnmappedIcons(
  j: JSCodeshift,
  root: Collection,
  filePath: string
): void {
  findEveryImport(j, root, IMPORT_PATHS).forEach((localName) => {
    const match = localName.match(LEGACY_ICON_PATTERN)
    if (!match || iconMappings[match[1]]) return

    printWarning(
      filePath,
      undefined,
      `No mapping found for "${localName}". Please migrate manually.`
    )
  })
}

/**
 * Iterates every known legacy icon name (derived from mapping.json) and migrates it:
 * 1. Renames the import specifier in-place
 * 2. Renames JSX elements
 * 3. Renames references (`renderIcon={OldIcon}`).
 */
function migrateIcons(
  j: JSCodeshift,
  root: Collection,
  filePath: string
): boolean {
  let didChange = false

  for (const [iconSuffix, newIconKey] of Object.entries(iconMappings)) {
    const newName = kebabToPascal(newIconKey) + 'InstUIIcon'

    for (const variant of ['Line', 'Solid']) {
      const legacyName = `Icon${iconSuffix}${variant}`

      const localName = findImport(j, root, legacyName, IMPORT_PATHS)
      if (!localName) continue

      const hasAlias = localName !== legacyName

      // Renames the exported name; if no alias, also renames identifier usages
      renameImportAndUsages(j, root, legacyName, newName, IMPORT_PATHS)

      // JSX elements aren't covered by renameImportAndUsages — only rename when
      // there's no alias (alias keeps the local binding, so JSX stays unchanged)
      if (!hasAlias) {
        renameElements(
          filePath,
          findElement(filePath, j, root, localName),
          localName,
          newName
        )
      }

      didChange = true
    }
  }

  return didChange
}

/**
 * Migrates legacy InstUI icons (`IconXxxLine` / `IconXxxSolid`) to new
 * `XxxInstUIIcon` components.
 *
 * Renames specifiers in-place for imports from:
 *   - `@instructure/ui-icons`
 *   - `@instructure/ui-icons/es/svg`
 *   - `@instructure/ui`
 */
const migrateToNewIconsCodemod: InstUICodemod = (j, root, filePath) => {
  warnUnmappedIcons(j, root, filePath)
  return migrateIcons(j, root, filePath)
}

const migrateToNewIcons: Transform = (file, api, options) => {
  return instUICodemodExecutor(migrateToNewIconsCodemod, file, api, options)
}

export default migrateToNewIcons
export { migrateToNewIconsCodemod }
