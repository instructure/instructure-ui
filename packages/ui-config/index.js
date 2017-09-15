const path = require('path')
const fs = require('fs')

exports.POSTCSSRC = 'postcss'
exports.THEMEABLERC = 'themeable'
exports.BROWSERSLISTRC = 'browserslist'
exports.BABELRC = 'babel'
exports.POLYFILLRC = 'polyfill'

const DEFAULT_CONTEXT = { env: process.env.NODE_ENV || 'development', cwd: process.cwd() }

exports.loadConfig = function loadConfig (name, ctx = DEFAULT_CONTEXT) {
  const parts = path.resolve(ctx.cwd).split(path.sep)
  const config = findConfig(name, parts)

  if (typeof config === 'function') {
    return config(ctx)
  } else {
    return config
  }
}

function findConfig (name, parts) {
  if (!parts) return {}

  const filenames = [`${name}.json`, `${name}rc.js`, `${name}.config.js`]

  while (filenames.length) {
    const rcFilePath = resolvePath(parts, filenames.shift())

    if (fs.existsSync(rcFilePath)) {
      return loadConfigFile(rcFilePath)
    }
  }

  const pkgJSONPath = resolvePath(parts, 'package.json')

  if (fs.existsSync(pkgJSONPath)) {
    const pkgJSON = requireNoCache(pkgJSONPath)

    if (pkgJSON[name]) {
      return pkgJSON[name]
    }
  }

  if (parts.pop()) {
    return findConfig(name, parts)
  } else {
    return {}
  }
}

function resolvePath (parts, filename) {
  return path.resolve(parts.join(path.sep) + path.sep, filename)
}

function loadConfigFile (filePath) {
  try {
    return requireNoCache(filePath)
  } catch (e) {
    e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`
    throw e
  }
}

function invalidateRequireCacheForFile (filepath) {
  delete require.cache[require.resolve(filepath)]
}

function requireNoCache (filepath) {
  invalidateRequireCacheForFile(filepath)
  return require(filepath) // eslint-disable-line import/no-dynamic-require
}
