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

const loadConfig = require('./loadConfig')

module.exports = function (context, opts = { themeable: false, esModules: false, coverage: false, node: false }) {
  const envPresetConfig = opts.node ? getNodeEnvConfig() : getWebEnvConfig(opts)

  const presets = [
    ['env', envPresetConfig],
    'stage-1',
    'react'
  ]

  let plugins = [
    ['transform-object-rest-spread', {
      useBuiltIns: true
    }],
    ['transform-react-jsx', {
      useBuiltIns: true
    }],
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: false
    }],
    'transform-decorators-legacy',
    require.resolve('@instructure/babel-plugin-transform-class-display-name')
  ]

  if (opts.themeable) {
    let themeableConfig = {
      ignore: 'node_modules/**/*',
      postcssrc: loadConfig('postcss', require('./postcss')()),
      themeablerc: loadConfig('themeable', require('./themeable'))
    }

    if (typeof opts.themeable === 'object') {
      themeableConfig = Object.assign(themeableConfig, opts.themeable)
    }

    plugins = plugins.concat([
      [
        require.resolve('@instructure/babel-plugin-themeable-styles'),
        themeableConfig
      ]
    ])
  }

  if (opts.node) {
    plugins = plugins.concat([
      require('babel-plugin-dynamic-import-node').default,
      require('babel-plugin-transform-ensure-ignore').default
    ])
  }

  if (opts.coverage) {
    plugins = [
      ['istanbul', {
        include: ['src/**/*.js'],
        exclude: ['**/*.test.js']
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
    include: ['transform-es2015-classes']
  }
}

function getWebEnvConfig (opts) {
  return {
    targets: {
      browsers: loadConfig('browserslist', require('@instructure/canvas-supported-browsers'))
    },
    modules: opts.esModules ? false : 'commonjs',
    useBuiltIns: true
  }
}
