const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')

const getOptions = require('./utils/getOptions')

function DocsPlugin (options) {
  this.options = options
}

DocsPlugin.prototype.apply = function (compiler) {
  const options = getOptions(this.options)

  compiler.apply(new SingleEntryPlugin(
    this.context,
    `!!${require.resolve('./loaders/docs-loader')}!`,
    'ui-docs'
  ))

  compiler.apply(new HtmlWebpackPlugin({
    title: options.title,
    filename: 'index.html',
    template: options.template,
    inject: 'body',
    chunksSortMode: 'dependency'
  }))

  compiler.apply(new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'sync',
    defer: ['ui-docs'] // to ensure that globals loads first
  }))

  if (options.favicon) {
    compiler.apply(new FaviconsWebpackPlugin(options.favicon))
  }
}

module.exports = DocsPlugin
