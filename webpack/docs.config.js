const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const { paths, pkg } = require('./util/loadConfig')

const env = process.env.NODE_ENV
const minify = process.env.MINIFY

const entry = {
  'example': [ path.join(paths.src.docs, 'lib/example.js') ],
  'docs': [
    path.join(paths.src.docs, 'lib/index.js')
  ],
  'globals': [ // for rendering examples in codepen
    path.join(paths.src.docs, 'lib/globals.js')
  ],
  'polyfills': ['babel-polyfill'],
  'vendor': ['react', 'react-dom']
}
entry[pkg.name] = [ path.join(paths.root, pkg.main) ]

let plugins = require('./config/plugins')(env, minify)
plugins = plugins.concat([
  new HtmlWebpackPlugin({
    title: pkg.name + ' : ' + pkg.description + ' (' + pkg.version + ')',
    template: path.join(paths.src.docs, 'templates/index.tmpl.html'),
    inject: 'body',
    chunks: ['docs', 'vendor', 'polyfills']
  }),

  new HtmlWebpackPlugin({
    title: 'Component Example',
    template: path.join(paths.src.docs, 'templates/example.tmpl.html'),
    inject: 'body',
    filename: 'example.html',
    chunks: ['example', 'globals', pkg.name, 'vendor', 'polyfills']
  }),

  new CommonsChunkPlugin({
    name: ['polyfills', 'vendor'].reverse()
  }),

  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer'
  })
])

const resolve = require('./config/resolve')
resolve.alias = { 'instructure-ui': process.cwd() }

module.exports = {
  entry,
  resolve,
  resolveLoader: require('./config/resolveLoader'),
  module: require('./config/module')(env),
  plugins,
  output: {
    path: paths.build.docs,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: paths.build.docs,
    host: '0.0.0.0',
    port: 8080
  }
}
