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

import type {
  API,
  ASTPath,
  Collection,
  FileInfo,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSCodeshift,
  Transform
} from 'jscodeshift'
import type { InstUICodemod } from './utils/instUICodemodExecutor'
import { findImportPath, printWarning } from './utils/codemodHelpers'
import { isImportSpecifier } from './utils/codemodTypeCheckers'
import instUICodemodExecutor from './utils/instUICodemodExecutor'
import versionedExports from './generated/versionedExports'

type ParsedImportPath = {
  base: string
  version: string
}
type Specifier =
  | ImportSpecifier
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier

function normalizeVersion(raw: string): string {
  return raw.replace(/\./g, '_')
}

// parseImportPath('@instructure/ui-button')         → { base: '@instructure/ui-button', version: '' }
// parseImportPath('@instructure/ui-button/v11_7')       → { base: '@instructure/ui-button', version: 'v11_7' }
// parseImportPath('react')                           → null
function parseImportPath(importPath: string): ParsedImportPath | null {
  const match = importPath.match(/^(@instructure\/[^/]+)(\/(.+))?$/)
  if (!match) return null
  return { base: match[1], version: match[3] ?? '' }
}

function buildImportPath(packageName: string, version: string): string {
  return version ? `${packageName}/${version}` : packageName
}

