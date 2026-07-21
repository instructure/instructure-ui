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

import { globby } from 'globby'
import path from 'path'
import os from 'os'
import { Worker } from 'worker_threads'
import { getClientProps } from './utils/getClientProps.mjs'
import { parseSingleFile, projectRoot, library } from './parseSingleFile.mjs'
import fs from 'fs'
import {
  canvas,
  canvasHighContrast,
  dark,
  light,
  legacyCanvas,
  legacyCanvasHighContrast
} from '@instructure/ui-themes'
import type {
  MainDocsData,
  ProcessedFile,
  VersionMap
} from './DataTypes.mjs'
import { buildVersionMap, getPackageShortName, isDocIncludedInVersion } from './utils/buildVersionMap.mjs'
import { fileURLToPath, pathToFileURL } from 'url'
import { generateAIAccessibleMarkdowns } from './ai-accessible-documentation/generate-ai-accessible-markdowns.mjs'
import { generateAIAccessibleLlmsFile } from './ai-accessible-documentation/generate-ai-accessible-llms-file.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const buildDir = './__build__/'
const packagesDir = '../..'

// TODO this misses:
// ui-react-utils/src/DeterministicIDContext.ts and some others
const pathsToProcess = [
  // these can be commented out for faster debugging
  'CHANGELOG.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE.md',
  '**/docs/**/*.md', // general docs
  '**/src/*.{ts,tsx}', // util src files
  '**/src/*/*.md', // non-versioned component READMEs
  '**/src/*/*.{ts,tsx}', // non-versioned component src files
  '**/src/*/*/*.{ts,tsx}', // non-versioned child component src files
  '**/src/*/v*/*.md', // versioned component READMEs
  '**/src/*/v*/*.{ts,tsx}', // versioned component src files
  '**/src/*/v*/*/*.{ts,tsx}' // versioned child component src files
]

const pathsToIgnore = [
  '**/macro.{js,ts}',
  '**/svg/**',
  'packages/*/README.md', // main package READMEs
  '**/packages/**/CHANGELOG.md',
  '**/config/**',
  '**/templates/**',
  '**/node_modules/**',
  '**/__docs__/**',
  '**/__build__/**',
  '**/__fixtures__/**',
  '**/__testfixtures__/**',
  '**/__tests__/**',
  '**/styles.{tsx,ts}',
  '**/theme.{tsx,ts}',
  '**/types/**',

  // ignore index files that just re-export
  '**/src/index.ts',

  // version export mapping files (e.g. src/exports/a.ts, b.ts)
  '**/src/exports/**',
  // shared theme token files
  '**/src/legacySharedThemeTokens/**',

  // packages to ignore:
  '**/canvas-theme/**',
  '**/canvas-high-contrast-theme/**',
  '**/ui-theme-tokens/**',
  '**/ui-test-*/src/**',
  '**/ui-scripts/src/**',

  // large generated files:
  '**/lucide/**', // Lucide icons directory (large generated file)

  // deprecated packages and modules:
  '**/InputModeListener.ts',
  // regression testing app:
  '**/regression-test/**'
]

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  // This line is executed if this file is run directly in Node, see
  // https://stackoverflow.com/a/75760840
  buildDocs()
}

/**
 * Filters processed docs for a specific library version using the version map.
 * Delegates per-doc inclusion logic to the shared `isDocIncludedInVersion`.
 */
function filterDocsForVersion(
  allDocs: ProcessedFile[],
  libVersion: string,
  versionMap: VersionMap
): ProcessedFile[] {
  return allDocs.filter((doc) =>
    isDocIncludedInVersion(
      versionMap,
      libVersion,
      doc.componentVersion,
      getPackageShortName(doc.relativePath),
      doc.componentDirName
    )
  )
}

