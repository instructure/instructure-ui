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

module.exports = function getPathInfo (resourcePath, options, context) {
  return {
    relativePath: path.relative(options.projectRoot, resourcePath),
    extension: path.extname(resourcePath),
    srcPath: srcPath(resourcePath, options, context),
    srcUrl: srcUrl(resourcePath, options, context),
    packageName: packageName(resourcePath, options, context),
    requirePath: requirePath(resourcePath, options, context),
    requireStr: `require('${resourcePath}').default`,
    esPath: esPath(resourcePath, options, context)
  }
}

function pathParts (resourcePath, library = {}) {
  let parts = resourcePath.split(path.sep).filter((part) => part !== library.packages && part !== 'index.js')
  if (library.scope) {
    parts = [library.scope].concat(parts)
  }
  if (!library.packages) {
    parts = [library.name].concat(parts)
  }
  return parts
}

function relativePath (resourcePath, options) {
  return path.relative(options.projectRoot || process.cwd(), resourcePath)
}

function srcPath (resourcePath, options, context) {
  const { srcPath } = options.document
  if (typeof srcPath === 'function') {
    return srcPath(resourcePath, context)
  } else {
    return relativePath(resourcePath, options)
  }
}

function srcUrl (resourcePath, options, context) {
  const { srcUrl } = options.document
  if (typeof srcUrl === 'function') {
    return srcUrl(resourcePath, context)
  } else {
    const path = srcPath(resourcePath, options, context)
    const library = options.library || {}
    return library.repository ? `${library.repository.replace('.git', '')}/tree/master/${path}` : null
  }
}

function requirePath (resourcePath, options, context) {
  const { requirePath } = options.document
  if (typeof requirePath === 'function') {
    return requirePath(resourcePath, context)
  } else {
    return pathParts(relativePath(resourcePath, options).replace('/src/', '/lib/'), options.library)
      .join(path.sep).replace(path.extname(resourcePath), '')
  }
}

function esPath (resourcePath, options, context) {
  const { esPath } = options.document
  if (typeof esPath === 'function') {
    return esPath(resourcePath, context)
  } else {
    return pathParts(relativePath(resourcePath, options).replace('/src/', '/es/'), options.library)
      .join(path.sep).replace(path.extname(resourcePath), '')
  }
}

function packageName (resourcePath, options, context) {
  const parts = requirePath(resourcePath, options, context).split(path.sep)

  if (options.library.scope) {
    return parts.slice(0, 2).join(path.sep)
  } else {
    return parts[0]
  }
}
