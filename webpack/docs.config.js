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
var libEntry = config.library.packageName
entry[libEntry] = [ path.join(config.rootPath, config.library.main) ]

module.exports = require('./util/generate-config')({
  devtool: (process.env.NODE_ENV === 'production') ? 'source-map' : 'cheap-module-eval-source-map',
  output: {
    path: config.docsPath,
    filename: '[name].js'
  },
  entry: entry,
  plugins: [
    new HtmlWebpackPlugin({
      title: config.app.title,
      template: path.join(config.docsAppPath, 'templates/index.tmpl.html'),
      inject: 'body',
      chunks: ['docs']
    }),
    new HtmlWebpackPlugin({
      title: 'Component Example',
      template: path.join(config.docsAppPath, 'templates/example.tmpl.html'),
      inject: 'body',
      filename: 'example.html',
      chunks: ['example', libEntry]
    })
  ]
}, process.env.NODE_ENV, process.env.MINIFY)