// detectQuoteStyle(`import { Foo } from "@instructure/ui-button"`) → 'double'
// detectQuoteStyle(`import { Foo } from '@instructure/ui-button'`) → 'single'
function detectQuoteStyle(source: string): 'single' | 'double' {
  const match = source.match(/from\s+(['"])@instructure\//)
  return match?.[1] === '"' ? 'double' : 'single'
}

// detectSemi(`import { Foo } from '@instructure/ui-button';`) → true
// detectSemi(`import { Foo } from '@instructure/ui-button'`)  → false
function detectSemi(source: string): boolean {
  const importLine = source.match(
    /^import\b[^'"\n]*from[ \t]+['"][^'"]+['"][^\n]*/m
  )?.[0]
  return importLine ? /;[ \t]*$/.test(importLine) : false
}

// stripImportSemis(`import { Foo } from '@instructure/ui-button';`) → `import { Foo } from '@instructure/ui-button'`
function stripImportSemis(source: string): string {
  return source.replace(
    /^(import\b[^'"\n]*from[ \t]+['"][^'"]+['"][ \t]*);$/gm,
    '$1'
  )
}

function parseComponents(raw: unknown): string[] | undefined {
  return raw
    ? String(raw)
        .split(',')
        .map((s) => s.trim())
    : undefined
}

// Diagnose mode: reports all @instructure imports found in the file.
function runDiagnose(
  j: JSCodeshift,
  root: Collection,
  file: FileInfo,
  api: API,
  components: string[] | undefined
): void {
  findImportPath(j, root, '@instructure/', false).forEach(
    (path: ASTPath<ImportDeclaration>) => {
      const importPath = path.node.source.value as string
      const parsed = parseImportPath(importPath)
      if (!parsed) return

      const matched: string[] = []
      path.node.specifiers?.forEach((specifier: Specifier) => {
        if (isMatchingSpecifier(specifier, components))
          matched.push(String(specifier.imported.name))
      })

      if (matched.length === 0) return

      const line = path.node.loc?.start.line ?? 0
      api.report(
        `${file.path}:${line}  ${importPath}  [${
          parsed.version || 'oldest'
        }]  { ${matched.join(', ')} }`
      )
    }
  )
}

function isMatchingSpecifier(
  s: Specifier,
  components: string[] | undefined
): s is ImportSpecifier {
  return (
    isImportSpecifier(s) &&
    (!components || components.includes(String(s.imported.name)))
  )
}

// Transform mode: rewrites @instructure import paths to the target version.
// When a single import mixes versioned components with unversioned symbols,
// the import is split: unversioned symbols stay at the original path, versioned
// components are moved to a new import at the target path.
const updateInstUIImportVersionsCodemod =
  (
    components: string[] | undefined,
    versionTo: string,
    versionFrom: string | undefined,
    report?: (msg: string) => void
  ): InstUICodemod =>
  (j, root, filePath) => {
    let hasChanges = false

    findImportPath(j, root, '@instructure/', false).forEach(
      (path: ASTPath<ImportDeclaration>) => {
        const importPath = path.node.source.value as string
        const parsed = parseImportPath(importPath)
        if (!parsed) return

        if (versionFrom && parsed.version !== versionFrom) return

        const allSpecifiers = path.node.specifiers ?? []
        const matching = allSpecifiers.filter((s) =>
          isMatchingSpecifier(s, components)
        )

        if (matching.length === 0) return

        const newPath = buildImportPath(parsed.base, versionTo)
        if (newPath === importPath) return

        const remaining = allSpecifiers.filter(
          (s) => !isMatchingSpecifier(s, components)
        )

        const line = path.node.loc?.start.line ?? 0

        if (remaining.length === 0 || parsed.base === '@instructure/ui') {
          // Simple path rewrite: either all specifiers match, or the source
          // is @instructure/ui whose version files re-export every
          // symbol (including non-component utilities like canvas) — no split
          // needed. Individual @instructure/* packages are split below because
          // they don't have version files for their non-component exports.
          // eslint-disable-next-line no-param-reassign
          path.node.source.value = newPath
          report?.(`${filePath}:${line}  '${importPath}'  →  '${newPath}'`)
        } else {
          // Mixed import from an individual @instructure package — split:
          // keep non-matching specifiers at the original path,
          // move matching specifiers to the versioned path.
          // eslint-disable-next-line no-param-reassign
          path.node.specifiers = remaining
          const newDecl = j.importDeclaration(
            matching,
            j.stringLiteral(newPath)
          )
          newDecl.importKind = path.node.importKind
          path.insertAfter(newDecl)
          report?.(
            `${filePath}:${line}  '${importPath}'  →  (split) '${newPath}'`
          )
        }

        hasChanges = true
      }
    )

    return hasChanges
  }

const updateInstUIImportVersions: Transform = (file, api, options) => {
  // When no --components filter is given, fall back to the full list of known
  const components = parseComponents(options.components) ?? [
    ...versionedExports
  ]

  if (options.diagnose) {
    const j = api.jscodeshift.withParser('tsx')
    let root
    try {
      root = j(file.source)
    } catch (e) {
      printWarning(
        file.path,
        undefined,
        `Failed to parse file: ${e instanceof Error ? e.message : String(e)}`
      )
      return null
    }
    runDiagnose(j, root, file, api, components)
    return null
  }

  if (!options.versionTo) return null

  const versionTo = normalizeVersion(String(options.versionTo))
  const versionFrom = options.versionFrom
    ? normalizeVersion(String(options.versionFrom))
    : undefined

  const quote = detectQuoteStyle(file.source)
  const hasSemi = detectSemi(file.source)

  try {
    const result = instUICodemodExecutor(
      updateInstUIImportVersionsCodemod(
        components,
        versionTo,
        versionFrom,
        api.report
      ),
      file,
      api,
      { ...options, quote }
    )
    // jscodeshift's pretty-printer adds semicolons to import statements by
    // default, but we want to preserve the original style when not using
    // Prettier. If Prettier is enabled, we assume it will handle semicolons
    // according to the user's configuration.
    if (result && !hasSemi && options.usePrettier === false) {
      return stripImportSemis(result)
    }
    return result
  } catch (e) {
    printWarning(
      file.path,
      undefined,
      `Transform failed: ${e instanceof Error ? e.message : String(e)}`
    )
    throw e
  }
}

export default updateInstUIImportVersions
export { updateInstUIImportVersionsCodemod }