async function buildDocs() {
  const startedAt = Date.now()

  const { COPY_VERSIONS_JSON = '1' } = process.env
  const shouldDoTheVersionCopy = Boolean(parseInt(COPY_VERSIONS_JSON))

  try {
    // Build the version map first
    const versionMap = await buildVersionMap(projectRoot)

    // globby needs the posix format
    const files = pathsToProcess.map((file) =>
      path.posix.join(packagesDir, file)
    )
    const ignore = pathsToIgnore.map((file) =>
      path.posix.join(packagesDir, file)
    )
    const matches = await globby(files, { ignore })

    fs.mkdirSync(buildDir + 'docs/', { recursive: true })
    const allDocs = await parseFilesInParallel(
      matches.map((relativePath) => path.resolve(relativePath))
    )

    const themes = parseThemes()
    const { defaultVersion } = versionMap

    // Build per-version output, caching the default version result
    let defaultMainDocsData: MainDocsData | undefined
    for (const libVersion of versionMap.libraryVersions) {
      const versionBuildDir = buildDir + 'docs/' + libVersion + '/'
      fs.mkdirSync(versionBuildDir, { recursive: true })

      const versionDocs = filterDocsForVersion(allDocs, libVersion, versionMap)
      // eslint-disable-next-line no-console
      console.log(`Generated docs for ${libVersion} (${versionDocs.length} entries)`)

      const clientProps = getClientProps(versionDocs)
      const mainDocsData: MainDocsData = {
        ...clientProps,
        themes,
        library
      }

      if (libVersion === defaultVersion) {
        defaultMainDocsData = mainDocsData
      }

      // Write markdown-and-sources-data.json for this version
      fs.writeFileSync(
        versionBuildDir + 'markdown-and-sources-data.json',
        JSON.stringify(mainDocsData)
      )

      // Write individual doc JSONs for this version
      for (const doc of versionDocs) {
        fs.writeFileSync(
          versionBuildDir + doc.id + '.json',
          JSON.stringify(doc)
        )
      }
    }

    // Backward-compatible root output (uses default version matching "." export)
    fs.writeFileSync(
      buildDir + 'markdown-and-sources-data.json',
      JSON.stringify(defaultMainDocsData)
    )

    // Write default version's per-doc JSONs to root docs/ as a backward-compatible
    // fallback (no version prefix in the path).
    const defaultVersionDocs = filterDocsForVersion(allDocs, defaultVersion, versionMap)
    for (const doc of defaultVersionDocs) {
      fs.writeFileSync(
        buildDir + 'docs/' + doc.id + '.json',
        JSON.stringify(doc)
      )
    }

    // Write version manifest (client only needs versions + default, not the full map)
    const docsVersionsManifest = {
      libraryVersions: versionMap.libraryVersions,
      defaultVersion
    }
    fs.writeFileSync(
      buildDir + 'docs-versions.json',
      JSON.stringify(docsVersionsManifest)
    )

    // Generate AI accessible documentation from the latest library version.
    const latestVersion =
      versionMap.libraryVersions[versionMap.libraryVersions.length - 1] ||
      defaultVersion
    const latestVersionDocsDir = buildDir + 'docs/' + latestVersion + '/'
    const latestVersionSourcesData =
      latestVersionDocsDir + 'markdown-and-sources-data.json'

    // The latest version plus its versioned packages (the version map's
    // mapping keys), used to emit versioned import examples in the markdown.
    const versionImport = {
      version: latestVersion,
      versionedPackages: new Set(
        Object.keys(versionMap.mapping[latestVersion] || {})
      )
    }

    await generateAIAccessibleMarkdowns(
      latestVersionDocsDir,
      buildDir + 'markdowns/',
      latestVersionSourcesData,
      versionImport
    )

    generateAIAccessibleLlmsFile(latestVersionSourcesData, {
      outputFilePath: path.join(buildDir, 'llms.txt'),
      baseUrl: 'https://instructure.design/markdowns/',
      summariesFilePath: path.join(
        __dirname,
        '../buildScripts/ai-accessible-documentation/summaries-for-llms-file.json'
      )
    })

    fs.copyFileSync(
      projectRoot + '/packages/ui-icons/src/generated/legacy/legacy-icons-data.json',
      buildDir + 'legacy-icons-data.json'
    )

    // eslint-disable-next-line no-console
    console.log(`Docs built in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`)

    if (shouldDoTheVersionCopy) {
      const versionFilePath = path.resolve(__dirname, '..', 'versions.json')
      const buildDirPath = path.resolve(__dirname, '..', '__build__')

      await fs.promises.copyFile(
        versionFilePath,
        `${buildDirPath}/versions.json`
      )
    }
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error))
    throw new Error(
      `Error when generating documentation data: ${err.message}\n${err.stack}`
    )
  }
}

