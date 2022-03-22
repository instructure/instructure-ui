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

import semver from 'semver'
import globby from 'globby'
import path from 'path'
import { getClientProps } from './utils/getClientProps'
import { processFile } from './processFile'
import fs from 'fs'
import { theme as canvasTheme } from '@instructure/canvas-theme'
import { theme as canvasHighContrastTheme } from '@instructure/canvas-high-contrast-theme'
import { theme as instructureTheme } from '@instructure/instructure-theme'
import type {
  IconFormat,
  LibraryOptions,
  MainDocsData,
  MainIconsData,
  ProcessedFile
} from './DataTypes'
import { getFrontMatter } from './utils/getFrontMatter'

const buildDir = './__build__/'
const projectRoot = path.resolve(__dirname, '../../../')
// there need to be required otherwise TSC will mess up the directory structure
// in the build directory
const rootPackage = require('../../../package.json') // root package.json
const versionsData = require('../versions.json')
const { major: latestMajorVersion } = semver.coerce(versionsData.latestVersion)!
const { major: rootPackageMajorVersion } = semver.coerce(rootPackage.version)!
const isOnLatestMajorVersion = latestMajorVersion === rootPackageMajorVersion
const resourcePageURL = isOnLatestMajorVersion
  ? rootPackage.homepage
  : `${rootPackage.homepage}/v${rootPackageMajorVersion}`
const library: LibraryOptions = {
  name: rootPackage.name,
  version: rootPackage.version,
  repository: rootPackage.repository.url,
  author: rootPackage.author,
  packages: 'packages',
  scope: '@instructure',
  codepen: {
    // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
    // this is usually whatever webpack entries you've defined
    js_external: [
      // should match entries in webpack.config.js
      `${resourcePageURL}/vendors~common~globals~main.js`,
      `${resourcePageURL}/vendors~globals~main.js`,
      `${resourcePageURL}/runtime~common.js`,
      `${resourcePageURL}/common.js`,
      `${resourcePageURL}/globals.js`
    ].join(';')
  }
}

const pathsToProcess = [
  // these can be commented out for faster debugging
  'CHANGELOG.md',
  '**/packages/**/*.md', // package READMEs
  '**/docs/**/*.md', // general docs
  '**/src/*.{js,ts,tsx}', // util src files
  '**/src/*/*.{js,ts,tsx}', // component src files
  '**/src/*/*/*.{js,ts,tsx}' // child component src files,
]

const pathsToIgnore = [
  '**/macro.{js,ts}',
  '**/*-loader.{js,ts}',
  '**/svg/**',
  '**/packages/**/CHANGELOG.md',
  '**/config/**',
  '**/templates/**',
  '**/node_modules/**',
  '**/__docs__/**',
  '**/__examples__/**',
  '**/__svg__/**',
  '**/__fixtures__/**',
  '**/__testfixtures__/**',
  '**/__tests__/**',
  '**/locales/**',
  '**/styles.{js,ts}',
  '**/theme.{js,ts}',
  '**/props.ts',
  '**/locator.{js,ts}',
  '**/*Locator.{js,ts}',

  '**/types/**',

  // ignore index files that just re-export
  '**/src/index.{js,ts}',

  // packages to ignore:
  '**/canvas-theme/**',
  '**/canvas-high-contrast-theme/**',
  '**/instructure-theme/**',
  '**/ui-theme-tokens/**',
  '**/template-app/**',
  '**/template-component/**',
  '**/template-package/**',
  '**/ui-test-*/src/**',
  '**/ui-scripts/src/**',

  // deprecated packages and modules:
  '**/InputModeListener.{js,ts}'
]

