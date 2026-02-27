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
import { getClientProps } from './utils/getClientProps.mjs'
import { processFile } from './processFile.mjs'
import fs from 'fs'
import {
  canvas,
  canvasHighContrast,
  rebrandDark,
  rebrandLight
} from '@instructure/ui-themes'
import type {
  LibraryOptions,
  MainDocsData,
  ProcessedFile,
  VersionMap
} from './DataTypes.mjs'
import { getFrontMatter } from './utils/getFrontMatter.mjs'
import { buildVersionMap } from './utils/buildVersionMap.mjs'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { generateAIAccessibleMarkdowns } from './ai-accessible-documentation/generate-ai-accessible-markdowns.mjs'
import { generateAIAccessibleLlmsFile } from './ai-accessible-documentation/generate-ai-accessible-llms-file.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

// This needs to be required, otherwise TSC will mess up the directory structure
// in the output directory
// eslint-disable-next-line @instructure/no-relative-imports
const rootPackage = require('../../../package.json') // root package.json

const buildDir = './__build__/'
const projectRoot = path.resolve(__dirname, '../../../')
const packagesDir = '../..'
const library: LibraryOptions = {
  name: rootPackage.name,
  version: rootPackage.version,
  repository: rootPackage.repository.url,
  author: rootPackage.author,
  packages: 'packages',
  scope: '@instructure'
}

