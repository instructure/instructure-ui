const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')

function DocsPlugin (options) {
  this.options = options
}

DocsPlugin.prototype.apply = function (compiler) {
  const options = Object.assign({
    globals: {}
  }, this.options)
  const {
    title,
    favicon,
    files,
    library,
    template,
    globals
  } = options

  // TODO: validate options

  const docsLoader = require.resolve('./loaders/docs-loader')
  const globalsLoader = require.resolve('./loaders/globals-loader')

  compiler.apply(new SingleEntryPlugin(
    this.context,
    `${globalsLoader}?${JSON.stringify({ library, globals })}!`,
    'globals'
  ))

  compiler.apply(new SingleEntryPlugin(
    this.context,
    `${docsLoader}?${JSON.stringify({ files, library })}!`,
    'docs'
  ))

  compiler.apply(new HtmlWebpackPlugin({
    title: title,
    filename: 'index.html',
    template: template || require.resolve(__dirname, 'index.tmpl.html'),
    inject: 'body',
    chunksSortMode: 'dependency'
  }))

  compiler.apply(new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'sync',
    defer: ['docs'] // to ensure that globals loads first
  }))

  if (favicon) {
    compiler.apply(new FaviconsWebpackPlugin(favicon))
  }
}

module.exports = DocsPlugin
