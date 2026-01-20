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
const exclude = [/node_modules/, /\/lib\//, /\/es\//]

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: !DEBUG ? false : '.babel-cache'
  }
}

const rules = [
  // Lucide icons: Process directly with babel-loader, skipping thread-loader
  // The lucide/index.ts file is very large (~2400 lines, 133KB) with icon wrapper exports.
  // thread-loader has a 2-second poolTimeout which is insufficient for this file,
  // causing webpack to hang during dev server startup. Processing it directly avoids the timeout.
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: [...exclude],
    include: /lucide/,
    use: [babelLoader]
  },
  {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    exclude: [...exclude, /lucide/],
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: 2,
          workerParallelJobs: 50,
          workerNodeArgs: ['--max-old-space-size=8192'],
          poolRespawn: false,
          poolTimeout: 2000,
          name: 'babel-loader-pool'
        }
      },
      babelLoader
    ]
  },
  {
    test: /\.css$/,
    include: [/ui-icons/],
    use: ['style-loader', 'css-loader']
  },
  {
    // eslint-disable-next-line no-useless-escape
    test: /\.(eot|woff2?|otf|ttf)([\?]?.*)$/,
    type: 'asset/resource'
  },
  {
    test: /\.svg$/,
    type: 'asset/source'
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    type: 'asset/resource'
  }
]

export default rules
