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

const path = require('path')
const loadConfig = require('@instructure/config-loader')

module.exports = function (pluginOptions = {}) {
  const options = Object.assign({}, loadConfig('docs'), pluginOptions)

  const context = options.context || process.cwd()
  const projectRoot = options.projectRoot || process.cwd()

  const defaultOptions = {
    context, // for webpack requires
    title: 'Documentation',
    files: [ path.resolve(projectRoot, '**/*.md') ],
    themes: [],
    library: {},
    document: {},
    projectRoot, // to determine src paths
    ignore: [
      path.resolve(projectRoot, '**/node_modules/**'),
      path.resolve(projectRoot, '**/bower_components/**'),
      path.resolve(projectRoot, 'flow-typed/**'),
      path.resolve(projectRoot, 'coverage/**'),
      path.resolve(projectRoot, '{tmp,temp}/**'),
      path.resolve(projectRoot, '**/*.min.js'),
      path.resolve(projectRoot, '**/bundle.js'),
      path.resolve(projectRoot, 'fixture{-*,}.{js,jsx}'),
      path.resolve(projectRoot, 'fixture{s,}/**'),
      path.resolve(projectRoot, '{test,tests,spec,__tests__}/fixture{s,}/**'),
      path.resolve(projectRoot, 'vendor/**'),
      path.resolve(projectRoot, 'dist/**')
    ],
    template: path.resolve(__dirname, '../../index.ejs')
  }

  return Object.assign({}, defaultOptions, options)
}
