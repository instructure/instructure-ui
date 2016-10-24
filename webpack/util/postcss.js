/* eslint no-var: 0 */
'use strict'

var pluginsList = function (isDocsPack) {
  let plugins = [
    require('stylelint')(),
    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-input-range')(), // for RangeInput

    require('postcss-mixins')(), // need this for Grid
    require('postcss-nested')(),
    require('postcss-simple-vars')() // need this for Grid
  ]

  // these can be removed when we extract the docs app
  if (isDocsPack) {
    plugins = plugins.concat([
      require('postcss-custom-properties')(),
      require('postcss-calc')()
    ])
  }

  plugins = plugins.concat([
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),

    require('postcss-browser-reporter'),
    require('postcss-reporter'),

    require('postcss-initial') // adds 'all: initial' ie support
  ])

  return plugins
}

module.exports = function (env) {
  var packs = {
    defaults: pluginsList(),
    docs: pluginsList(true)
  }

  return packs
}
