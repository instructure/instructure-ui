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
  // Track the export letter used by each package's "." export
  const dotExportLetters = new Map<string, string>()

  for (const pkgJsonPath of packageJsonPaths) {
    const pkgDir = path.dirname(pkgJsonPath)
    const pkgShortName = path.basename(pkgDir) // e.g. 'ui-avatar'
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    const exports = pkgJson.exports

    if (!exports || typeof exports !== 'object') {
      continue
    }

    // Extract the export letter from the "." (default) export
    const dotExport = exports['.']
    if (dotExport && typeof dotExport === 'object') {
      const dotImportPath = dotExport.import || dotExport.default
      if (dotImportPath) {
        dotExportLetters.set(pkgShortName, path.parse(dotImportPath).name)
      }
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

      // Skip packages that don't follow the src/exports/{letter}.ts convention
      const exportFilePath = path.join(pkgDir, 'src', 'exports', `${exportLetter}.ts`)
      if (!fs.existsSync(exportFilePath)) {
        continue
      }

      // Resolve per-component-dir versions from the source export file
      const componentDirVersions = resolveComponentVersions(
        pkgDir,
        exportLetter,
        pkgShortName
      )

      if (!mapping[libVersion]) {
        mapping[libVersion] = {}
      }
      mapping[libVersion][pkgShortName] = {
        exportLetter,
        componentDirVersions
      }
    }
  }

  const libraryVersions = Array.from(libraryVersionsSet).sort((a, b) => {
    const [aMaj, aMin] = a.replace('v', '').split('_').map(Number)
    const [bMaj, bMin] = b.replace('v', '').split('_').map(Number)
    return aMaj - bMaj || aMin - bMin
  })

  // Determine the default version: the library version whose export letters
  // match the "." (default) export of each package. This is the version
  // that consumers get when they install packages normally.
  const defaultVersion = resolveDefaultVersion(
    libraryVersions,
    mapping,
    dotExportLetters
  )

  return { libraryVersions, defaultVersion, mapping }
}

/**
 * Extracts the package short name (e.g. 'ui-avatar') from a file path.
 * Returns undefined for files that are not inside a ui-* package.
 */
export function getPackageShortName(filePath: string): string | undefined {
  const match = filePath.match(/packages\/(ui-[^/]+)\//)
  return match ? match[1] : undefined
}

/**
 * Returns true if a doc with the given componentVersion and package should
 * be included in the specified library version.
 *
 * Rules:
 * - No componentVersion (general docs, utils, CHANGELOG) → included in all versions
 * - No pkgShortName (not a ui-* package file) → included in all versions
 * - Package not in version map (no multi-version exports) → included only if v1
 * - Otherwise → included only if componentVersion matches the version map entry
 */
export function isDocIncludedInVersion(
  versionMap: VersionMap,
  libVersion: string,
  componentVersion: string | undefined,
  pkgShortName: string | undefined,
  componentDirName: string | undefined
): boolean {
  if (!componentVersion || !pkgShortName) {
    return true
  }

  const entry = versionMap.mapping[libVersion]?.[pkgShortName]
  if (!entry) {
    // Package has no multi-version exports; include only the default (v1)
    return componentVersion === 'v1'
  }

  if (componentDirName) {
    const mappedVersion = entry.componentDirVersions[componentDirName]
    if (mappedVersion !== undefined) {
      return mappedVersion === componentVersion
    }
    // Component dir not found in map; fall back to checking any match
  }
  return Object.values(entry.componentDirVersions).includes(componentVersion)
}

/**
 * Reads the source export file (e.g. src/exports/a.ts) and parses imports
 * to determine which component version directories it maps to (v1, v2, etc.).
 * A single export file may reference multiple versions when a package contains
 * components at different migration stages (e.g. DateInput/v2 + DateInput2/v1).
 */
function resolveComponentVersions(
  pkgDir: string,
  exportLetter: string,
  pkgShortName: string
): Record<string, string> {
  const exportFilePath = path.join(
    pkgDir,
    'src',
    'exports',
    `${exportLetter}.ts`
  )

  if (!fs.existsSync(exportFilePath)) {
    throw new Error(
      `[buildVersionMap] Export file not found: ${exportFilePath} (${pkgShortName}). ` +
      `The package.json exports field references a file that does not exist on disk.`
    )
  }

  const content = fs.readFileSync(exportFilePath, 'utf-8')

  // Match all patterns like:
  //   from '../ComponentName/v2'
  //   from '../ComponentName/v1/SubComponent'
  const versionRegex = /from\s+['"]\.\.\/([^/]+)\/(v\d+)(?:\/|['"])/g
  const versions = new Map<string, string>() // componentDir → version
  let match
  while ((match = versionRegex.exec(content)) !== null) {
    versions.set(match[1], match[2])
  }

  if (versions.size === 0) {
    throw new Error(
      `[buildVersionMap] Could not resolve component version from ${exportFilePath} (${pkgShortName}). ` +
      `Ensure the file has an import like: from '../ComponentName/v1'`
    )
  }

  return Object.fromEntries(versions)
}

/**
 * Finds the library version whose export letters best match the "." export
 * of each package. The version with the most matches is the default.
 * Falls back to the first library version if no "." exports were found.
 */
function resolveDefaultVersion(
  libraryVersions: string[],
  mapping: VersionMap['mapping'],
  dotExportLetters: Map<string, string>
): string {
  if (dotExportLetters.size === 0 || libraryVersions.length === 0) {
    return libraryVersions[0] ?? ''
  }

  let bestVersion = libraryVersions[0]
  let bestCount = -1

  for (const libVersion of libraryVersions) {
    let matchCount = 0
    for (const [pkgShortName, dotLetter] of dotExportLetters) {
      const entry = mapping[libVersion]?.[pkgShortName]
      if (entry && entry.exportLetter === dotLetter) {
        matchCount++
      }
    }
    if (matchCount > bestCount) {
      bestCount = matchCount
      bestVersion = libVersion
    }
  }

  return bestVersion
}
