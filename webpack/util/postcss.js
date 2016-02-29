/* eslint no-var: 0 */
'use strict'

function pluginsList (minify, theme) {
  var plugins = [
    require('postcss-import')(),
    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-simple-vars')(),
    require('postcss-color-function')()
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
    })
  )

  if (minify) {
    plugins = plugins.concat(
      require('postcss-discard-duplicates')(),
      require('postcss-discard-comments'),
      require('csswring')
    )
  }

  return plugins
}

module.exports = function (env, minify) {
  var packs = {
    defaults: pluginsList(minify, false)
  }

  if (env === 'production' || env === 'build') {
    packs.extractTheme = pluginsList(minify, require('./theme-as-map')())
  }

  return packs
}
