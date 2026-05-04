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
    removeConsole: false,
    transformImports: true
  }
) {
  const envPresetConfig = {
    targets: {
      browsers: require('@instructure/browserslist-config-instui')
    },
    useBuiltIns: 'usage',
    // this version has to match the version in package.json
    corejs: '3.49.0',
    modules: opts.esModules ? false : 'commonjs'
    // debug: true, // un-comment if you want to see what browsers are being targeted and what plugins that means it will activate
  }

  const presets = [
    [require('@babel/preset-env').default, envPresetConfig],
    [require('@babel/preset-typescript').default, { allowDeclareFields: true }],
    [
      require('@babel/preset-react').default,
      {
        useBuiltIns: true,
        importSource: '@emotion/react',
        runtime: 'automatic'
      }
    ]
  ]

  let plugins = []

  if (opts.transformImports) {
    plugins.push([
      require('@instructure/babel-plugin-transform-imports'),
      {
        '(@instructure/ui-[^(/|\\s)]+)$': {
          transform: (importName, matches) => {
            if (!matches || !matches[1]) return
            return `${matches[1]}/lib/${importName}`
          }
        },
        // Convert any es imports to lib imports
        '(@instructure/ui-[^(/|\\s)]+/es/[^\\s]+)$': {
          transform: (importName, matches) => {
            if (!matches || !matches[1]) return
            return matches[1].replace(new RegExp('/es/'), '/lib/')
          }
        }
      }
    ])
  }
  // Work around https://github.com/babel/babel/issues/10261, which causes
  // Babel to not use the runtime helpers for things like _objectSpread.
  // Remove this once that babel issue is fixed
  let babelHelperVersion = {}
  try {
    const version = require('@babel/helpers/package.json').version
    babelHelperVersion.version = version
  } catch (e) {
    // if something goes wrong, continue and don't try to explicitly set a helper version
  }
  plugins = plugins.concat([
    [
      require('@babel/plugin-proposal-decorators').default,
      { version: 'legacy' }
    ], // must run before plugins that set displayName!
    require('./babel-plugin-add-displayname-for-react'),
    [
      require('@babel/plugin-transform-runtime').default,
      {
        ...babelHelperVersion,
        useESModules: opts.esModules
      }
    ]
  ])

  if (
    process.env.GITHUB_PULL_REQUEST_PREVIEW !== 'true' &&
    opts.removeConsole
  ) {
    if (typeof opts.removeConsole === 'object') {
      plugins.push([
        require('babel-plugin-transform-remove-console'),
        opts.removeConsole
      ])
    } else {
      plugins.push(require('babel-plugin-transform-remove-console'))
    }
  }

  // Add .js extensions to imports for ES modules
  if (opts.esModules) {
    plugins.push([
      require('babel-plugin-add-import-extension'),
      { extension: 'js' }
    ])
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
