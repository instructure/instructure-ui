const fs = require('fs')
const path = require('path')

const replaceDeprecatedImports = require('./helpers/replaceDeprecatedImports')

module.exports = function (file, api, options) {
  const j = api.jscodeshift
  const c = options.config.indexOf(process.cwd()) > -1
    ? options.config
    : path.join(process.cwd(), options.config)
  const config = fs.existsSync(c) ? require(c) : null // eslint-disable-line import/no-dynamic-require

  if (!config) {
    throw new Error(`Invalid config file "${options.config}"`)
  }

  const root = j(file.source)
  let hasModifications = false

  hasModifications = replaceDeprecatedImports(j, root, config) || hasModifications

  return hasModifications
    ? root.toSource({ quote: 'single' })
    : null
}

