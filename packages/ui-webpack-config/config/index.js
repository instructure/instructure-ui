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

import dotenv from 'dotenv'
import rules from './module/rules.js'
import plugins from './plugins.js'
import optimization from './optimization.js'

dotenv.config({ path: process.cwd() })

const DEBUG = process.env.DEBUG
const ENV = process.env.NODE_ENV || 'production'

const config = {
  mode: ENV === 'production' ? 'production' : 'development',
  cache: ENV !== 'production',
  bail: !DEBUG,
  devtool: ENV === 'production' ? false : 'cheap-module-source-map',
  module: {
    rules
  },
  plugins,
  optimization,
  performance: {
    hints: ENV === 'production' ? 'warning' : false
  },
  resolve: {
    fallback: {
      fs: false,
      module: false,
      path: false,
      process: false // needed for Sinon 12+
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}

export default config
