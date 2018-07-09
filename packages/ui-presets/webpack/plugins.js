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

const webpack = require('webpack')
const HappyPack = require('happypack')

const readPkgUp = require('read-pkg-up')

const loadConfig = require('@instructure/config-loader')
const { generateScopedName } = loadConfig('themeable', require('../themeable'))

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

let hashPrefix = Date.now()
const { pkg } = readPkgUp.sync({cwd: process.cwd(), normalize: false})
if (pkg) {
  hashPrefix = `${pkg.name}${pkg.version}`
}

module.exports = function plugins (options = {}) {
  const threadPool = options.threadPool || new HappyPack.ThreadPool({ size: 4 })

  let plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new HappyPack({
      id: 'js',
      threadPool,
      loaders: [{
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: !DEBUG ? false : '.babel-cache'
        }
      }],
      verbose: false
    }),
    new HappyPack({
      id: 'css',
      threadPool,
      loaders: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            hashPrefix,
            localIdentName:
              typeof generateScopedName === 'function' &&
              generateScopedName({
                env: !DEBUG ? 'production' : ENV
              }),
            minimize: false,
            discardComments: true,
            discardEmpty: true,
            discardUnused: true
          }
        },
        {
          loader: 'postcss-loader'
        }
      ],
      verbose: false
    })
  ]

  if (!DEBUG) {
    plugins = plugins.concat([
      new webpack.NoEmitOnErrorsPlugin()
    ])
  }

  return plugins
}
