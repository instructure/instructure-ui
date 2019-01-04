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
const postcss = require('postcss')

const loadConfig = require('@instructure/config-loader')

const generateComponentId = require('@instructure/babel-plugin-themeable-styles/generateComponentId')
const transformCSSRequire = require('@instructure/babel-plugin-themeable-styles/transform')
const getScopedNameGenerator = require('@instructure/babel-plugin-themeable-styles/getScopedNameGenerator')

const themeableConfig = loadConfig('themeable')
const postCSSConfig = loadConfig('postcss', require('@instructure/ui-postcss-config')())

module.exports = function (source, map) {
  this.cacheable && this.cacheable()

  const loader = this
  const callback = loader.async()
  const filePath = loader.resourcePath
  const relativePath = path.relative(process.cwd(), filePath)

  const opts = {
    from: filePath,
    to: filePath,
    map: {
      inline: false, // inline sourcemaps will break the js templates
      annotation: false
    }
  }

  if (map && map.mappings) {
    opts.map.prev = map
  }

  const componentId = generateComponentId(source)

  let locals

  Promise.resolve().then(() => {
    return postcss([
      require('stylelint'),
      require('postcss-reporter'),
      require('postcss-browser-reporter')
    ])
    .process(source.toString(), opts)
    .then((result) => {
      result.warnings().forEach((msg) => {
        loader.emitWarning(msg.toString())
      })

      return postcss([
        ...(postCSSConfig.plugins || []),
        require('@instructure/postcss-themeable-styles'),
        require('postcss-modules')({
          generateScopedName: (name, filepath, css) => {
            return getScopedNameGenerator(themeableConfig, componentId, name, filepath, css)
          },
          getJSON: (cssFileName, json, outputFileName) => {
            locals = json
          }
        }),
        require('postcss-browser-reporter')
      ])
      .process(source.toString(), opts)
      .then((result) => {
        result.warnings().forEach((msg) => {
          loader.emitWarning(msg.toString())
        })

        // eslint-disable-next-line no-console
        console.log(`[themeable-css-loader]: ${relativePath}`)

        callback(
          null,
          `module.exports = ${transformCSSRequire(locals, result.css, componentId)}`,
          result.map ? result.map.toJSON() : null
        )
      })
    })
  }).catch((error) => {
    callback(error)
  })
}
