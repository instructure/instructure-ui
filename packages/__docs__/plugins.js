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
const DocsPlugin = require('@instructure/ui-docs-plugin')
const projectRoot = path.resolve(__dirname, '../../')
// eslint-disable-next-line instructure-ui/no-relative-package-imports
const pkg = require('../../package.json')

module.exports = [
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
          // should match entries in webpack.config.js
          `${pkg.homepage}vendors~common~globals~ui-docs.js`,
          `${pkg.homepage}vendors~globals~ui-docs.js`,
          `${pkg.homepage}runtime~common.js`,
          `${pkg.homepage}common.js`,
          `${pkg.homepage}runtime~globals.js`,
          `${pkg.homepage}globals.js`
        ].join(';')
      }
    },
    files: [
      '**/*.md',
      '**/src/components/*/**/index.js',
      '**/src/utils/**/*.js',
      '**/ui-themeable/src/**/*.js',
      '**/ui-i18n/src/**/*.js',
      '**/ui-utils/src/**/*.js',
      '**/debounce/src/**/*.js',
      '**/ui-decorator/src/**/*.js'
    ],
    ignore: [
      '*macro.js',
      '**/*-loader.js',
      '**/packages/**/CHANGELOG.md',
      '**/config/**',
      '**/templates/**',
      '**/controllers/**',
      '**/views/**',
      '**/node_modules/**',
      '**/__docs__/**',
      '**/__examples__/**',
      '**/__svg__/**',
      '**/__fixtures__/**',
      '**/__testfixtures__/**',
      '**/__tests__/**',
      '**/locales/**',
      '**/theme.js',

      // ignore index files that just re-export
      '**/src/index.js',
      '**/src/components/index.js',
      '**/src/utils/index.js',
      '**/ui-utils/src/index.js',
      '**/ui-utils/src/{react,dom}/index.js',

      // packages to ignore:
      '**/ui-component-examples/src/**',
      '**/ui-test-utils/src/**',
      '**/ui-docs-client/src/**',
      '**/ui-docs-plugin/src/**',
      '**/media-capture/src/**',

      // deprecated packages and modules:
      '**/generate-examples/**',
      '**/ui-container/**',
      '**/ui-core/**',
      '**/ui-elements/src/components/ContextBox/**',
      '**/ui-forms/src/components/FormField/**',
      '**/ui-forms/src/components/FormFieldGroup/**',
      '**/ui-forms/src/utils/FormPropTypes.js',
      '**/ui-utils/src/i18n/*.js',
      '**/ui-utils/src/dom/calculateElementPosition.js',
      '**/ui-utils/src/dom/findTabbable.js',
      '**/ui-utils/src/dom/focusManager.js',
      '**/ui-utils/src/dom/scopeTab.js',
      '**/ui-utils/src/dom/isVisible.js',
      '**/ui-utils/src/debounce.js',
      '**/ui-utils/src/uid.js',
      '**/ui-utils/src/dom/generateElementId.js',
      '**/ui-utils/src/react/containerQuery.js',
      '**/ui-utils/src/Decimal.js'
    ],
    themes: [
      require.resolve('@instructure/ui-themes/lib/canvas/base'),
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
  })
]
