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
  [require('postcss-input-range')], // for RangeInput
  [require('postcss-mixins')], // for Grid
  [require('postcss-simple-vars')] // for Grid
]

const CORE_PLUGINS_POST = [
  [require('postcss-bidirection'), {
    buildSelector: function (selector, direction) {
      return `[dir="${direction}"] ${selector}`
    }
  }],
  [require('autoprefixer'), { overrideBrowserslist: loadConfig('browserslist', require('@instructure/canvas-supported-browsers')) }],
  [require('postcss-initial')],
  [require('postcss-reporter'), { clearReportedMessages: true }]
]

// For production builds we need to minify css with postcss here, we can't rely on babel/uglify to
// minify the css part of our js bundles because by the time they see it is just a string.
if ((process.env.BABEL_ENV || process.env.NODE_ENV) === 'production') {
  // we can't just use all of cssnano because there are some things it does that won't work for us,
  // so we filter them out.
  const minificationPlugins = require('cssnano-preset-default')({
    svgo: {'doesn\'t work': true}, // only has an async api and the css modules require hook needs everything to have a sync api
    convertValues: {'doesn\'t work': true}, // needs postcss 7+, when css-modules-require-hook uses 7.x, it should work
    mergeLonghand: {'doesn\'t work': true} // needs postcss 7+, when css-modules-require-hook uses 7.x, it should work
  }).plugins.filter(([_, pluginOpts = {}]) => !pluginOpts['doesn\'t work'])

  CORE_PLUGINS_POST.push(...minificationPlugins)
}

module.exports = function (opts = { before: {}, after: {}, nesting: false }) {
  return function (ctx = {}) {
    let plugins = [
      ...CORE_PLUGINS_PRE,
      opts.nesting ? [require('postcss-nesting')] : [require('postcss-nested')],
      ...CORE_PLUGINS_POST
    ]

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
      plugins: plugins
        .map((plugin) => (typeof plugin[0] === 'string') ? require(plugin[0])(plugin[1]) : plugin[0](plugin[1]))
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
