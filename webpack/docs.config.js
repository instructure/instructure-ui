/* eslint no-var: 0 */
'use strict'

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./util/config')

var entry = {
  'example': path.join(config.docsAppPath, 'lib/example.js'),
  'docs': [
    path.join(config.docsAppPath, 'lib/index.js')
  ]
}

module.exports = require('./util/generate-config')({
  devtool: (process.env.NODE_ENV === 'production') ? null : 'cheap-module-eval-source-map',

  output: {
    path: config.docsPath,
    filename: '[name].js'
  },
  entry: entry,
  plugins: [
    new HtmlWebpackPlugin({
      title: config.app.title + ' (' + config.library.version + ')',
      template: path.join(config.docsAppPath, 'templates/index.tmpl.html'),
      inject: 'body',
      chunks: ['docs']
    }),
    new HtmlWebpackPlugin({
      title: 'Component Example',
      template: path.join(config.docsAppPath, 'templates/example.tmpl.html'),
      inject: 'body',
      filename: 'example.html',
      chunks: ['example']
    })
  ]
}, process.env.NODE_ENV, process.env.MINIFY)
