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

import fs from 'fs'
import path from 'path'
import { globby } from 'globby'
import type { VersionMap } from '../DataTypes.mjs'

/**
 * Scans all packages/ui-* /package.json files to build a version map that
 * describes which library version (e.g. v11_5, v11_6) maps to which
 * export letter (a, b) and component version directory (v1, v2) per package.
 */
export async function buildVersionMap(
  projectRoot: string
): Promise<VersionMap> {
  const packagesDir = path.join(projectRoot, 'packages')
  const packageJsonPaths = await globby('ui-*/package.json', {
    cwd: packagesDir,
    absolute: true
  })

  const libraryVersionsSet = new Set<string>()
  const mapping: VersionMap['mapping'] = {}

  for (const pkgJsonPath of packageJsonPaths) {
    const pkgDir = path.dirname(pkgJsonPath)
    const pkgShortName = path.basename(pkgDir) // e.g. 'ui-avatar'
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    const exports = pkgJson.exports

    if (!exports || typeof exports !== 'object') {
      continue
    }

    for (const exportKey of Object.keys(exports)) {
      // Match keys like ./v11_5, ./v11_6
      const versionMatch = exportKey.match(/^\.\/v(\d+_\d+)$/)
      if (!versionMatch) {
        continue
      }

      const libVersion = `v${versionMatch[1]}` // e.g. 'v11_5'
      libraryVersionsSet.add(libVersion)

      const exportValue = exports[exportKey]
      if (!exportValue || typeof exportValue !== 'object') {
        continue
      }

      // Extract export letter from the import path
      // e.g. "./es/exports/a.js" -> "a"
      const importPath = exportValue.import || exportValue.default
      if (!importPath) {
        continue
      }

      const exportLetter = path.parse(importPath).name
      if (!exportLetter) {
        continue
      }

      // Resolve the component version from the source export file
      const componentVersion = resolveComponentVersion(
        pkgDir,
        exportLetter,
        pkgShortName
      )

      if (!mapping[libVersion]) {
        mapping[libVersion] = {}
      }
      mapping[libVersion][pkgShortName] = {
        exportLetter,
        componentVersion
      }
    }
  }

  const libraryVersions = Array.from(libraryVersionsSet).sort((a, b) => {
    const [aMaj, aMin] = a.replace('v', '').split('_').map(Number)
    const [bMaj, bMin] = b.replace('v', '').split('_').map(Number)
    return aMaj - bMaj || aMin - bMin
  })

  return { libraryVersions, mapping }
}

/**
 * Reads the source export file (e.g. src/exports/a.ts) and parses imports
 * to determine which component version directory it maps to (v1 or v2).
 */
function resolveComponentVersion(
  pkgDir: string,
  exportLetter: string,
  pkgShortName: string
): string {
  const exportFilePath = path.join(
    pkgDir,
    'src',
    'exports',
    `${exportLetter}.ts`
  )

  if (!fs.existsSync(exportFilePath)) {
    // eslint-disable-next-line no-console
    console.warn(
      `[buildVersionMap] Export file not found: ${exportFilePath} (${pkgShortName}), defaulting to v1`
    )
    return 'v1'
  }

  const content = fs.readFileSync(exportFilePath, 'utf-8')

  // Match patterns like:
  //   from '../ComponentName/v2'
  //   from '../ComponentName/v1/SubComponent'
  const versionMatch = content.match(
    /from\s+['"]\.\.\/[^/]+\/(v\d+)(?:\/|['"])/
  )
  if (versionMatch) {
    return versionMatch[1]
  }

  // eslint-disable-next-line no-console
  console.warn(
    `[buildVersionMap] Could not resolve component version from ${exportFilePath} (${pkgShortName}), defaulting to v1`
  )
  return 'v1'
}
