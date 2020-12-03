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
const webpack = require('webpack')

const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const ENV = process.env.NODE_ENV || 'production'
const DEBUG = process.env.DEBUG || ENV === 'development'
const DISABLE_SPEEDY_STYLESHEET = process.env.DISABLE_SPEEDY_STYLESHEET || false
const OMIT_INSTUI_DEPRECATION_WARNINGS =
  process.env.OMIT_INSTUI_DEPRECATION_WARNINGS || false

const envVars = {
  NODE_ENV: ENV,
  DEBUG,
  DISABLE_SPEEDY_STYLESHEET,
  OMIT_INSTUI_DEPRECATION_WARNINGS
}

module.exports = [
  new webpack.EnvironmentPlugin(envVars),
  DEBUG ? new WatchMissingNodeModulesPlugin(path.resolve('node_modules')) : null
].filter(Boolean)
