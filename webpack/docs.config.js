const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

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
  'babel-polyfill': ['babel-polyfill-loader!'],
  'vendor': ['react', 'react-dom']
}
entry[pkg.name] = [ path.join(paths.root, pkg.main) ]

const docsAppChunks = ['babel-polyfill', 'vendor', pkg.name, 'docs']
const exampleAppChunks = ['babel-polyfill', 'vendor', 'globals', pkg.name, 'example']
const chunksSortMode = function (chunksOrder) {
  return function (chunk1, chunk2) {
    const order1 = chunksOrder.indexOf(chunk1.names[0])
    const order2 = chunksOrder.indexOf(chunk2.names[0])
    if (order1 > order2) {
      return 1
    } else if (order1 < order2) {
      return -1
    } else {
      return 0
    }
  }
}

let plugins = require('./config/plugins')(env, minify)
plugins = plugins.concat([
  new HtmlWebpackPlugin({
    title: pkg.name + ' : ' + pkg.description + ' (' + pkg.version + ')',
    template: path.join(paths.src.docs, 'templates/index.tmpl.html'),
    inject: 'body',
    chunks: docsAppChunks,
    chunksSortMode: chunksSortMode(docsAppChunks)
  }),

  new HtmlWebpackPlugin({
    title: 'Component Example',
    template: path.join(paths.src.docs, 'templates/index.tmpl.html'),
    inject: 'body',
    filename: 'example.html',
    chunks: exampleAppChunks,
    chunksSortMode: chunksSortMode(exampleAppChunks)
  }),

  new CommonsChunkPlugin({
    name: ['babel-polyfill', 'vendor'].reverse()
  }),

  new ScriptExtHtmlWebpackPlugin({
    inline: ['babel-polyfill'],
    sync: ['vendor'],
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
