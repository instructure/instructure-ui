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
import { readFileSync } from 'fs'
import { globSync } from 'glob'

const __dirname = dirname(fileURLToPath(import.meta.url))

const tokensDir = join(__dirname, '..', 'tokensStudio')

// Nested object mirroring the tokensStudio/ directory structure
export const themeTokens = {}

for (const filePath of globSync('**/*.json', { cwd: tokensDir })) {
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