/**
 * Reports parse progress as files complete, returning a `tick` to call once per
 * file. Renders a single growing line — `Parsing documentation sources....... done`
 * — appending one dot per ~10% completed. We use `process.stdout.write` (not
 * `console.log`, and no `\r` redraws) because under `pnpm dev` our stdout is
 * piped through `concurrently`: a carriage return would clobber its `[docs]`
 * line prefix, whereas appended dots keep building up on the one line. In
 * verbose mode the per-file `Processing …` logs (see processFile) are the
 * progress indicator, so this is suppressed.
 */
function createProgressReporter(total: number) {
  if (process.env.DOCS_VERBOSE) {
    return () => {}
  }

  const totalDots = 25
  let done = 0
  let dots = 0

  return () => {
    done += 1
    if (done === 1) {
      process.stdout.write('Parsing documentation sources')
      // manually printing the first 2 dots so it feels more immediate before the actual progress starts
      setTimeout(() => {
        process.stdout.write('.')
      }, 400)
      setTimeout(() => {
        process.stdout.write('.')
      }, 800)
    }
    const target = Math.floor((done / total) * totalDots)
    while (dots < target) {
      process.stdout.write('.')
      dots += 1
    }
    if (done === total) {
      process.stdout.write(` done (${total} files)\n`)
    }
  }
}

/**
 * Parses every file across a pool of worker threads, then reassembles the
 * results into the exact same order a serial `matches.map(parseSingleFile)`
 * would produce. react-docgen/babel parsing is CPU-bound and single-threaded,
 * so fanning the ~1700 files out across cores is the dominant startup win.
 *
 * Each worker returns its docs as a JSON string keyed by original index; the
 * parent slots them back by index, so the final output matches the serial build
 * regardless of which worker finishes first. Workers also post a `tick` per
 * file to drive the progress bar.
 */
async function parseFilesInParallel(
  absPaths: string[]
): Promise<ProcessedFile[]> {
  const cpuCount =
    typeof os.availableParallelism === 'function'
      ? os.availableParallelism()
      : os.cpus().length
  const workerCount = Math.max(1, Math.min(cpuCount - 1, absPaths.length))
  const tick = createProgressReporter(absPaths.length)

  // For tiny inputs the worker spin-up cost dominates; parse in-process.
  if (workerCount <= 1 || absPaths.length < 50) {
    return absPaths
      .map((p) => {
        const doc = parseSingleFile(p, projectRoot, library)
        tick()
        return doc
      })
      .filter(Boolean) as ProcessedFile[]
  }

  // Round-robin into chunks for even load (some files are far heavier than
  // others); the carried index restores serial ordering afterwards.
  const chunks: [number, string][][] = Array.from(
    { length: workerCount },
    () => []
  )
  absPaths.forEach((p, index) => {
    chunks[index % workerCount].push([index, p])
  })

  const workerURL = new URL('./parse-worker.mjs', import.meta.url)
  const slots: (ProcessedFile | null)[] = new Array(absPaths.length).fill(null)

  await Promise.all(
    chunks.map(
      (items) =>
        new Promise<void>((resolve, reject) => {
          const worker = new Worker(workerURL, {
            workerData: { items }
          })
          worker.on(
            'message',
            (msg: { t: 'tick' } | { t: 'done'; data: string }) => {
              if (msg.t === 'tick') {
                tick()
              } else {
                const entries = JSON.parse(msg.data) as [
                  number,
                  ProcessedFile | null
                ][]
                for (const [index, doc] of entries) {
                  slots[index] = doc
                }
                resolve()
              }
            }
          )
          worker.once('error', reject)
          worker.once('exit', (code) => {
            if (code !== 0) {
              reject(new Error(`Parse worker stopped with exit code ${code}`))
            }
          })
        })
    )
  )

  return slots.filter(Boolean) as ProcessedFile[]
}

