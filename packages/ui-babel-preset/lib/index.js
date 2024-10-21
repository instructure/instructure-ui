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

module.exports = function (
  context,
  opts = {
    esModules: false,
    coverage: false,
    node: false,
    removeConsole: false,
    transformImports: true, // TODO unused, remove all references
    importTransforms: {}
  }
) {
  const envPresetConfig = opts.node ? getNodeEnvConfig() : getWebEnvConfig(opts)

  const presets = [
    [require('@babel/preset-env').default, envPresetConfig],
    [require('@babel/preset-typescript').default, { allowDeclareFields: true }],
    [require('@babel/preset-react').default, { useBuiltIns: true }]
  ]

  let plugins = []
  // This is triggered in 2 cases:
  // 1. If `process.env.TRANSFORM_IMPORTS` is `true` -- this is never the case, its undefined
  //    (If its `false` it's not run)
  // 2. for every CJS build, see `ui-scripts/lib/build/babel.js`
  if (opts.transformImports) {
    plugins.push([
      require('@instructure/babel-plugin-transform-imports'),
      {
        // This transforms
        // `var _uiPropTypes = require("@instructure/ui-prop-types");`
        // (0, _uiPropTypes.controllable)(_propTypes.default.bool, 'onToggle', 'defaultExpanded'),
        // to
        // `var _controllable = require("@instructure/ui-prop-types/lib/controllable.js");`
        // `(0, _controllable.controllable)(_propTypes.default.bool, 'onToggle', 'defaultExpanded'),`
        /*'(@instructure/ui-[^(/|\\s)]+)$': {
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
        },*/
        // This is used ONLY in locators, e.g. " @instructure/ui-pill/es/Pill/PillLocator"
        // This is needed because otherwise ESM locators would import from /es/
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
    require('@babel/plugin-proposal-optional-chaining').default,
    require('@babel/plugin-transform-destructuring').default,
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }], // must run before plugins that set displayName!
    require('./babel-plugin-add-displayname-for-react'),
    require('@babel/plugin-proposal-export-default-from').default,
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
    require('babel-plugin-transform-undefined-to-void')
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
    // Note: Babel runs plugins always before presets
    plugins,
    presets,
    // see https://babeljs.io/docs/en/assumptions
    assumptions: {
      setPublicClassFields: true
    }
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
      browsers: require('@instructure/browserslist-config-instui')
    },
    useBuiltIns: 'entry',
    // this version has to match the version in package.json
    corejs: '3.26.1',
    modules: opts.esModules ? false : 'commonjs',
    // debug: true, // un-comment if you want to see what browsers are being targeted and what plugins that means it will activate
    exclude: ['transform-typeof-symbol'],
    include: [
      // webpack 4 uses acorn 6, which only supports features up to ES2020
      // have to include this plugin because webpack 4 can't parse the `??` operator
      'proposal-nullish-coalescing-operator',
      // have to include this plugin because webpack 4 can't parse class properties (like 'static)
      'proposal-class-properties'
    ]
  }
}
