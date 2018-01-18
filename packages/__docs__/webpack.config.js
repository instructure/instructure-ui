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

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const outputPath = path.resolve(__dirname, '__build__')

module.exports = {
  cache: DEBUG,
  bail: !DEBUG,
  entry: {
    common: [
      '../ui-polyfill-loader!',
      'react',
      'react-dom'
    ],
    'instructure-ui': [
      '@instructure/ui-a11y',
      '@instructure/ui-breadcrumb',
      '@instructure/ui-buttons',
      '@instructure/ui-container',
      '@instructure/ui-core',
      '@instructure/ui-elements',
      '@instructure/ui-forms',
      '@instructure/ui-layout',
      '@instructure/ui-menu',
      '@instructure/ui-motion',
      '@instructure/ui-pagination',
      '@instructure/ui-pages',
      '@instructure/ui-portal',
      '@instructure/ui-svg-images',
      '@instructure/ui-themes',
      '@instructure/ui-themeable',
      '@instructure/ui-toggle-details',
      '@instructure/ui-tree-browser',
      '@instructure/ui-utils'
    ],
    globals: './globals' // for codepen
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: outputPath,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  plugins: require('./plugins'),
  resolve: {
    alias: {
      // set up aliases to get webpack to rebuild when we make changes to these packages
      '@instructure/ui-a11y$': path.resolve(__dirname, '../ui-a11y/src/'),
      '@instructure/ui-breadcrumb$': path.resolve(__dirname, '../ui-breadcrumb/src/'),
      '@instructure/ui-buttons$': path.resolve(__dirname, '../ui-buttons/src/'),
      '@instructure/ui-container$': path.resolve(__dirname, '../ui-container/src/'),
      '@instructure/ui-core$': path.resolve(__dirname, '../ui-core/src/'),
      '@instructure/ui-elements$': path.resolve(__dirname, '../ui-elements/src/'),
      '@instructure/ui-forms$': path.resolve(__dirname, '../ui-forms/src/'),
      '@instructure/ui-layout$': path.resolve(__dirname, '../ui-layout/src/'),
      '@instructure/ui-menu$': path.resolve(__dirname, '../ui-menu/src/'),
      '@instructure/ui-motion$': path.resolve(__dirname, '../ui-motion/src/'),
      '@instructure/ui-pagination$': path.resolve(__dirname, '../ui-pagination/src/'),
      '@instructure/ui-pages$': path.resolve(__dirname, '../ui-pages/src/'),
      '@instructure/ui-portal$': path.resolve(__dirname, '../ui-portal/src/'),
      '@instructure/ui-svg-images$': path.resolve(__dirname, '../ui-svg-images/src/'),
      '@instructure/ui-toggle-details$': path.resolve(__dirname, '../ui-toggle-details/src/'),
      '@instructure/ui-tree-browser$': path.resolve(__dirname, '../ui-tree-browser/src/'),
      '@instructure/ui-utils$': path.resolve(__dirname, '../ui-utils/src/'),
      '@instructure/ui-themes$': path.resolve(__dirname, '../ui-themes/src/'),
      '@instructure/ui-themeable$': path.resolve(__dirname, '../ui-themeable/src/'),

      '@instructure/ui-a11y/lib': path.resolve(__dirname, '../ui-a11y/src'),
      '@instructure/ui-breadcrumb/lib': path.resolve(__dirname, '../ui-breadcrumb/src'),
      '@instructure/ui-buttons/lib': path.resolve(__dirname, '../ui-buttons/src'),
      '@instructure/ui-container/lib': path.resolve(__dirname, '../ui-container/src'),
      '@instructure/ui-core/lib': path.resolve(__dirname, '../ui-core/src'),
      '@instructure/ui-elements/lib': path.resolve(__dirname, '../ui-elements/src'),
      '@instructure/ui-forms/lib': path.resolve(__dirname, '../ui-forms/src'),
      '@instructure/ui-layout/lib': path.resolve(__dirname, '../ui-layout/src'),
      '@instructure/ui-menu/lib': path.resolve(__dirname, '../ui-menu/src'),
      '@instructure/ui-motion/lib': path.resolve(__dirname, '../ui-motion/src'),
      '@instructure/ui-pages/lib': path.resolve(__dirname, '../ui-pages/src'),
      '@instructure/ui-pagination/lib': path.resolve(__dirname, '../ui-pagination/src'),
      '@instructure/ui-portal/lib': path.resolve(__dirname, '../ui-portal/src'),
      '@instructure/ui-svg-images/lib': path.resolve(__dirname, '../ui-svg-images/src'),
      '@instructure/ui-toggle-details/lib': path.resolve(__dirname, '../ui-toggle-details/src'),
      '@instructure/ui-tree-browser/lib': path.resolve(__dirname, '../ui-tree-browser/src'),
      '@instructure/ui-utils/lib': path.resolve(__dirname, '../ui-utils/src'),
      '@instructure/ui-themes/lib': path.resolve(__dirname, '../ui-themes/src'),
      '@instructure/ui-themeable/lib': path.resolve(__dirname, '../ui-themeable/src')
    }
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
