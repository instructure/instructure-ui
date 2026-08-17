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

import { promises as fs } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const importDefault = async (file: string) =>
  (await import(pathToFileURL(file).href)).default

const loadTheme = async (themePath: string) => {
  const [primitives, semantics, sharedTokens] = await Promise.all([
    importDefault(path.join(themePath, 'primitives.ts')),
    importDefault(path.join(themePath, 'semantics.ts')),
    importDefault(path.join(themePath, 'sharedTokens.ts'))
  ])
  return sharedTokens(semantics(primitives))
}

const flattenObj = (obj: Record<string, any>) => {
  const result: Record<string, any> = {}

  for (const i in obj) {
    if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i])
      for (const j in temp) {
        result[i + '-' + j] = temp[j]
      }
    } else {
      result[i] = obj[i]
    }
  }
  return result
}

const buildCSSVariables = async (targetPath: string) => {
  const root = path.resolve(targetPath)
  const entries = await fs.readdir(root, { withFileTypes: true })

  const themeDirs = entries
    .filter((e) => e.isDirectory() && e.name !== 'componentTypes')
    .map((e) => e.name)

  const sharedTokensByThemes: Record<string, any> = {}

  for (const theme of themeDirs) {
    const resolved = await loadTheme(path.join(root, theme))

    const flatResult = flattenObj(resolved)
    const cssVariables = Object.keys(flatResult).reduce(
      (res, key) => `${res}--${key}:${flatResult[key]};`,
      ''
    )
    sharedTokensByThemes[theme] = cssVariables
  }

  return sharedTokensByThemes
}

export default buildCSSVariables
