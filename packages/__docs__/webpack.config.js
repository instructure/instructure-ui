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

const ENV = process.env.NODE_ENV || 'production'
const DEBUG = process.env.DEBUG || ENV === 'development'
const path = require('path')
const baseConfig = require('@instructure/ui-webpack-config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { merge } = require('webpack-merge')

const outputPath = path.resolve(__dirname, '__build__')
//TODO: fix resolve aliases for TS packages
const resolveAliases = DEBUG ? { resolve: require('./resolve') } : {}

const config = merge(baseConfig, {
  entry: {
    // main entry point
    main: './src/index.js',
    // Note: these entries have to keep these names so that old codepens still work
    common: ['@instructure/ui-polyfill-loader!', 'react', 'react-dom'],
    globals: './globals.js'
  },
  output: {
    path: outputPath,
    filename: '[name].[contenthash].js'
  },

  devServer: {
    contentBase: outputPath,
    host: '0.0.0.0'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main']
    })
  ],
  optimization: {
    usedExports: true
  },
  // ...resolveAliases,
  mode: 'production'
})

module.exports = config
