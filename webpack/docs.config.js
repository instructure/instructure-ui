/* eslint no-var: 0 */
var path = require('path')
var paths = require('../paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var pkg = require('../package')
var entry = {
  'example': path.join(paths.docsApp, 'lib/example.js'),
  'docs': path.join(paths.docsApp, 'lib/index.js'),
  'prismjs': path.join(paths.docsApp, 'lib/prismjs.js')
}

entry[pkg.name] = [ path.join(paths.root, pkg.main) ]

var env = process.env.NODE_ENV

var config = require('./util/generate-config')({
  output: {
    path: paths.docsBuild,
    filename: '[name].js'
  },
  entry: entry,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Instructure UI Component Library',
      template: path.join(paths.templatesRoot, '/index.tmpl.html'),
      inject: 'body',
      chunks: ['prismjs', 'docs', pkg.name]
    }),
    new HtmlWebpackPlugin({
      title: 'Component Example',
      template: path.join(paths.templatesRoot, '/example.tmpl.html'),
      inject: 'body',
      filename: 'example.html',
      chunks: ['example', pkg.name]
    })
  ]
}, {
  env: env,
  minify: (env === 'production')
})

module.exports = config
