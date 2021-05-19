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

const DOCS_DATA_JSON = 'docs-data.json'
// eslint-disable-next-line no-console
console.log('start building application data to file ' + DOCS_DATA_JSON)
const globby = require('globby')
const path = require('path')
const getClientProps = require('./utils/getClientProps')
const processFile = require('./processFile')
const fs = require('fs')
//TODO: Rename this env var
const { DO_THE_VERSION_COPY = '1' } = process.env
const shouldDoTheVersionCopy = Boolean(parseInt(DO_THE_VERSION_COPY))

const { COPY_VERSIONS_JSON = '1' } = process.env
const shouldDoTheVersionCopy = Boolean(parseInt(COPY_VERSIONS_JSON))

const projectRoot = path.resolve(__dirname, '../../../')
const rootPackage = require(projectRoot + '/package.json') // root package.json

const options = {
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
        `${rootPackage.homepage}vendors~common~globals~ui-docs.js`,
        `${rootPackage.homepage}vendors~globals~ui-docs.js`,
        `${rootPackage.homepage}runtime~common.js`,
        `${rootPackage.homepage}common.js`,
        `${rootPackage.homepage}globals.js`
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
    '**/ui-component-examples/src/**',
    '**/ui-test-*/src/**',
    '**/ui-scripts/src/**',

    // deprecated packages and modules:
    '**/InputModeListener.{js,ts}'
  ],
  themes: [
    '@instructure/canvas-theme',
    '@instructure/canvas-high-contrast-theme',
    '@instructure/instructure-theme'
  ],
  icons: {
    packageName: '@instructure/ui-icons',
    formats: {
      React: '',
      SVG: 'svg',
      Font: 'font'
    }
  }
}

const themes = parseThemes(options.themes)
const icons = parseIcons(options.icons)

const files = options.files.map((file) =>
  path.resolve(options.projectRoot, file)
)

const ignore = options.ignore.map((file) =>
  path.resolve(options.projectRoot, file)
)

globby(files, { ignore })
  .then((matches) => {
    const docs = matches.map((filepath) => {
      // loop trough every source and Readme file
      return processFile(filepath, options)
    })
    const props = getClientProps(docs, themes, options.library)
    props.icons = icons
    props.showMenu = options.showMenu ? 'true' : 'false'
    const everything = JSON.stringify(props)
    const buildDir = './__build__/'
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir)
    }
    fs.writeFileSync(buildDir + DOCS_DATA_JSON, everything)
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
  })
  .catch((error) => {
    throw Error('Error when generating documentation data: ' + error)
  })

function parseThemes(themes = []) {
  return themes.map((theme) => {
    return {
      resource: require(theme.toString()).theme,
      requirePath: theme.toString()
    }
  })
}

function parseIcons(icons = {}) {
  const formats = {}
  Object.keys(icons.formats).map((format) => {
    const pathEnd =
      icons.formats[format].length > 0 ? '/' + icons.formats[format] : ''
    const requirePath = icons.packageName + '/lib' + pathEnd
    let glyphs = require(requirePath)
    if (format === 'React') {
      const formats = {}
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
    const packageName = icons.packageName
    formats[`icons-${format.toLowerCase()}`] = {
      format: format,
      glyphs: glyphs,
      packageName: packageName,
      requirePath: icons.packageName + '/es' + pathEnd
    }
  })
  return {
    packageName: icons.packageName,
    formats: formats
  }
}
