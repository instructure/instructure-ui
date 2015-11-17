/* eslint no-var: 0 */
var path = require('path')
var paths = require('../paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')

var env = process.env.NODE_ENV

var config = require('./util/generate-config')({
  output: {
    path: paths.docsBuild,
    filename: '[name].js'
  },
  entry: {
    'docs': path.join(paths.docsApp, 'lib/index.js'),
    'prismjs': path.join(paths.docsApp, 'lib/prismjs.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Instructure UI Component Library',
      template: path.join(paths.templatesRoot, '/index.tmpl.html'),
      inject: 'body',
      chunks: ['prismjs', 'docs']
    })
  ]
}, {
  env: env,
  minify: (env === 'production')
})

/* add entries for examples */
var components = glob.sync('lib/components/**/__examples__/**/index.js')

components.forEach(function (component) {
  var parts = path.dirname(component).split(path.sep)
  var componentName

  parts.forEach(function (part, i) {
    if (part === '__examples__') {
      componentName = parts[ i - 1 ]
    }
  })

  var entry = componentName + '/example'

  config.entry[entry] = component

  config.plugins.push(
    new HtmlWebpackPlugin({
      title: componentName + ' Examples',
      template: path.join(paths.templatesRoot, '/index.tmpl.html'),
      inject: 'body',
      filename: componentName + '/index.html',
      chunks: [entry]
    })
  )
})

module.exports = config
