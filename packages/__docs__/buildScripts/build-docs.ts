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

export type LibraryOptions = {
  name: string
  version: string
  repository: string
  author: string
  packages: 'packages'
  scope: '@instructure'
  codepen: {
    js_external: string
  }
}

type OptionsObject = {
  projectRoot: string
  library: LibraryOptions
  files: string[]
  ignore: string[]
}

// eslint-disable-next-line no-console
console.log('start building application data')
// there need to be required otherwise TSC will mess up the directory structure
// in the build directory
const versionsData = require('../versions.json')
const rootPackage = require('../../../package.json') // root package.json

const projectRoot = path.resolve(__dirname, '../../../')
const { COPY_VERSIONS_JSON = '1' } = process.env
const shouldDoTheVersionCopy = Boolean(parseInt(COPY_VERSIONS_JSON))

const { major: latestMajorVersion } = semver.coerce(versionsData.latestVersion)!
const { major: rootPackageMajorVersion } = semver.coerce(rootPackage.version)!

const isOnLatestMajorVersion = latestMajorVersion === rootPackageMajorVersion
const resourcePageURL = isOnLatestMajorVersion
  ? rootPackage.homepage
  : `${rootPackage.homepage}/v${rootPackageMajorVersion}`

const options: OptionsObject = {
  projectRoot: projectRoot,
  library: {
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
  },
  files: [
    // these can be commented out for faster debugging
    '**/*.md', // package READMEs
    '**/src/*.{js,ts,tsx}', // util src files
    '**/src/*/*.{js,ts,tsx}', // component src files
    '**/src/*/*/*.{js,ts,tsx}' // child component src files,
  ],
  ignore: [
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
}

const files = options.files.map((file) =>
  path.resolve(options.projectRoot, file)
)

const ignore = options.ignore.map((file) =>
  path.resolve(options.projectRoot, file)
)

globby(files, { ignore })
  .then((matches) => {
    const buildDir = './__build__/'
    fs.mkdirSync(buildDir, { recursive: true })
    // eslint-disable-next-line no-console
    console.log('Parsing markdown and source files...')
    const docs = matches.map((filepath) => {
      // loop trough every source and Readme file
      return processFile(filepath, options.projectRoot, options.library)
    })
    const themes = parseThemes()
    const props = getClientProps(docs, themes, options.library)
    const markdownsAndSources = JSON.stringify(props)
    fs.writeFileSync(
      buildDir + 'markdown-and-sources-data.json',
      markdownsAndSources
    )
    // eslint-disable-next-line no-console
    console.log('Parsing icons...')
    const icons = parseIcons()
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
  .catch((error) => {
    throw Error('Error when generating documentation data: ' + error)
  })

function parseThemes() {
  const themes = [
    '@instructure/canvas-theme',
    '@instructure/canvas-high-contrast-theme',
    '@instructure/instructure-theme'
  ]
  return themes.map((theme) => {
    return {
      resource: require(theme.toString()).theme,
      requirePath: theme.toString()
    }
  })
}

type IconFormat = {
  format: 'React' | 'SVG' | 'Font'
  glyphs: Record<string, any>
  packageName: string
  requirePath: string
}

function parseIcons() {
  const packageName = '@instructure/ui-icons'
  const iconFormats = {
    React: '',
    SVG: 'svg',
    Font: 'font'
  }
  type FormatName = 'icons-svg' | 'icons-' | 'icons-font'
  const formats: Record<FormatName, IconFormat> = {} as any
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
    const formatName: FormatName = `icons-${format.toLowerCase()}` as FormatName
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
