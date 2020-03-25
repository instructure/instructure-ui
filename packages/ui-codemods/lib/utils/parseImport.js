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

module.exports = function parseImport(importPath) {
  let parsedImport = {}

  if (!importPath) return {}

  const splitPath = importPath.split('/')

  const parseSourceAndModule = (entries = []) => {
    if (entries.length === 0) return {}

    const lastEntry = entries[entries.length - 1]

    const moduleOffset = path.parse(lastEntry).name === 'index' ? 2 : 1

    const moduleName = entries[entries.length - moduleOffset]

    return {
      moduleName: moduleName ? path.parse(moduleName).name : undefined,
      sourcePath: entries.slice(0, entries.length - moduleOffset).join('/')
    }
  }

  if (importPath[0] === '@') {
    const [scope, name, ...rest] = splitPath

    parsedImport = {
      scope,
      name,
      fullName: `${scope}/${name}`,
      moduleName: `${scope}/${name}`,
      ...parseSourceAndModule(rest)
    }
  } else {
    const [name, ...rest] = splitPath

    parsedImport = {
      name,
      fullName: name,
      moduleName: name,
      ...parseSourceAndModule(rest)
    }
  }

  return parsedImport
}