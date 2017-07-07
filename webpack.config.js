const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'
const pkg = require(path.join(__dirname, 'package.json')) // eslint-disable-line import/no-dynamic-require

const {
  entryName,
  favicon,
  library
} = require('./themeable.config.js')

const paths = {
  output: path.join(__dirname, '__build__/docs'),
  src: path.join(__dirname, 'lib'), // TODO: change to src
  docs: path.join(__dirname, 'docs/app/lib') // TODO: move to webpack plugin
}

module.exports = {
  cache: debug,
  bail: !debug,
  entry: {
    [entryName]: paths.docs, // TODO: change to src
    common: [
      // TODO: docs app/plugin will need its own polyfills?
      'babel-polyfill-loader!',
      'react',
      'react-dom'
    ],
    [pkg.name]: [
      path.join(paths.src, 'themes'),
      paths.src
    ],
    // TODO: need to be able to specify this for each library (as a plugin option?)
    globals: [
      path.join(paths.docs, 'globals.js')
    ]
  },
  output: {
    path: paths.output,
    filename: '[name].js'
  },
  devServer: {
    contentBase: paths.output,
    host: '0.0.0.0',
    port: 8080
  },
  plugins: addPlugins(require('./webpack/shared/plugins')),
  resolve: require('./webpack/shared/resolve'),
  resolveLoader: require('./webpack/shared/resolveLoader'),
  module: require('./webpack/shared/module'),
  devtool: 'cheap-module-source-map'
}

function addPlugins (basePlugins) {
  let plugins = basePlugins || []

  plugins = plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', pkg.name].reverse(),
      minChunks: Infinity
    }),
    // TODO; the following 2 plugins would be added by the webpack plugin
    new FaviconsWebpackPlugin(favicon),
    new HtmlWebpackPlugin({
      title: library.title,
      filename: 'index.html',
      template: require.resolve('./docs/app/templates/index.tmpl.html'), // TODO: get template from plugin options
      inject: 'body',
      chunks: ['common', pkg.name, 'globals', entryName], // TODO: make this a plugin option?
      chunksSortMode: 'dependency'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'sync',
      defer: [entryName] // to ensure that globals loads first
    })
  ])

  if (!debug) {
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
  return plugins
}
