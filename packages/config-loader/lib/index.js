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
const fs = require('fs')

module.exports = function loadConfig(name, defaults, ctx) {
  // eslint-disable-next-line no-param-reassign
  ctx = ctx || {
    env: process.env.NODE_ENV || 'development',
    cwd: process.cwd()
  }

  const config = findConfig(
    name,
    path.resolve(ctx.cwd).split(path.sep),
    defaults
  )

  if (typeof config === 'function') {
    return config(ctx)
  } else {
    return config
  }
}

function findConfig(name, parts, defaults) {
  if (!parts) return {}

  const filenames = [
    `${name}.json`,
    `${name}rc.js`,
    `${name}.config.js`,
    `.${name}rc`
  ]

  while (filenames.length) {
    const rcFilePath = resolvePath(parts, filenames.shift())

    if (fs.existsSync(rcFilePath)) {
      return loadConfigFile(rcFilePath)
    }
  }

  const pkgJSONPath = resolvePath(parts, 'package.json')

  if (fs.existsSync(pkgJSONPath)) {
    const pkgJSON = requireNoCache(pkgJSONPath)

    if (pkgJSON[name]) {
      return pkgJSON[name]
    }
  }

  if (parts.pop()) {
    return findConfig(name, parts, defaults)
  } else {
    return defaults || {}
  }
}

function resolvePath(parts, filename) {
  return path.resolve(parts.join(path.sep) + path.sep, filename)
}

function loadConfigFile(filePath) {
  try {
    return requireNoCache(filePath)
  } catch (e) {
    e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`
    throw e
  }
}

function invalidateRequireCacheForFile(filepath) {
  delete require.cache[require.resolve(filepath)]
}

function requireNoCache(filepath) {
  invalidateRequireCacheForFile(filepath)
  return require(filepath)
}
