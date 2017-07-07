const webpack = require('webpack') // eslint-disable-line import/no-extraneous-dependencies

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

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
