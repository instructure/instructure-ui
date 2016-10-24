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
  var media = {}

  glob.sync(path.join(config.rootPath, config.theme.files))
    .forEach(function processTheme (filepath) {
      var componentName = componentNameFromPath(filepath)
      var componentTheme = require(filepath).default(brand)
      var themeVars = transformCssVariables({ [componentName]: componentTheme })
      var mediaVars = {}

      if (componentTheme.media) {
        mediaVars = transformCssVariables({
          [componentName]: {
            media: componentTheme.media
          }
        })
      }

      Object.keys(themeVars).forEach(function (key) {
        theme[key] = themeVars[key]
      })

      Object.keys(mediaVars).forEach(function (key) {
        media[key] = mediaVars[key]
      })
    })

  return {
    theme: theme,
    media: media
  }
}
