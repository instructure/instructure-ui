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

import { resolve as resolvePath } from 'path'
import baseConfig from '@instructure/ui-webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import webpack from 'webpack'

const ENV = process.env.NODE_ENV || 'production'
const DEBUG = process.env.DEBUG || ENV === 'development'
const GITHUB_PULL_REQUEST_PREVIEW = process.env.GITHUB_PULL_REQUEST_PREVIEW || 'false'
const PR_NUMBER = process.env.PR_NUMBER
// The URL prefix this build is deployed under. Must end with a trailing
// slash. Fed into output.publicPath (which webpack exposes at runtime as
// __webpack_public_path__) and into the HTML template's <base href> and
// 404 SPA-redirect script. Keeping a single source here means a new deploy
// target only needs to set this one env var.
const PUBLIC_PATH =
  process.env.PUBLIC_PATH ||
  (PR_NUMBER ? `/pr-preview/pr-${PR_NUMBER}/` : '/')

const outputPath = resolvePath(import.meta.dirname, '__build__')

const config = merge(baseConfig, {
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/source',
      },
    ],
  },
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: PUBLIC_PATH,
  },
  devServer: {
    static: {
      directory: outputPath,
    },
    host: '0.0.0.0',
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      templateParameters: { PUBLIC_PATH },
    }),
    new webpack.DefinePlugin({
      'process.env.GITHUB_PULL_REQUEST_PREVIEW': JSON.stringify(GITHUB_PULL_REQUEST_PREVIEW),
    }),
  ],
  optimization: {
    usedExports: true,
  },
  resolve: {
    conditionNames: DEBUG ? ['src', 'import', 'default'] : ['import',
  'default']
  },
  mode: 'production',
})

export default config
