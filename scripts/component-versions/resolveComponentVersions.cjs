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

// @ts-check
'use strict'

/**
 * Resolve which *published component versions* (e.g. "v11.6", "v11.7") a set of
 * changed files belongs to.
 *
 * Background: versioned components live in `packages/<pkg>/src/<Component>/vN/`
 * folders (v1, v2, ...). Those internal folders are exposed to consumers under
 * library-version keys ("./v11_6", "./v11_7", "./latest") via lettered export
 * files (`src/exports/a.ts`, `b.ts`, ...). The mapping is:
 *
 *     changed file  ->  <Component>/vN internal folder
 *       ->  which lettered export file(s) re-export that folder
 *       ->  which package.json "exports" keys point to those lettered files
 *       ->  concrete "vX_Y" keys  ->  "vX.Y"
 *
 * The mapping is genuinely per-(component, folder): a single lettered file can
 * mix versions (e.g. ui-form-field's `b.ts` imports most components from `v2`
 * but `utils` from `v1`), so a change to `utils/v1` maps to *both* v11.6 and
 * v11.7. Computing this by hand is error-prone, hence this resolver.
 *
 * Files that are not inside a versioned component folder (build config, tests,
 * non-versioned packages, the lettered export files themselves) resolve to no
 * version — matching the "if applicable" requirement.
 *
 * The function is deliberately dependency-free (only node builtins) so it can be
 * `require`d from the CommonJS changelog preset without a build step.
 */

const fs = require('node:fs')
const path = require('node:path')

// packages/<pkg>/src/<name>/<vN>/...  — <name> is the component (or shared)
// folder directly under src, <vN> is its internal version folder.
const VERSIONED_FILE_RE = /^packages\/([^/]+)\/src\/([^/]+)\/(v\d+)(?:\/|$)/

// A concrete published-version export key, e.g. "./v11_7" (not "." or "./latest").
const CONCRETE_KEY_RE = /^\.\/v(\d+)_(\d+)$/

/**
 * Per-package cache of the resolved export mapping so repeated files in the same
 * package don't re-read the filesystem.
 * @type {Map<string, PackageExportMap | null>}
 */
const pkgCache = new Map()

/**
 * @typedef {Object} PackageExportMap
 * @property {Record<string, Set<string>>} letterToComponents letter -> set of "Component/vN"
 * @property {Record<string, string[]>} letterToVersions letter -> ["v11.6", ...]
 */

/**
 * @param {string} letter export file letter, e.g. "a"
 * @param {string} src package.json exports `src` path, e.g. "./src/exports/b.ts"
 * @returns {boolean}
 */
function srcPointsToLetter(src, letter) {
  return (
    typeof src === 'string' &&
    src.replace(/\\/g, '/').endsWith(`/exports/${letter}.ts`)
  )
}

/**
 * Format a concrete export key ("./v11_7") as a published version ("v11.7").
 * @param {string} key
 * @returns {string | null}
 */
function keyToVersion(key) {
  const m = CONCRETE_KEY_RE.exec(key)
  return m ? `v${m[1]}.${m[2]}` : null
}

/**
 * Read a package's lettered export files + package.json exports and build the
 * (component/vN) -> [published versions] mapping. Returns null when the package
 * is not part of the versioned/lettered-export system.
 * @param {string} repoRoot
 * @param {string} pkg
 * @returns {PackageExportMap | null}
 */
function buildPackageExportMap(repoRoot, pkg) {
  if (pkgCache.has(pkg)) return pkgCache.get(pkg)

  const exportsDir = path.join(repoRoot, 'packages', pkg, 'src', 'exports')
  const pkgJsonPath = path.join(repoRoot, 'packages', pkg, 'package.json')

  let result = null
  try {
    if (!fs.existsSync(exportsDir) || !fs.existsSync(pkgJsonPath)) {
      pkgCache.set(pkg, null)
      return null
    }

    // letter -> set of "Component/vN" it re-exports
    /** @type {Record<string, Set<string>>} */
    const letterToComponents = {}
    for (const file of fs.readdirSync(exportsDir)) {
      const lm = /^([a-z])\.ts$/.exec(file)
      if (!lm) continue
      const letter = lm[1]
      const content = fs.readFileSync(path.join(exportsDir, file), 'utf-8')
      const set = new Set()
      // Match `../Component/vN` (any quote/extension follows in the import path)
      const importRe = /\.\.\/([A-Za-z0-9]+)\/(v\d+)(?=[/'"])/g
      let m
      while ((m = importRe.exec(content)) !== null) {
        set.add(`${m[1]}/${m[2]}`)
      }
      letterToComponents[letter] = set
    }

    // letter -> [published versions], derived from package.json exports
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    const exportsMap = (pkgJson && pkgJson.exports) || {}
    /** @type {Record<string, string[]>} */
    const letterToVersions = {}
    for (const [key, val] of Object.entries(exportsMap)) {
      const version = keyToVersion(key)
      if (!version || !val || typeof val !== 'object') continue
      const src = /** @type {any} */ (val).src
      for (const letter of Object.keys(letterToComponents)) {
        if (srcPointsToLetter(src, letter)) {
          ;(letterToVersions[letter] || (letterToVersions[letter] = [])).push(
            version
          )
        }
      }
    }

    result = { letterToComponents, letterToVersions }
  } catch {
    result = null
  }

  pkgCache.set(pkg, result)
  return result
}

/**
 * Compare two "vMAJOR.MINOR" strings numerically.
 * @param {string} a
 * @param {string} b
 */
function compareVersions(a, b) {
  const pa = a.slice(1).split('.').map(Number)
  const pb = b.slice(1).split('.').map(Number)
  return pa[0] - pb[0] || pa[1] - pb[1]
}

/**
 * Resolve the published component versions touched by a list of changed files.
 * @param {string[]} files repo-root-relative POSIX paths (as from `git diff --name-only`)
 * @param {{ repoRoot?: string }} [opts]
 * @returns {string[]} sorted, de-duped, e.g. ["v11.6", "v11.7"]
 */
function resolveComponentVersions(files, opts = {}) {
  const repoRoot = opts.repoRoot || process.cwd()
  const versions = new Set()

  for (const raw of files || []) {
    const file = String(raw).replace(/\\/g, '/').trim()
    const m = VERSIONED_FILE_RE.exec(file)
    if (!m) continue
    const [, pkg, component, folder] = m

    const map = buildPackageExportMap(repoRoot, pkg)
    if (!map) continue

    const componentKey = `${component}/${folder}`
    for (const [letter, components] of Object.entries(map.letterToComponents)) {
      if (!components.has(componentKey)) continue
      for (const version of map.letterToVersions[letter] || []) {
        versions.add(version)
      }
    }
  }

  return Array.from(versions).sort(compareVersions)
}

/** Clear the per-package cache (used by tests). */
function _clearCache() {
  pkgCache.clear()
}

module.exports = {
  resolveComponentVersions,
  keyToVersion,
  _clearCache
}