function resolveComponents(theme: typeof legacyCanvas | typeof legacyCanvasHighContrast) {
  const sem = theme.semantics(theme.primitives)
  const resolved: Record<string, any> = {}
  for (const [key, fn] of Object.entries(theme.components)) {
    if (typeof fn === 'function') {
      resolved[key] = fn(sem)
    }
  }
  return resolved
}

/** Recursively flatten a nested color object, keeping only string values, using the innermost key (e.g. grey.grey10 → grey10) */
function flattenPrimitiveColors(obj: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = value
    } else if (value !== null && typeof value === 'object') {
      Object.assign(result, flattenPrimitiveColors(value))
    }
  }
  return result
}

/** Flatten a nested object using camelCase prefix concatenation for the keys */
function flattenSemanticColors(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix
      ? `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`
      : key
    if (typeof value === 'string') {
      result[fullKey] = value
    } else if (value !== null && typeof value === 'object') {
      Object.assign(result, flattenSemanticColors(value, fullKey))
    }
  }
  return result
}

function resolveNewThemeColors(newThemeObj: typeof legacyCanvas) {
  const sem = newThemeObj.semantics(newThemeObj.primitives)
  return {
    primitives: flattenPrimitiveColors(newThemeObj.primitives.color),
    semantic: flattenSemanticColors(sem.color)
  }
}

function parseThemes() {
  const parsed: MainDocsData['themes'] = {}
  // legacy-canvas first so it becomes the default rendering theme
  // resolvedComponents/resolvedColors: pre-computed plain objects (functions can't survive JSON.stringify)
  parsed['legacy-canvas'] = {
    resource: { ...canvas, resolvedComponents: resolveComponents(legacyCanvas) }
  }
  parsed['legacy-canvas-high-contrast'] = {
    resource: { ...canvasHighContrast, resolvedComponents: resolveComponents(legacyCanvasHighContrast) }
  }
  // `key` is read by Document.tsx's `componentDidUpdate` to detect theme
  // changes and refetch the Default Theme Variables. `legacyCanvas` /
  // `legacyCanvasHighContrast` from `newThemeTokens` do not include a `key`
  // field (unlike `light` / `dark`, which come through wrappers that set it).
  // Without it, switching e.g. canvas (legacy) → canvas-high-contrast (legacy)
  // on v11_7 leaves `themeVariables.key` `undefined` on both sides, so
  // `undefined !== undefined` is false and the refetch never fires.
  parsed['canvas'] = {
    resource: {
      ...legacyCanvas,
      key: 'canvas',
      resolvedColors: resolveNewThemeColors(legacyCanvas),
      resolvedComponents: resolveComponents(legacyCanvas),
      description: canvas.description
    }
  }
  parsed['canvas-high-contrast'] = {
    resource: {
      ...legacyCanvasHighContrast,
      key: 'canvas-high-contrast',
      resolvedColors: resolveNewThemeColors(legacyCanvasHighContrast),
      resolvedComponents: resolveComponents(legacyCanvasHighContrast),
      description: canvasHighContrast.description
    }
  }
  parsed[light.key] = {
    resource: {
      ...light,
      resolvedColors: resolveNewThemeColors(light.newTheme as typeof legacyCanvas),
      resolvedComponents: resolveComponents(light.newTheme as typeof legacyCanvas)
    }
  }
  parsed[dark.key] = {
    resource: {
      ...dark,
      resolvedColors: resolveNewThemeColors(dark.newTheme as typeof legacyCanvas),
      resolvedComponents: resolveComponents(dark.newTheme as typeof legacyCanvas)
    }
  }
  const canvasSemantics = legacyCanvas.semantics(legacyCanvas.primitives)
  parsed['shared-tokens'] = { resource: legacyCanvas.sharedTokens(canvasSemantics) }
  return parsed
}

export {
  pathsToProcess,
  pathsToIgnore,
  buildDocs,
  filterDocsForVersion
}
