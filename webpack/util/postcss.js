/* eslint no-var: 0 */
'use strict'

function pluginsList (theme) {
  var plugins = [
    require('stylelint')(),
    require('postcss-import')(),
    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-simple-vars')(),
    require('postcss-color-function')(),
    require('postcss-custom-properties')()
  ]

  if (theme) {
    plugins = plugins.concat(
      require('postcss-map')({
        maps: theme
      })
    )
  }

  plugins = plugins.concat(
    require('postcss-calc')(),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),
    require('postcss-browser-reporter'),
    require('postcss-reporter')
  )

  return plugins
}

module.exports = function (env) {
  var packs = {
    defaults: pluginsList(false)
  }

  if (env === 'production' || env === 'build') {
    packs.extractTheme = pluginsList(require('./theme-as-map')())
  }

  return packs
}
