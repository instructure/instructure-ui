// based on https://raw.githubusercontent.com/michalkvasnicak/babel-plugin-css-modules-transform/master/src/index.js

const {
  resolve,
  dirname,
  isAbsolute,
  join
} = require('path')

const globToRegex = require('glob-to-regexp')
const transformCssRequire = require('./util/transform-css-require')

module.exports = function ({ types: t }) {
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

  /**
   *
   * @param {String} filepath           javascript file path
   * @param {String} stylesheetPath     css file path
   * @returns {Array} array of class names
   */
  function requireCssFile (filepath, stylesheetPath) {
    // css-modules-require-hooks throws if file is ignored
    try {
      return require( // eslint-disable-line import/no-dynamic-require
        resolveStylesheetPath(filepath, stylesheetPath)
      )
    } catch (e) {
      console.warn(`Warning: Could not find stylesheet: ${stylesheetPath}`)
      return {} // return empty object, this simulates result of ignored stylesheet file
    }
  }

  function loadConfig (opt, def) {
    const env = process.env.NODE_ENV
    const cwd = process.cwd()

    let config = require( // eslint-disable-line import/no-dynamic-require
      opt || join(cwd, def)
    )

    if (config && typeof config === 'function') {
      config = config({ cwd, env })
    }

    return config
  }

  function getScopedNameGenerator (opt) { // for css modules class names
    const config = loadConfig(opt, 'themeable.config.js')

    if (config && typeof config.generateScopedName === 'function') {
      return config.generateScopedName({ env: process.env.NODE_ENV })
    } else return (env) => (env === 'production') ? '[hash:base64:7]' : '[folder]__[local]'
  }

  function getPostCSSPlugins (opt) {
    const config = loadConfig(opt, 'postcss.config.js')

    let plugins = []

    if (config && config.plugins) {
      plugins = config.plugins
    }

    return plugins
  }

  // The exception-checking code is adapted from https://github.com/css-modules/css-modules-require-hook
  // Copyright (c) 2015 Alexey Litvinov

  /**
   * @param  {function|regex|string} ignore glob, regex or function
   * @return {function}
   */
  function buildExceptionChecker (ignore) {
    if (ignore instanceof RegExp) {
      return filepath => ignore.test(filepath)
    }

    if (typeof ignore === 'string') {
      return filepath => globToRegex(ignore).test(filepath)
    }

    return ignore || (filepath => !filepath)
  }

  let initialized = false // is css modules require hook initialized?
  let isException
  const matchExtensions = /\.css$/i

  const STYLES = new Map()

  return {
    visitor: {
      Program (path, state) {
        if (initialized) {
          return
        }

        require( // eslint-disable-line import/no-extraneous-dependencies
          'css-modules-require-hook'
        )({
          generateScopedName: getScopedNameGenerator(state.opts.themeablerc),
          prepend: getPostCSSPlugins(state.opts.postcssrc),
          processCss: (css, filepath) => {
            if (!STYLES.has(filepath)) {
              STYLES.set(filepath, css)
            }
            return css
          },
          append: [require('./util/postcss-themeable-styles')]
        })

        isException = buildExceptionChecker(state.opts.ignore)

        initialized = true
      },

      ImportDeclaration (path, { file }) {
        // this method is called between enter and exit, so we can map css to our state
        // it is then replaced with require call which will be handled in seconds pass by CallExpression
        // CallExpression will then replace it or remove depending on parent node (if is Program or not)
        const { value } = path.node.source

        if (!isException(value) && matchExtensions.test(value)) {
          const requiringFile = file.opts.filename
          requireCssFile(requiringFile, value)
        }
      },

      CallExpression (path, { file }) {
        const { callee: { name: calleeName }, arguments: args } = path.node

        if (calleeName !== 'require' || !args.length || !t.isStringLiteral(args[0])) {
          return
        }

        const [{ value: stylesheetPath }] = args
        if (!isException(stylesheetPath) && matchExtensions.test(stylesheetPath)) {
          const requiringFile = file.opts.filename
          const cssFilePath = resolveStylesheetPath(requiringFile, stylesheetPath)
          const tokens = requireCssFile(requiringFile, stylesheetPath)
          const css = STYLES.get(cssFilePath)

          if (!t.isExpressionStatement(path.parent)) {
            if (css !== undefined) {
              path.replaceWithSourceString(transformCssRequire(tokens, css))
            } else {
              path.replaceWith(t.ObjectExpression(
                Object.keys(tokens).map(
                  token => t.ObjectProperty(
                    t.StringLiteral(token),
                    t.StringLiteral(tokens[token])
                  )
                )
              ))
            }
          } else {
            path.remove()
          }
        }
      }
    }
  }
}
