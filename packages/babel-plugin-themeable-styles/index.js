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

const {
  resolve,
  relative,
  dirname,
  isAbsolute
} = require('path')

const template = require('babel-template')
const requireHook = require('css-modules-require-hook')
const postCssPlugin = require('@instructure/postcss-themeable-styles')

const transformCSSRequire = require('./transform')
const generateComponentId = require('./generateComponentId')
const getScopedNameGenerator = require('./getScopedNameGenerator')

const matchExtensions = /\.css$/i

const DEBUG = Boolean(process.env.DEBUG)

module.exports = function transformThemeableStyles ({ types: t }) {
  const STYLES = new Map()

  let componentId

  let requireHookInitialized = false
  let thisPlugin = null
  let thisPluginOptions = {
    ignore: 'node_modules/**/*',
    themeablerc: null,
    postcssrc: null
  }

  const pluginApi = {
    manipulateOptions (options) {
      if (requireHookInitialized) return options

      thisPlugin = Object.values(options.plugins).filter(
        ([plugin]) => plugin.manipulateOptions === pluginApi.manipulateOptions
      )[0]


      if (thisPlugin) {
        thisPluginOptions = thisPlugin[1]
      }

      if (!DEBUG) {
        requireHook({
          ignore: thisPluginOptions.ignore,
          generateScopedName: (name, filepath, css) => {
            componentId = generateComponentId(css)
            return getScopedNameGenerator(thisPluginOptions.themeablerc, componentId, name, filepath, css)
          },
          prepend: getPostCSSPlugins(thisPluginOptions.postcssrc),
          processCss: (css, filepath) => {
            // eslint-disable-next-line no-console
            console.log(`[transform-themeable]: ${relative(process.cwd(), filepath)}`)

            if (!STYLES.has(filepath)) {
              STYLES.set(filepath, css)
            }

            return css
          },
          append: [postCssPlugin]
        })

        requireHookInitialized = true
      }

      return options
    },

    visitor: {
      // import styles from './style.css'
      ImportDefaultSpecifier (path, { file }) {
        const requiringFile = file.opts.filename
        const { value } = path.parentPath.node.source

        if (matchExtensions.test(value)) {
          if (requireHookInitialized && !DEBUG) {
            const stylesheetPath = resolveStylesheetPath(requiringFile, value)
            const tokens = requireCssFile(stylesheetPath)

            const css = STYLES.get(stylesheetPath)

            if (!css) return

            // eslint-disable-next-line no-console
            console.log(`[transform-themeable]: ${relative(process.cwd(), requiringFile)}`)

            path.parentPath.replaceWith(
              generateVariableDeclaration(path.node.local.name, tokens, css, componentId)
            )
          } else {
            const stylesheetPath = resolveStylesheetPath(requiringFile, value)
            path.parentPath.replaceWith(
              generateWebpackRequire(path.node.local.name, stylesheetPath)
            )
          }
        }
      },

      CallExpression (path, { file }) {
        const { node } = path
        const { callee: { name: calleeName }, arguments: args } = node

        // const styles = require('./styles.css')
        if (calleeName === 'require' && args.length && t.isStringLiteral(args[0])) {
          if (!requireHookInitialized) return

          const [{ value }] = args

          if (matchExtensions.test(value)) {
            const requiringFile = file.opts.filename
            const stylesheetPath = resolveStylesheetPath(requiringFile, value)
            const tokens = requireCssFile(stylesheetPath)

            const css = STYLES.get(stylesheetPath)

            if (!css) return

            // eslint-disable-next-line no-console
            console.log(`[transform-themeable]: ${relative(process.cwd(), requiringFile)}`)

            if (!t.isExpressionStatement(path.parent)) {
              path.replaceWithSourceString(transformCSSRequire(tokens, css, componentId))
            } else {
              path.remove()
            }
          }
        } else if (args.length &&
          nodeHasRenderMethod(node) &&
          nodeIsMissingDisplayName(node)
        ) {
          setDisplayNameAfter(path, args[0])
        }
      }
    }
  }

  return pluginApi

  function setDisplayNameAfter(path, id) {
    const displayName = id.name

    var blockLevelStmnt
    path.find(function (path) {
      if (path.parentPath.isBlock()) {
        blockLevelStmnt = path
        return true
      }
    })

    if (blockLevelStmnt) {
      delete blockLevelStmnt.node.trailingComments

      const setDisplayNameStmnt = t.expressionStatement(t.assignmentExpression(
        '=',
        t.memberExpression(id, t.identifier('displayName')),
        t.stringLiteral(displayName)
      ))

      blockLevelStmnt.replaceWithMultiple([
        blockLevelStmnt.node,
        setDisplayNameStmnt
      ])
    }
  }

  function nodeHasRenderMethod (node) {
    if (
      node.callee &&
      node.callee.name === '_createClass'
    ) {
      return (node.arguments[1].elements && node.arguments[1].elements.some((el) => isRenderProperty(el)))
    }

    return false
  }

  function nodeIsMissingDisplayName (node) {
    if (
      node.callee &&
      node.callee.name === '_createClass'
    ) {
      return (node.arguments[1].elements && !(node.arguments[1].elements.some((el) => isDisplayName(el))))
    }
    return false
  }

  function isDisplayName (el) {
    const [ first, second ] = el.properties
    return first.key.name === 'key' &&
      first.value.value === 'displayName' &&
      second.key.name === 'value' &&
      second.value.value
  }

  function isRenderProperty (el) {
    const [ first, second ] = el.properties
    return first.key.name === 'key' &&
      first.value.value === 'render' &&
      second.key.name === 'value' &&
      t.isFunctionExpression(second.value)
  }

  function generateVariableDeclaration (name, tokens, css, componentId) {
    return template(`const ${name} = ${transformCSSRequire(tokens, css, componentId)}`)()
  }

  function generateWebpackRequire (name, filePath) {
    return template(`const ${name} = require('!!babel-loader!themeable-css-loader!${filePath}')`)()
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

  function getPostCSSPlugins (config) {
    let plugins = []

    if (config && config.plugins) {
      plugins = config.plugins
    }

    return plugins
  }
}
