/* eslint no-var: 0 */
'use strict'

var glob = require('glob')
var path = require('path')
var config = require('./config')
var componentNameFromPath = require('./component-name-from-path')
var transformCssVariables = require('./transform-css-variables')

require('babel-core/register')

var brand = require(path.join(config.rootPath, config.theme.brand)).default

module.exports = function () {
  var theme = {}

  glob.sync(path.join(config.rootPath, config.theme.files))
    .forEach(function processTheme (filepath) {
      var vars = transformCssVariables({
        [componentNameFromPath(filepath)]: require(filepath).default(brand)
      })

      Object.keys(vars).forEach(function (key) {
        theme[key] = vars[key]
      })
    })

  return {
    theme: theme,
    brand: transformCssVariables({ Brand: brand }),
    media: transformCssVariables({
      Brand: {
        media: brand.media
      }
    })
  }
}
