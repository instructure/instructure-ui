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
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, readdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const tokensDir = join(__dirname, '..', 'tokensStudio')

// Nested object mirroring the tokensStudio/ directory structure
export const themeTokens = {}

// Deviation from the vendored upstream source: the original uses `glob` to
// enumerate tokensStudio/**/*.json. Since this copy is consumed via a local
// `link:` dependency (not a normal package install), pnpm doesn't install
// its declared dependencies, so `glob` isn't resolvable at runtime here. The
// repo requires Node >=22.18 (see package.json engines), which has built-in
// recursive readdir, so this vendored copy drops the `glob` dependency
// entirely rather than trying to vendor it too. See README-VENDORED.md.
const jsonFiles = readdirSync(tokensDir, { recursive: true }).filter((p) =>
  p.endsWith('.json')
)

for (const filePath of jsonFiles) {
  const tokens = JSON.parse(readFileSync(join(tokensDir, filePath), 'utf8'))
  // e.g. 'canvas/semantic/color/canvas.json' -> ['canvas', 'semantic', 'color', 'canvas']
  const keys = filePath.replace(/\.json$/, '').split('/')

  let node = themeTokens
  for (const key of keys.slice(0, -1)) {
    node[key] ??= {}
    node = node[key]
  }
  node[keys.at(-1)] = tokens
}
