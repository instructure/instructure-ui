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

const path = require('path')
const webpack = require('webpack')
const DocsPlugin = require('@instructure/ui-docs-plugin')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const projectRoot = path.resolve(__dirname, '../../')
const pkg = require('../../package.json')

let plugins = require('@instructure/ui-presets/webpack/plugins')()

plugins = plugins.concat([
  new DocsPlugin({
    projectRoot,
    title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
    favicon: '../../logo.png',
    library: {
      name: pkg.name,
      version: pkg.version,
      repository: pkg.repository.url,
      author: pkg.author,
      packages: 'packages',
      scope: '@instructure',
      codepen: {
        // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
        // this is usually whatever webpack entries you've defined
        js_external: [
          `${pkg.homepage}common.js`,
          `${pkg.homepage}instructure-ui.js`,
          `${pkg.homepage}globals.js`
        ].join(';')
      }
    },
    files: [
      'README.md',
      'CHANGELOG.md',
      'CODE_OF_CONDUCT.md',
      'packages/*/src/components/*/**/index.js',
      'packages/*/src/components/*/**/README.md',
      'packages/*/src/utils/**/*.js',
      'packages/ui-themeable/src/**/*.js',
      'packages/ui-utils/src/**/*.js',
      'packages/*/README.md',
      'docs/**/*.md'
    ],
    ignore: [
      '**/node_modules/**',
      '**/__tests__/**',
      '**/__docs__/**',
      '**/config/**',
      '**/src/index.js',
      'packages/ui-core/src/components/Autocomplete/*',
      'packages/ui-core/src/components/Avatar/*',
      'packages/ui-core/src/components/Badge/*',
      'packages/ui-core/src/components/Button/*',
      'packages/ui-core/src/components/Container/*',
      'packages/ui-core/src/components/ContextBox/*',
      'packages/ui-core/src/components/Heading/*',
      'packages/ui-core/src/components/Image/*',
      'packages/ui-core/src/components/Link/*',
      'packages/ui-core/src/components/List/**',
      'packages/ui-core/src/components/MetricsList/**',
      'packages/ui-core/src/components/Pill/*',
      'packages/ui-core/src/components/Portal/*',
      'packages/ui-core/src/components/Progress/**',
      'packages/ui-core/src/components/Select/*',
      'packages/ui-core/src/components/Spinner/*',
      'packages/ui-core/src/components/Table/*',
      'packages/ui-core/src/components/Tag/*',
      'packages/ui-core/src/components/Text/*',
      'packages/ui-utils/src/{react,dom,i18n}/index.js',
      'packages/ui-utils/src/i18n/locales/*',
      '**/theme.js',
      'packages/ui-docs-client/**/*.js',
      'packages/ui-docs-plugin/**/*.js'
    ],
    themes: [
      require.resolve('@instructure/ui-themes/lib/canvas'),
      require.resolve('@instructure/ui-themes/lib/canvas/high-contrast')
    ],
    icons: {
      packageName: '@instructure/ui-icons',
      formats: {
        React: '@instructure/ui-icons/lib',
        SVG: '@instructure/ui-icons/lib/svg',
        Font: '@instructure/ui-icons/lib/font'
      }
    },
    template: './index.ejs'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['common', 'instructure-ui'].reverse(),
    minChunks: Infinity
  })
])

if (!DEBUG) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: false,
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ])
}

module.exports = plugins
