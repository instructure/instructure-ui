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

module.exports = function (
  context,
  opts = {
    esModules: false,
    coverage: false,
    node: false,
    removeConsole: false,
    transformImports: true,
    importTransforms: {}
  }
) {
  const envPresetConfig = opts.node ? getNodeEnvConfig() : getWebEnvConfig(opts)

  const presets = [
    [require('@babel/preset-env').default, envPresetConfig],
    [require('@babel/preset-react').default, { useBuiltIns: true }]
  ]

  let plugins = []

  if (opts.transformImports) {
    plugins.push([
      require('@instructure/babel-plugin-transform-imports'),
      {
        '(@instructure/ui-[^(/|\\s)]+)$': {
          // eslint-disable-line no-useless-escape
          transform: (importName, matches) => {
            const ignore = [
              '@instructure/ui-test-queries',
              '@instructure/ui-test-sandbox',
              '@instructure/ui-test-utils'
            ]

            if (!matches || !matches[1] || ignore.includes(matches[1])) return
            return `${matches[1]}/lib/${importName}`
          }
        },
        // Convert any es imports to lib imports
        '(@instructure/ui-[^(/|\\s)]+/es/[^\\s]+)$': {
          // eslint-disable-line no-useless-escape
          transform: (importName, matches) => {
            if (!matches || !matches[1]) return
            return matches[1].replace(new RegExp('/es/'), '/lib/')
          }
        },
        ...(opts.importTransforms || {})
      }
    ])
  }

  // Work around https://github.com/babel/babel/issues/10261, which causes
  // Babel to not use the runtime helpers for things like _objectSpread.
  // Remove this once that babel issue is fixed
  let babelHelperVersion = {}
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const version = require('@babel/helpers/package.json').version
    babelHelperVersion.version = version
  } catch (e) {
    // if something goes wrong, continue and don't try to explicitly set a helper version
  }
  plugins = plugins.concat([
    require('babel-plugin-macros'),
    require('@babel/plugin-transform-destructuring').default,
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }], // must run before plugins that set displayName!
    require('./babel-plugin-add-displayname-for-react'),
    [
      require('@babel/plugin-proposal-class-properties').default,
      { loose: true }
    ],
    require('@babel/plugin-proposal-export-default-from').default,
    [
      require('@babel/plugin-proposal-object-rest-spread').default,
      { useBuiltIns: true }
    ],
    require('@babel/plugin-proposal-optional-chaining').default,
    [
      require('@babel/plugin-transform-runtime').default,
      {
        ...babelHelperVersion,
        corejs: false,
        regenerator: true,
        helpers: true,
        useESModules: opts.esModules
      }
    ],
    require('@babel/plugin-syntax-dynamic-import').default,
    require('babel-plugin-transform-undefined-to-void'),
    require('babel-plugin-add-import-extension')
  ])

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      require('@babel/plugin-transform-react-constant-elements').default
    )
  }

  if (opts.removeConsole) {
    if (typeof opts.removeConsole === 'object') {
      plugins.push([
        require('babel-plugin-transform-remove-console'),
        opts.removeConsole
      ])
    } else {
      plugins.push(require('babel-plugin-transform-remove-console'))
    }
  }

  if (opts.node) {
    plugins = plugins.concat([
      require('babel-plugin-transform-ensure-ignore').default,
      require('babel-plugin-dynamic-import-node')
    ])
  }

  if (opts.coverage) {
    plugins = [
      [
        require('babel-plugin-istanbul').default,
        {
          include: ['**/src/**/*.js'],
          exclude: [
            '**/*.test.js',
            '**/*.examples.js',
            '**/*.fixture.js',
            '**/*.config.js',
            '**/*.conf.js',
            '__tests__/**/*.js',
            '__testfixtures__/**/*.js',
            '__examples__/**/*.js',
            '__fixtures__/**/*.js'
          ]
        }
      ]
    ].concat(plugins)
  }

  return {
    presets,
    plugins
  }
}

function getNodeEnvConfig() {
  return {
    targets: {
      node: 'current'
    },
    modules: 'commonjs',
    include: ['transform-classes']
  }
}

function getWebEnvConfig(opts) {
  return {
    targets: {
      browsers: loadConfig(
        'browserslist',
        require('@instructure/browserslist-config-instui')
      )
    },
    useBuiltIns: 'entry',
    corejs: 3,
    modules: opts.esModules ? false : 'commonjs',
    // debug: true, // un-comment if you want to see what browsers are being targeted and what plugins that means it will activate
    exclude: ['transform-typeof-symbol'],
    // have to include this plugin because babel-loader can't handle the `??` operator
    include: ['proposal-nullish-coalescing-operator']
  }
}
