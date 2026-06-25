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
import os from 'os'
import baseConfig from '@instructure/ui-webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { merge } from 'webpack-merge'
import webpack from 'webpack'

// Captured when the dev-server process starts (config evaluation) so we can
// report how long startup took once the first compile finishes.
const startedAt = Date.now()

// First non-internal IPv4 address, for the "Network" dev-server URL.
const getLanIp = () => {
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces || []) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address
    }
  }
  return null
}

const ENV = process.env.NODE_ENV || 'production'
const DEBUG = process.env.DEBUG || ENV === 'development'
// `DOCS_VERBOSE=1` opts into the full dev logging: webpack's per-asset/module
// stats and the dev-server startup banner here, plus per-file parse logs (and
// no progress bar) in build-docs.
const VERBOSE = Boolean(process.env.DOCS_VERBOSE)
const GITHUB_PULL_REQUEST_PREVIEW = process.env.GITHUB_PULL_REQUEST_PREVIEW || 'false'
// The URL prefix this build is deployed under. Must begin and end with a
// slash. Fed into output.publicPath (which webpack exposes at runtime as
// __webpack_public_path__) and into the HTML template's <base href> and
// 404 SPA-redirect script. Every CI workflow sets this explicitly; the
// fallback to '/' only exists for local dev (`pnpm dev`).
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/'

if (!/^\/([^?#]*\/)?$/.test(PUBLIC_PATH)) {
  throw new Error(
    `PUBLIC_PATH must begin and end with a slash and contain no query or fragment (got: "${PUBLIC_PATH}"). ` +
    `Examples: "/", "/latest/", "/pr-preview/pr-123/", "/repo/pr-preview/pr-123/"`
  )
}

const outputPath = resolvePath(import.meta.dirname, '__build__')

// Local + network dev-server URLs, captured in devServer.onListening (the port
// is supplied by the CLI, not the config) and printed once after the first
// compile — see the PrintDevServerUrl plugin below — since the dev-server's own
// startup banner is silenced.
let localUrl = ''
let networkUrl = ''

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
    onListening: (devServer) => {
      const address = devServer.server?.address()
      if (address && typeof address === 'object') {
        const { port } = address
        localUrl = `http://localhost:${port}${PUBLIC_PATH}`
        const lanIp = getLanIp()
        if (lanIp) networkUrl = `http://${lanIp}:${port}${PUBLIC_PATH}`
      }
    },
  },
  // In normal mode we own the compile output (see DevServerStatus below) so the
  // "ready" banner can be the final line, so silence webpack's own summary.
  // `DOCS_VERBOSE=1` restores the full per-asset/module breakdown.
  stats: VERBOSE ? 'normal' : false,
  // Silence webpack-dev-server's multi-line startup banner ("Project is
  // running at…", loopback/network URLs, etc.), which otherwise prints at
  // `info` level mid-way through the doc-build progress bar. Compile status is
  // handled by the DevServerStatus plugin below.
  // `DOCS_VERBOSE=1` brings the banner back (level `info`).
  infrastructureLogging: { level: VERBOSE ? 'info' : 'warn' },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      templateParameters: { PUBLIC_PATH },
    }),
    new webpack.DefinePlugin({
      'process.env.GITHUB_PULL_REQUEST_PREVIEW': JSON.stringify(GITHUB_PULL_REQUEST_PREVIEW),
    }),
    // Owns the dev-server's compile console output (webpack's own summary is
    // disabled via `stats: false` above) so the "ready" banner is guaranteed to
    // be the final line. Errors/warnings always surface; successful rebuilds get
    // a concise one-liner. In verbose mode webpack prints its own full stats, so
    // we only add the banner.
    {
      apply(compiler) {
        // The doc build runs concurrently in its own process and prints its own
        // timing line; this only reports webpack's side of startup.
        let firstDone = false
        compiler.hooks.done.tap('DevServerStatus', (stats) => {
          if (!VERBOSE) {
            if (stats.hasErrors() || stats.hasWarnings()) {
              console.log(stats.toString({ preset: 'minimal', colors: true }))
            } else if (firstDone) {
              const { time } = stats.toJson({ all: false, timings: true })
              console.log(`Recompiled in ${time} ms`)
            }
          }
          if (firstDone || !localUrl) return
          firstDone = true
          const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)
          const lines = [`Dev server ready in ${elapsed}s`, `  Local:   ${localUrl}`]
          if (networkUrl) lines.push(`  Network: ${networkUrl}`)
          console.log(lines.join('\n'))
        })
      },
    },
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
