const webpack = require('webpack')

const debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development'

let plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
    DEBUG: false
  })
]

if (!debug) {
  plugins = plugins.concat([
    new webpack.NoEmitOnErrorsPlugin()
  ])
}

module.exports = plugins
