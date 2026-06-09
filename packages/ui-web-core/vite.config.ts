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

import { defineConfig } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { aliases } from './aliases.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Only framework peers stay external; EVERYTHING else (the aliased neutral
// modules AND the @instructure/* utility packages + keycode they import) is
// bundled, so the published package is a self-contained artifact consumable
// cross-repo via a `file:` link with no unresolvable `workspace:*` deps.
const EXTERNAL = [
  'lit',
  'lit-html',
  'lit/decorators.js',
  '@lit/react',
  'react',
  'react-dom',
  'react/jsx-runtime'
]
const isExternal = (id: string) =>
  EXTERNAL.includes(id) ||
  id.startsWith('lit/') ||
  id.startsWith('lit-html/') ||
  id.startsWith('react/') ||
  id.startsWith('@angular/')

/*
 * Library build for the framework-agnostic Web Components. The React-free
 * neutral modules reached via the source aliases (@alerts, @drilldown, …) AND
 * the @instructure/* utility packages they import are INLINED into a
 * self-contained bundle; only lit/@lit/react and the react/angular peers stay
 * external. A bundler resolving the aliases is what makes the alias approach
 * production-ready — neither tsc nor babel rewrite aliases in emitted output.
 */
export default defineConfig({
  resolve: { alias: aliases },
  build: {
    outDir: 'es',
    emptyOutDir: true,
    target: 'es2019',
    minify: false,
    sourcemap: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'react/index': resolve(__dirname, 'src/react/index.ts'),
        'ssr/index': resolve(__dirname, 'src/ssr/index.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: (id: string) => isExternal(id),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    }
  }
  // NOTE: declaration (.d.ts) emission is not wired into this multi-entry build.
  // Single-entry `vite-plugin-dts` `bundleTypes` produces a clean self-contained
  // es/index.d.ts, but multi-entry bundleTypes cross-wires the per-entry outputs
  // (an api-extractor + widened-rootDir interaction). Tracked follow-up: emit a
  // self-contained types tree via `tsc` (rootDir=packages) + `tsc-alias`, or run
  // api-extractor per entry. See README. The runtime bundle is fully typed at
  // the source; consumers currently get untyped (any) imports.
})
