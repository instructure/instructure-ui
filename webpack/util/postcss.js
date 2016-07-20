/* eslint no-var: 0 */
'use strict'

var pluginsList = function (variables) {
  return [
    require('stylelint')(),
    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-input-range')(), // for RangeInput

    require('postcss-mixins')(), // need this for Grid
    require('postcss-nested')(),
    require('postcss-simple-vars')(), // need this for Grid

    require('postcss-custom-properties')({
      variables: Object.assign(
        {},
        variables.theme,
        variables.brand
      ),
      preserve: true
    }),

    require('postcss-custom-media')({
      extensions: variables.media
    }),

    require('postcss-calc')(),

    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),

    require('postcss-browser-reporter'),
    require('postcss-reporter')
  ]
}

module.exports = function (env) {
  var variables = require('./load-css-variables')()

  return pluginsList(variables)
}
