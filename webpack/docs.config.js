const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const { files, paths, pkg } = require('./util/loadConfig')

const env = process.env.NODE_ENV
const minify = process.env.MINIFY
const debug = process.env.DEBUG

const entry = {
  'docs': [
    path.join(paths.src.docs, 'lib/index.js')
  ],
  'globals': [ // for rendering examples in codepen
    path.join(paths.src.docs, 'lib/globals.js')
  ],
  'vendor': [
    path.join(paths.src.docs, 'lib/polyfill.js'),
    'react',
    'react-dom'
  ]
}

entry[pkg.name] = [ paths.src.themes, path.join(paths.root, pkg.main) ]

let plugins = require('./config/plugins')(env, minify, debug)

plugins = plugins.concat([
  new HtmlWebpackPlugin({
    title: pkg.name + ' : ' + pkg.description + ' (' + pkg.version + ')',
    template: path.join(paths.src.docs, 'templates/index.tmpl.html'),
    inject: 'body',
    chunks: ['vendor', pkg.name, 'globals', 'docs'],
    chunksSortMode: 'dependency'
  }),

  new FaviconsWebpackPlugin(files.logo),

  new CommonsChunkPlugin({
    name: ['vendor', pkg.name].reverse(),
    minChunks: Infinity
  }),

  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'sync',
    defer: ['docs']
  })
])

const resolve = require('./config/resolve')
resolve.alias = resolve.alias || {}
resolve.alias['instructure-ui'] = process.cwd()

module.exports = {
  cache: !!debug,
  bail: !debug,
  entry,
  resolve,
  resolveLoader: require('./config/resolveLoader'),
  module: require('./config/module')(env, debug),
  plugins,
  output: {
    path: paths.build.docs,
    filename: '[name].js'
  },
  devServer: {
    contentBase: paths.build.docs,
    host: '0.0.0.0',
    port: 8080
  },
  performance: {
    hints: false
  }
}
