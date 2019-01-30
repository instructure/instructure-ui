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

const loadConfig = require('@instructure/config-loader')

module.exports = function (context, opts = { themeable: false, esModules: false, coverage: false, node: false }) {
  const envPresetConfig = opts.node ? getNodeEnvConfig() : getWebEnvConfig(opts)

  const presets = [
    [require('@babel/preset-env').default, envPresetConfig],
    require('@babel/preset-react').default
  ]

  let plugins = [
    require('babel-plugin-macros'),
    require('@babel/plugin-transform-destructuring').default,
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }], // must run before themeable-styles plugin below
    [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
    require('@babel/plugin-proposal-export-default-from').default,
    [require('@babel/plugin-proposal-object-rest-spread').default, { useBuiltIns: true }],
    require('@babel/plugin-transform-runtime').default
  ]

  if (process.env.NODE_ENV === 'production') {
    plugins.push(require('@babel/plugin-transform-react-constant-elements').default)
  }

  let themeableOptions = {
    postcssrc: loadConfig('postcss', require('@instructure/ui-postcss-config')())
  }

  if (typeof opts.themeable === 'object') {
    themeableOptions = Object.assign(themeableOptions, opts.themeable)
  }

  plugins = plugins.concat([
    [require('@instructure/babel-plugin-themeable-styles'), themeableOptions]
  ])

  if (opts.node) {
    plugins = plugins.concat([
      require('babel-plugin-dynamic-import-node').default,
      require('babel-plugin-transform-ensure-ignore').default
    ])
  }

  if (opts.coverage) {
    plugins = [
      [require('babel-plugin-istanbul').default, {
        include: ['**/src/**/*.js'],
        exclude: [
          '**/*.test.js',
          '**/*.examples.js',
          '**/*.fixture.js',
          '**/*.config.js',
          '**/*.conf.js',
          '__tests__/**',
          '__testfixtures__/**',
          '__examples__/**',
          '__fixtures__/**'
        ]
      }]
    ].concat(plugins)
  }

  return {
    presets,
    plugins
  }
}

function getNodeEnvConfig () {
  return {
    // the test-quick command that is ran directly in node (in quizzes land) and not using webpack
    // needs commonjs modules, not es modules. But it only needs to transform js features
    // that the current version of node doesn't support, not everything our lowest supported
    // browser needs
    targets: {
      node: 'current'
    },
    modules: 'commonjs',
    // this is for babel-plugin-transform-themeable. it currently doesn't work against native class syntax.
    // once it does, this line can be removed
    include: [require('@babel/plugin-transform-classes').default]
  }
}

function getWebEnvConfig (opts) {
  return {
    targets: {
      browsers: loadConfig('browserslist', require('@instructure/canvas-supported-browsers'))
    },
    modules: opts.esModules ? false : 'commonjs',
    useBuiltIns: 'entry',
    exclude: ['transform-typeof-symbol']
  }
}
