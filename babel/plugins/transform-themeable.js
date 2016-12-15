// based on https://raw.githubusercontent.com/michalkvasnicak/babel-plugin-css-modules-transform/master/src/index.js

const {
  resolve,
  dirname,
  isAbsolute,
  join
} = require('path')

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
      return require(resolveStylesheetPath(filepath, stylesheetPath))
    } catch (e) {
      return {} // return empty object, this simulates result of ignored stylesheet file
    }
  }

  let initialized = false // is css modules require hook initialized?
  const matchExtensions = /\.css$/i

  const STYLES = new Map()

  return {
    visitor: {
      Program (path, state) {
        if (initialized) {
          return
        }

        const env = process.env.NODE_ENV
        const cwd = process.cwd()

        let postcssrc = state.opts.postcssrc && require(join(cwd, state.opts.postcssrc))

        if (postcssrc && typeof postcssrc === 'function') {
          postcssrc = postcssrc({ cwd, env })
        }

        const plugins = postcssrc && postcssrc.plugins

        let themeablerc = state.opts.themeablerc && require(join(cwd, state.opts.themeablerc))

        if (themeablerc && typeof themeablerc === 'function') {
          themeablerc = themeablerc({ cwd, env })
        }

        const { generateScopedName } = themeablerc

        require('css-modules-require-hook')({
          generateScopedName: generateScopedName({ env }),
          prepend: plugins || [],
          processCss: (css, filepath) => {
            if (!STYLES.has(filepath)) {
              STYLES.set(filepath, css)
            }
            return css
          },
          append: [require('./util/postcss-themeable-styles')]
        })

        initialized = true
      },

      ImportDeclaration (path, { file }) {
        // this method is called between enter and exit, so we can map css to our state
        // it is then replaced with require call which will be handled in seconds pass by CallExpression
        // CallExpression will then replace it or remove depending on parent node (if is Program or not)
        const { value } = path.node.source

        if (matchExtensions.test(value)) {
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

        if (matchExtensions.test(stylesheetPath)) {
          const requiringFile = file.opts.filename
          const cssFilePath = resolveStylesheetPath(requiringFile, stylesheetPath)
          const tokens = requireCssFile(requiringFile, stylesheetPath)
          const css = STYLES.get(cssFilePath)

          if (!t.isExpressionStatement(path.parent)) {
            if (css) {
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
