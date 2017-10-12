const path = require('path')
const webpack = require('webpack')

const DocsPlugin = require('@instructure/ui-docs-plugin')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const outputPath = path.resolve(__dirname, '__build__')

let plugins = require('@instructure/ui-presets/webpack/plugins')()

plugins = plugins.concat([
  new DocsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['common', 'instructure-ui'].reverse(),
    minChunks: Infinity
  })
])

if (!DEBUG) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ])
}

module.exports = {
  cache: DEBUG,
  bail: !DEBUG,
  entry: {
    common: [
      '../ui-polyfill-loader!',
      'react',
      'react-dom',
      'moment'
    ],
    'instructure-ui': [
      '../ui-themes/src/canvas/base',
      '../ui-themes/src/canvas/high-contrast',
      '../ui-core/src',
      '../ui-utils/src',
      '../ui-themeable/src'
    ],
    globals: './globals'
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: outputPath,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  plugins,
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
