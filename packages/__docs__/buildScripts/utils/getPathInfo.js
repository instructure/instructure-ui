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

module.exports = function getPathInfo(resourcePath, projectRoot, library) {
  return {
    relativePath: path.relative(projectRoot, resourcePath),
    extension: path.extname(resourcePath),
    srcPath: relativePath(resourcePath, projectRoot),
    srcUrl: srcUrl(resourcePath, projectRoot, library),
    packageName: packageName(resourcePath, projectRoot, library),
    requirePath: requirePath(resourcePath, projectRoot, library),
    requireStr: `require('${resourcePath}').default`,
    esPath: esPath(resourcePath, projectRoot, library)
  }
}

function pathParts(resourcePath, library = {}) {
  let parts = resourcePath
    .split(path.sep)
    .filter((part) => part !== library.packages && part !== 'index.js')
  if (library.scope) {
    parts = [library.scope].concat(parts)
  }
  if (!library.packages) {
    parts = [library.name].concat(parts)
  }
  return parts
}

function relativePath(resourcePath, projectRoot) {
  return path.relative(projectRoot || process.cwd(), resourcePath)
}

function srcUrl(resourcePath, projectRoot, library) {
  const path = relativePath(resourcePath, projectRoot)
  return `${library.repository.replace('.git', '')}/tree/master/${path}`
}

function requirePath(resourcePath, projectRoot, library) {
  return pathParts(
    relativePath(resourcePath, projectRoot).replace('/src/', '/lib/'),
    library
  )
    .join(path.sep)
    .replace(path.extname(resourcePath), '')
}

function esPath(resourcePath, projectRoot, library) {
  return pathParts(
    relativePath(resourcePath, projectRoot).replace('/src/', '/es/'),
    library
  )
    .join(path.sep)
    .replace(path.extname(resourcePath), '')
}

function packageName(resourcePath, projectRoot, library) {
  const parts = requirePath(resourcePath, projectRoot, library).split(path.sep)
  if (library.scope) {
    return parts.slice(0, 2).join(path.sep)
  } else {
    return parts[0]
  }
}
