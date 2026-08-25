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

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: deliberately no `output: 'export'` here. The regression-test app sets
  // that to get a static site; this app is the opposite — every request is
  // rendered on the Node server and then hydrated in the browser, which is the
  // thing we are here to measure.
  //
  // The scenario routes are also marked `force-dynamic` so Next cannot cache a
  // prerendered copy and hand it out without running the server render.

  // Strict mode double-renders on the client, which desynchronises InstUI's
  // deterministic ID counter against the server's. Same reason the
  // regression-test app disables it.
  reactStrictMode: false,

  // Treat this directory as its own root, so Next does not try to trace files
  // up into the pnpm monorepo.
  outputFileTracingRoot: __dirname,

  // TODO move to turbopack (then the `--webpack` flag can go too)
  webpack: (config) => {
    // Webpack HMR resolves the CJS `/lib/` build of the InstUI packages, which
    // breaks `next dev`. Force the ESM `/es/` build instead. Copied from the
    // regression-test app, where the same problem was solved this way.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /@instructure\/(.*)\/lib\/(.*)/,
        (resource) => {
          // eslint-disable-next-line no-param-reassign
          resource.request = resource.request.replace('/lib/', '/es/')
        }
      )
    )
    return config
  }
}

export default nextConfig
