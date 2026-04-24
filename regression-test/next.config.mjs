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
  // Fully static export: no SSR, no hydration mismatches that can cause
  // screenshot flakiness. `next build` writes a plain static site to `out/`.
  output: 'export',
  // Emits out/<route>/index.html so any static server (including http-server)
  // resolves /route without needing a .html fallback config.
  trailingSlash: true,
  images: { unoptimized: true },
  // strict mode needs to be disabled, so deterministic ID generation
  // works. If its enabled, client side double rendering causes IDs to
  // come out of sync. TODO fix
  reactStrictMode: false,
  // Use regression-test as its own workspace root (simulates external usage)
  outputFileTracingRoot: __dirname,
  // TODO move to turbopack (then we can also remove the `--webpack` flag
  webpack: (config) => {
    // for some reason webpack HMR wants to use CJS modules, force it to use ESM
    // otherwise `npm run dev` crashes
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /@instructure\/(.*)\/lib\/(.*)/,
        (resource) => {
          // Replace /lib/ with /es/ in the request
          // eslint-disable-next-line no-param-reassign
          resource.request = resource.request.replace('/lib/', '/es/')
        }
      )
    )
    return config
  }
}

export default nextConfig