function buildDocs() {
  // eslint-disable-next-line no-console
  console.log('start building application data')

  const { COPY_VERSIONS_JSON = '1' } = process.env
  const shouldDoTheVersionCopy = Boolean(parseInt(COPY_VERSIONS_JSON))

  const files = pathsToProcess.map((file) => path.resolve(projectRoot, file))

  const ignore = pathsToIgnore.map((file) => path.resolve(projectRoot, file))

  globby(files, { ignore })
    .then((matches) => {
      fs.mkdirSync(buildDir + 'docs/', { recursive: true })
      // eslint-disable-next-line no-console
      console.log('Parsing markdown and source files...')
      const docs = matches.map((fullPath) => {
        // loop trough every source and Readme file
        return processSingleFile(fullPath)
      })
      const themes = parseThemes()
      const clientProps = getClientProps(docs, library)
      const props: MainDocsData = {
        ...clientProps,
        themes: themes,
        library
      }
      const markdownsAndSources = JSON.stringify(props)
      fs.writeFileSync(
        buildDir + 'markdown-and-sources-data.json',
        markdownsAndSources
      )
      // eslint-disable-next-line no-console
      console.log('Parsing icons...')
      const icons: MainIconsData = parseIcons()
      const iconJSON = JSON.stringify(icons)
      fs.writeFileSync(buildDir + 'icons-data.json', iconJSON)
      // eslint-disable-next-line no-console
      console.log('Finished building documentation data')
    })
    .then(() => {
      if (shouldDoTheVersionCopy) {
        // eslint-disable-next-line no-console
        console.log('Copying versions.json into __build__ folder')
        const versionFilePath = path.resolve(__dirname, '..', 'versions.json')
        const buildDirPath = path.resolve(__dirname, '..', '__build__')

        return fs.promises.copyFile(
          versionFilePath,
          `${buildDirPath}/versions.json`
        )
      }
      return undefined
    })
    .catch((error: Error) => {
      throw Error(
        `Error when generating documentation data: ${error}\n${error.stack}`
      )
    })
}

// This function is also called by Webpack if a file changes
function processSingleFile(fullPath: string) {
  let docObject: ProcessedFile
  const dirName = path.dirname(fullPath)
  const fileName = path.parse(fullPath).name
  if (fileName === 'index') {
    docObject = processFile(fullPath, projectRoot, library)
    // Components (e.g. Alert) store their descriptions in README.md files.
    // Add this to the final JSON if it's edited
    const readmeDesc = tryParseReadme(dirName)
    docObject.description = readmeDesc ? readmeDesc : docObject.description
  } else if (fileName === 'README') {
    // if we edit a README, we'll need to add the changes to the components JSON
    let componentIndexFile: string | undefined
    if (fs.existsSync(path.join(dirName, 'index.tsx'))) {
      componentIndexFile = path.join(dirName, 'index.tsx')
    } else if (fs.existsSync(dirName + 'index.ts')) {
      componentIndexFile = path.join(dirName, 'index.ts')
    }
    if (componentIndexFile) {
      docObject = processFile(componentIndexFile, projectRoot, library)
      const readmeDesc = tryParseReadme(dirName)
      docObject.description = readmeDesc ? readmeDesc : docObject.description
    } else {
      // just a README.md, has no index file
      docObject = processFile(fullPath, projectRoot, library)
    }
  } else {
    docObject = processFile(fullPath, projectRoot, library)
  }
  const docJSON = JSON.stringify(docObject!)
  fs.writeFileSync(buildDir + 'docs/' + docObject!.id + '.json', docJSON)
  return docObject!
}

function tryParseReadme(dirName: string) {
  const readme = path.join(dirName + '/README.md')
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
  parsed[canvasTheme.key] = {
    resource: canvasTheme,
    requirePath: '@instructure/canvas-theme'
  }
  parsed[canvasHighContrastTheme.key] = {
    resource: canvasHighContrastTheme,
    requirePath: '@instructure/canvas-high-contrast-theme'
  }
  parsed[instructureTheme.key] = {
    resource: instructureTheme,
    requirePath: '@instructure/instructure-theme'
  }
  return parsed
}

function parseIcons() {
  const packageName = '@instructure/ui-icons'
  const iconFormats = {
    React: '',
    SVG: 'svg',
    Font: 'font'
  }
  type FormatName = 'icons-svg' | `icons-react` | 'icons-font'
  const formats = {} as Record<FormatName, IconFormat>
  let format: keyof typeof iconFormats
  for (format in iconFormats) {
    const pathEnd =
      iconFormats[format].length > 0 ? '/' + iconFormats[format] : ''
    const requirePath = packageName + '/lib' + pathEnd
    let glyphs = require(requirePath)
    if (format === 'React') {
      const formats: Record<string, any> = {}
      Object.keys(glyphs).forEach(function (key) {
        const IconClass = glyphs[key]
        formats[key] = {
          name: key,
          variant: IconClass.variant,
          glyphName: IconClass.glyphName,
          deprecated: !!IconClass.deprecated
        }
      })
      glyphs = formats
    }
    const formatName = `icons-${format.toLowerCase()}` as FormatName
    formats[formatName] = {
      format: format,
      glyphs: glyphs,
      packageName: packageName,
      requirePath: packageName + '/es' + pathEnd
    }
  }
  return {
    packageName: packageName,
    formats: formats
  }
}

export { pathsToProcess, pathsToIgnore, processSingleFile, buildDocs }
