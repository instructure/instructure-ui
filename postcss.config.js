/* eslint-disable import/no-extraneous-dependencies */

module.exports = function (ctx) {
  let plugins = []

  if (ctx.env !== 'production') {
    plugins = plugins.concat([
      require('stylelint')
    ])
  }

  plugins = plugins.concat([
    require('postcss-input-range'), // for RangeInput
    require('postcss-mixins'), // TODO: remove this. needed for Grid
    require('postcss-nested'),
    require('postcss-simple-vars'), // TODO: remove this. needed for Grid
    require('autoprefixer')({
      browsers: require('./browserslist.json')
    }),
    require('postcss-initial'), // for IE 11 all:initial support
    require('postcss-bidirection'), // for RTL language support in IE/Edge
    require('postcss-reporter')
  ])

  if (ctx.env !== 'production') {
    plugins = plugins.concat([
      require('postcss-browser-reporter')
    ])
  }

  return {
    plugins
  }
}

/* eslint-enable import/no-extraneous-dependencies */
