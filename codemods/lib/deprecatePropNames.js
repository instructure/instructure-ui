const fs = require('fs')
const path = require('path')

// const insertOrUpdateDecorator = require('./helpers/insertOrUpdateDecorator')
const replacePropsAndDefaults = require('./helpers/replacePropsAndDefaults')
const replaceVariableDeclarations = require('./helpers/replaceVariableDeclarations')
const replacePropertyMembers = require('./helpers/replacePropertyMembers')

module.exports = function (file, api, options) {
  const j = api.jscodeshift
  const c = options.config.indexOf(process.cwd()) > -1
    ? options.config
    : path.join(process.cwd(), options.config)

  const config = fs.existsSync(c) ? require(c) : null

  if (!config) {
    throw new Error(`Invalid config file "${options.config}"`)
  }

  let root = j(file.source)
  let hasModifications = false

  // TODO Modifying decorators needs some love to get it working.
  //      In the mean time this can be done manually easily enough.
  // hasModifications = insertOrUpdateDecorator(j, root, config) || hasModifications
  hasModifications = replacePropsAndDefaults(j, root, config) || hasModifications
  hasModifications = replaceVariableDeclarations(j, root, config) || hasModifications
  hasModifications = replacePropertyMembers(j, root, config) || hasModifications

  return hasModifications
    ? root.toSource({ quote: 'single' })
    : null
}
