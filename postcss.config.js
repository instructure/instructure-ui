module.exports = function (ctx) {
  let plugins = []

  if (ctx.env === 'development' || ctx.env === 'test') {
    plugins = plugins.concat([
      require('stylelint')()
    ])
  }

  plugins = plugins.concat([
    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-input-range')(), // for RangeInput

    require('postcss-mixins')(), // need this for Grid
    require('postcss-nested')(),
    require('postcss-simple-vars')(), // need this for Grid

    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),

    require('postcss-initial'), // adds 'all: initial' ie support

    require('postcss-reporter')
  ])

  if (ctx.env === 'development' || ctx.env === 'test') {
    plugins = plugins.concat([
      require('postcss-browser-reporter')
    ])
  }

  return {
    plugins
  }
}
