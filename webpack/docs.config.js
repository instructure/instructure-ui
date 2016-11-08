/* eslint no-var: 0 */
'use strict'

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var config = require('./util/config')

var entry = {
  'example': [ path.join(config.docsAppPath, 'lib/example.js') ],
  'docs': [
    path.join(config.docsAppPath, 'lib/index.js')
  ],
  'globals': [ // for rendering examples in codepen
    path.join(config.docsAppPath, 'lib/globals.js')
  ],
  'common': ['babel-polyfill', 'react', 'react-dom']
}

entry[config.library.packageName] = [ path.join(config.rootPath, config.library.main) ]

module.exports = require('./util/generate-config')({
  devtool: (process.env.NODE_ENV === 'production') ? null : 'cheap-module-eval-source-map',
  output: {
    path: config.docsPath,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      'instructure-ui': 'lib'
    }
  },
  entry: entry,
  plugins: [
    new HtmlWebpackPlugin({
      title: config.app.title + ' (' + config.library.version + ')',
      template: path.join(config.docsAppPath, 'templates/index.tmpl.html'),
      inject: 'body',
      chunks: ['docs', 'common']
    }),
    new HtmlWebpackPlugin({
      title: 'Component Example',
      template: path.join(config.docsAppPath, 'templates/example.tmpl.html'),
      inject: 'body',
      filename: 'example.html',
      chunks: ['example', config.library.packageName, 'common']
    }),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
  ]
})
