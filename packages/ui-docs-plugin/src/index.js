/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const path = require('path')

const getOptions = require('./utils/getOptions')

function DocsPlugin (options) {
  this.options = options
}

DocsPlugin.prototype.apply = function (compiler) {
  const pluginOptions = this.options || {}
  const options = getOptions(pluginOptions)

  compiler.apply(new SingleEntryPlugin(
    this.context,
    `!!${require.resolve('./loaders/docs-loader')}?${JSON.stringify(pluginOptions)}!`,
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
    compiler.apply(new FaviconsWebpackPlugin({
      logo: path.resolve(options.context, options.favicon),
      title: options.title
    }))
  }
}

module.exports = DocsPlugin