// TODO this misses:
// ui-react-utils/src/DeterministicIDContext.ts and some others
const pathsToProcess = [
  // these can be commented out for faster debugging
  'CHANGELOG.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE.md',
  '**/docs/**/*.md', // general docs
  '**/src/*.{ts,tsx}', // util src files
  '**/src/*/v*/*.md', // package READMEs (all versions)
  '**/src/*/v*/*.{ts,tsx}', // component src files (all versions)
  '**/src/*/v*/*/*.{ts,tsx}' // child component src files (all versions)
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
 * Extracts the package short name (e.g. 'ui-avatar') from a doc's relativePath.
 * Returns undefined for files that are not inside a ui-* package.
 */
function getPackageShortName(relativePath: string): string | undefined {
  const match = relativePath.match(/packages\/(ui-[^/]+)\//)
  return match ? match[1] : undefined
}

/**
 * Filters processed docs for a specific library version using the version map.
 * - Docs with no componentVersion (general docs, utils, CHANGELOG) → included in all versions
 * - Versioned docs → only included if their componentVersion matches the expected
 *   version for this library version in the version map
 */
function filterDocsForVersion(
  allDocs: ProcessedFile[],
  libVersion: string,
  versionMap: VersionMap
): ProcessedFile[] {
  const versionMapping = versionMap.mapping[libVersion] || {}

  return allDocs.filter((doc) => {
    // Non-versioned docs go into all versions
    if (!doc.componentVersion) {
      return true
    }

    const pkgShortName = getPackageShortName(doc.relativePath)
    if (!pkgShortName) {
      // Not a package file, include it
      return true
    }

    const entry = versionMapping[pkgShortName]
    if (!entry) {
      // Package not in the version map (e.g. no multi-version exports).
      // Include the doc if it's v1 (the default/only version)
      return doc.componentVersion === 'v1'
    }

    return doc.componentVersion === entry.componentVersion
  })
}

async function buildDocs() {
  // eslint-disable-next-line no-console
  console.log('Start building application data')
  console.time('docs build time')

  const { COPY_VERSIONS_JSON = '1' } = process.env
  const shouldDoTheVersionCopy = Boolean(parseInt(COPY_VERSIONS_JSON))

  try {
    // Build the version map first
    // eslint-disable-next-line no-console
    console.log('Building version map...')
    const versionMap = await buildVersionMap(projectRoot)
    // eslint-disable-next-line no-console
    console.log(
      `Found library versions: ${versionMap.libraryVersions.join(', ')}`
    )

    // globby needs the posix format
    const files = pathsToProcess.map((file) =>
      path.posix.join(packagesDir, file)
    )
    const ignore = pathsToIgnore.map((file) =>
      path.posix.join(packagesDir, file)
    )
    const matches = await globby(files, { ignore })

    fs.mkdirSync(buildDir + 'docs/', { recursive: true })
    // eslint-disable-next-line no-console
    console.log(
      'Parsing markdown and source files... (' + matches.length + ' files)'
    )
    const allDocs = matches
      .map((relativePath) => parseSingleFile(path.resolve(relativePath)))
      .filter(Boolean) as ProcessedFile[]

    const themes = parseThemes()
    const defaultVersion =
      versionMap.libraryVersions[versionMap.libraryVersions.length - 1]

    // Build per-version output, caching the default version result
    let defaultMainDocsData: MainDocsData | undefined
    for (const libVersion of versionMap.libraryVersions) {
      const versionBuildDir = buildDir + 'docs/' + libVersion + '/'
      fs.mkdirSync(versionBuildDir, { recursive: true })

      const versionDocs = filterDocsForVersion(allDocs, libVersion, versionMap)
      // eslint-disable-next-line no-console
      console.log(
        `Building docs for ${libVersion}: ${versionDocs.length} docs`
      )

      const clientProps = getClientProps(versionDocs, library)
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

    // Backward-compatible root output (uses default/highest version)
    fs.writeFileSync(
      buildDir + 'markdown-and-sources-data.json',
      JSON.stringify(defaultMainDocsData)
    )

    // Write version manifest (client only needs versions + default, not the full map)
    const docsVersionsManifest = {
      libraryVersions: versionMap.libraryVersions,
      defaultVersion
    }
    fs.writeFileSync(
      buildDir + 'docs-versions.json',
      JSON.stringify(docsVersionsManifest)
    )
    // eslint-disable-next-line no-console
    console.log('Wrote docs-versions.json')

    // Generate AI accessible documentation from default version
    const defaultVersionDocsDir = buildDir + 'docs/' + defaultVersion + '/'
    generateAIAccessibleMarkdowns(defaultVersionDocsDir, buildDir + 'markdowns/')

    generateAIAccessibleLlmsFile(
      buildDir + 'markdown-and-sources-data.json',
      {
        outputFilePath: path.join(buildDir, 'llms.txt'),
        baseUrl: 'https://instructure.design/markdowns/',
        summariesFilePath: path.join(
          __dirname,
          '../buildScripts/ai-accessible-documentation/summaries-for-llms-file.json'
        )
      }
    )

    // eslint-disable-next-line no-console
    console.log('Copying icons data...')
    fs.copyFileSync(
      projectRoot + '/packages/ui-icons/src/__build__/icons-data.json',
      buildDir + 'icons-data.json'
    )

    // eslint-disable-next-line no-console
    console.log('Finished building documentation data')

    console.timeEnd('docs build time')

    if (shouldDoTheVersionCopy) {
      // eslint-disable-next-line no-console
      console.log('Copying versions.json into __build__ folder')
      const versionFilePath = path.resolve(__dirname, '..', 'versions.json')
      const buildDirPath = path.resolve(__dirname, '..', '__build__')

      await fs.promises.copyFile(
        versionFilePath,
        `${buildDirPath}/versions.json`
      )
    }
  } catch (error: unknown) {
    const err = error as Error
    throw Error(
      `Error when generating documentation data: ${err}\n${err.stack}`
    )
  }
}

/**
 * Parses a single file and returns a ProcessedFile, or undefined if it
 * should be skipped. Pure parsing — no file writes.
 */
function parseSingleFile(fullPath: string) {
  let docObject
  const dirName = path.dirname(fullPath)
  const fileName = path.parse(fullPath).name
  if (fileName === 'index') {
    docObject = processFile(fullPath, projectRoot, library)
    if (!docObject) {
      return
    }
    // Some Components (e.g. Alert) store their descriptions in README.md files.
    // Add this to the final JSON if it's edited
    const readmeDesc = tryParseReadme(dirName)
    docObject.description = readmeDesc
      ? docObject.description + readmeDesc
      : docObject.description
  } else if (fileName === 'README') {
    // if we edit a README, we'll need to add the changes to the components JSON
    let componentIndexFile: string | undefined
    if (fs.existsSync(path.join(dirName, 'index.tsx'))) {
      componentIndexFile = path.join(dirName, 'index.tsx')
    } else if (fs.existsSync(path.join(dirName, 'index.ts'))) {
      componentIndexFile = path.join(dirName, 'index.ts')
    }
    if (componentIndexFile) {
      docObject = processFile(componentIndexFile, projectRoot, library)!
      const readmeDesc = tryParseReadme(dirName)
      docObject.description = readmeDesc ? readmeDesc : docObject.description
    } else {
      // just a README.md, has no index file
      docObject = processFile(fullPath, projectRoot, library)
    }
  } else {
    // documentation .md files, utils ts and tsx files
    docObject = processFile(fullPath, projectRoot, library)
  }
  return docObject || undefined
}

/**
 * Parses a file and writes its JSON to the root build dir.
 * Used by the Webpack watcher for incremental rebuilds.
 */
function processSingleFile(fullPath: string) {
  const docObject = parseSingleFile(fullPath)
  if (!docObject) {
    return
  }
  const docJSON = JSON.stringify(docObject)
  fs.writeFileSync(buildDir + 'docs/' + docObject.id + '.json', docJSON)
  return docObject
}

function tryParseReadme(dirName: string) {
  const readme = path.join(dirName, 'README.md')
  if (fs.existsSync(readme)) {
    const data = fs.readFileSync(readme)
    const frontMatter = getFrontMatter(data)
    return frontMatter.description
    // TODO here the 'describes' field was used to pair them, remove it
  }
  return undefined
}

function parseThemes() {
  const parsed: MainDocsData['themes'] = {}
  parsed[canvas.key] = { resource: canvas }
  parsed[canvasHighContrast.key] = { resource: canvasHighContrast }
  parsed[rebrandLight.key] = { resource: rebrandLight }
  parsed[rebrandDark.key] = { resource: rebrandDark }
  return parsed
}

export {
  pathsToProcess,
  pathsToIgnore,
  parseSingleFile,
  processSingleFile,
  buildDocs,
  filterDocsForVersion,
  getPackageShortName
}
