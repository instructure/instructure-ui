/* eslint no-var: 0 */

var path = require('path')
var fs = require('fs')
var glob = require('glob')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = require('./shared')
var baseDir = process.cwd()

config.entry = {
  'vendor': [ 'react' ]
}

config.output = {
  path: path.resolve(process.cwd(), '__examples__'),
  filename: '[name].js'
}

config.plugins = config.plugins.concat([
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
])

var components = glob.sync('lib/components/**/package.json')

components.forEach(function (component) {
  var pkg = JSON.parse(fs.readFileSync(component, 'utf8'))

  var entry = pkg.name + '/example'

  config.entry[entry] = path.resolve(path.dirname(component), pkg.directories.example)

  config.plugins.push(
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: path.resolve(baseDir, 'lib/index.html'),
      inject: 'body',
      filename: pkg.name + '/index.html',
      chunks: ['vendor', entry]
    })
  )
})

module.exports = config
