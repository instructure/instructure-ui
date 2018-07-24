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

const loadConfig = require('@instructure/config-loader')

const CORE_PLUGINS_PRE = [
  ['postcss-input-range'], // for RangeInput
  ['postcss-mixins'], // for Grid
  ['postcss-simple-vars'] // for Grid
]

const CORE_PLUGINS_POST = [
  ['postcss-bidirection', {
    buildSelector: function (selector, direction) {
      return `[dir="${direction}"] ${selector}`
    }
  }],
  ['autoprefixer', { browsers: loadConfig('browserslist', require('@instructure/canvas-supported-browsers')) }],
  ['postcss-initial'],
  ['postcss-reporter']
]

const DEBUG = Boolean(process.env.DEBUG)

module.exports = function (opts = { before: {}, after: {}, nesting: false }) {
  return function (ctx = {}) {
    let plugins = [
      ...CORE_PLUGINS_PRE,
      opts.nesting ? ['postcss-nesting'] : ['postcss-nested'],
      ...CORE_PLUGINS_POST
    ]

    if (DEBUG) {
      plugins = [['stylelint'], ...plugins, ['postcss-browser-reporter']]
    }

    const keys = plugins.map(plugin => plugin[0])

    if (opts.before && Array.isArray(opts.before.insert)) {
      const index = keys.indexOf(opts.before.plugin)
      if (index > -1) {
        plugins = insertPlugins(plugins, index, opts.before.insert)
      }
    }

    if (opts.after && Array.isArray(opts.after.insert)) {
      const index = keys.indexOf(opts.after.plugin)
      plugins = insertPlugins(plugins, index + 1, opts.after.insert)
    }

    return {
      plugins: plugins.map((plugin) => require(plugin[0])(plugin[1]))
    }
  }
}

function insertPlugins (plugins, index, additions) {
  let pre = []
  let post = []

  if (index >= 0) {
    pre = plugins.slice(0, index)
  }

  if (index < plugins.length) {
    post = plugins.slice(index)
  }

  return [
    ...pre,
    ...additions.map(addition => (Array.isArray(addition)) ? addition : [addition]),
    ...post
  ]
}
