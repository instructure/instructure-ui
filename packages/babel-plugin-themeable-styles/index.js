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

// forked from https://raw.githubusercontent.com/michalkvasnicak/babel-plugin-css-modules-transform/master/src/index.js
const {
  resolve,
  relative,
  dirname,
  basename,
  isAbsolute
} = require('path')

const { readPkgUp } = require('@instructure/pkg-util')

const template = require('babel-template')
const requireHook = require('css-modules-require-hook')

const postCssPlugin = require('@instructure/postcss-themeable-styles')

const matchExtensions = /\.css$/i

const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'
const cwd = process.cwd()

const transformCSSRequire = require('./transform')

module.exports = exports.default = function transformThemeableStyles ({ types: t }) {
  const STYLES = new Map()

  let requireHookInitialized = false
  let thisPluginOptions = null

  function generateVariableDeclaration (name, tokens, css) {
    return template(`const ${name} = ${transformCSSRequire(tokens, css)}`)()
  }

  const pluginApi = {
    manipulateOptions (options) {
      if (requireHookInitialized) return options

      thisPluginOptions = options.plugins.filter(
        ([plugin]) => plugin.manipulateOptions === pluginApi.manipulateOptions
      )[0][1]

      let hashPrefix = Date.now()
      const { pkg } = readPkgUp.sync({cwd, normalize: false})
      if (pkg) {
        hashPrefix = `${pkg.name}${pkg.version}`
      }

      requireHook({
        ignore: thisPluginOptions.ignore,
        hashPrefix,
        generateScopedName: getScopedNameGenerator(thisPluginOptions.themeablerc),
        prepend: getPostCSSPlugins(thisPluginOptions.postcssrc),
        processCss: (css, filepath) => {
          // eslint-disable-next-line no-console
          console.log(`[transform-themeable]: ${relative(cwd, filepath)}`)

          if (!STYLES.has(filepath)) {
            STYLES.set(filepath, css)
          }

          return css
        },
        append: [postCssPlugin]
      })

      requireHookInitialized = true

      return options
    },

    visitor: {
      // import styles from './style.css'
      ImportDefaultSpecifier (path, { file }) {
        const { value } = path.parentPath.node.source

        if (matchExtensions.test(value)) {
          const requiringFile = file.opts.filename
          const stylesheetPath = resolveStylesheetPath(requiringFile, value)
          const tokens = requireCssFile(stylesheetPath)

          const css = STYLES.get(stylesheetPath)

          // eslint-disable-next-line no-console
          console.log(`[transform-themeable]: ${basename(dirname(requiringFile))}`)

          if (!css) return

          path.parentPath.replaceWith(
            generateVariableDeclaration(path.node.local.name, tokens, css)
          )
        }
      },

      // const styles = require('./styles.css')
      CallExpression (path, { file }) {
        const { callee: { name: calleeName }, arguments: args } = path.node

        if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
          return
        }

        const [{ value }] = args

        if (matchExtensions.test(value)) {
          const requiringFile = file.opts.filename
          const stylesheetPath = resolveStylesheetPath(requiringFile, value)
          const tokens = requireCssFile(stylesheetPath)

          const css = STYLES.get(stylesheetPath)

          // eslint-disable-next-line no-console
          console.log(`[transform-themeable]: ${basename(dirname(requiringFile))}`)

          if (!css) return

          if (!t.isExpressionStatement(path.parent)) {
            path.replaceWithSourceString(transformCSSRequire(tokens, css))
          } else {
            path.remove()
          }
        }
      }
    }
  }
  return pluginApi
}

function resolveModulePath (filename) {
  const dir = dirname(filename)
  if (isAbsolute(dir)) {
    return dir
  }
  if (process.env.PWD) {
    return resolve(process.env.PWD, dir)
  }
  return resolve(dir)
}

function resolveStylesheetPath (filepath, stylesheetPath) {
  let filePathOrModuleName = stylesheetPath

  // only resolve path to file when we have a file path
  if (!/^\w/i.test(filePathOrModuleName)) {
    const from = resolveModulePath(filepath)
    filePathOrModuleName = resolve(from, filePathOrModuleName)
  }

  return filePathOrModuleName
}

function requireCssFile (stylesheetPath) {
  // css-modules-require-hooks throws if file is ignored
  try {
    return require(stylesheetPath)
  } catch (e) {
    console.warn(`[transform-themeable]: Could not require CSS file: ${stylesheetPath} \n ${e}`)
    return {} // return empty object, this simulates result of ignored stylesheet file
  }
}

function getScopedNameGenerator (config) { // for css modules class names
  const ctx = { env }

  if (config && typeof config.generateScopedName === 'function') {
    return config.generateScopedName(ctx)
  } else {
    return (env === 'production') ? '[hash:base64:7]' : '[folder]__[local]__[hash:base64:7]'
  }
}

function getPostCSSPlugins (config) {
  let plugins = []

  if (config && config.plugins) {
    plugins = config.plugins
  }

  return plugins
}
