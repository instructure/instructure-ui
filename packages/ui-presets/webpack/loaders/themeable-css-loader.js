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

const transformCustomProps = require('@instructure/postcss-themeable-styles')
const transformCssRequire = require('@instructure/babel-plugin-themeable-styles/transform')
const postcss = require('postcss')

module.exports = function (source, map) {
  this.cacheable && this.cacheable()

  const loader = this
  const callback = loader.async()
  const file = loader.resourcePath

  source = this.exec(source, loader.resource) // eslint-disable-line no-param-reassign
  map = (typeof map === 'string') ? JSON.parse(map) : map  // eslint-disable-line no-param-reassign

  const opts = {
    from: file,
    to: file,
    map: {
      inline: false, // inline sourcemaps will break the js templates
      annotation: false,
      prev: (map && map.mappings) ? map : undefined
    }
  }

  Promise.resolve().then(() => {
    return postcss([transformCustomProps])
      .process(source.toString(), opts)
      .then((result) => {
        result.warnings().forEach((msg) => {
          loader.emitWarning(msg.toString())
        })
        callback(
          null,
          `module.exports = ${transformCssRequire(source.locals, result.css)}`,
          result.map ? result.map.toJSON() : null
        )
      })
  }).catch((error) => {
    callback(error)
  })
}
