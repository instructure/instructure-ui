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
import resolve from './resolve.mjs'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'

const ENV = process.env.NODE_ENV || 'production'
const DEBUG = process.env.DEBUG || ENV === 'development'
const GITHUB_PULL_REQUEST_PREVIEW = process.env.GITHUB_PULL_REQUEST_PREVIEW || 'false'

const outputPath = resolvePath(import.meta.dirname, '__build__')
const resolveAliases = DEBUG ? { resolve } : {}

const config = merge(baseConfig, {
  entry: {
    main: './src/index.tsx',
  },
  module: {
    exprContextCritical: false,
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
  },
  devServer: {
    static: {
      directory: outputPath,
    },
    host: '0.0.0.0',
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
    new webpack.DefinePlugin({
      'process.env.GITHUB_PULL_REQUEST_PREVIEW': JSON.stringify(GITHUB_PULL_REQUEST_PREVIEW),
    }),
  ],
  optimization: {
    usedExports: true,
  },
  ...resolveAliases,
  mode: 'production',
})

export default config
