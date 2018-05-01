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

const loaderUtils = require('loader-utils')
const globby = require('globby')
const path = require('path')

const getOptions = require('../utils/getOptions')
const getPathInfo = require('../utils/getPathInfo')

module.exports = function DocsLoader () {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const loaderOptions = loaderUtils.getOptions(this) || {}
  const options = getOptions(loaderOptions)

  const processFile = (filepath) => {
    return `require('!!${require.resolve('./docgen-loader')}?${JSON.stringify(loaderOptions)}!${filepath}')`
  }

  const themes = parseThemes(options.themes, options)
  const icons = parseIcons(options.icons)

  const files = options.files.map(file => path.resolve(options.projectRoot, file))
  // eslint-disable-next-line no-undefined
  const ignore = options.ignore ? options.ignore.map(file => path.resolve(options.projectRoot, file)) : undefined

  globby(files, { ignore }).then((matches) => {
    const docs = matches.map((filepath) => processFile(path.resolve(options.context, filepath)))

    callback(null, `
      // Activate hot module replacement
      module.hot && module.hot.accept()

      const renderClient = require('!!${require.resolve('@instructure/ui-docs-client')}').default
      const getClientProps = require('!!${require.resolve('../utils/getClientProps')}')

      const props = getClientProps(
        [
          ${docs.join(',')}
        ],
        [${themes.join(',')}],
        ${JSON.stringify(options.library || {})}
      )

      props.icons = ${icons}

      renderClient(props, document.getElementById('app'))
    `)
  }).catch((error) => {
    callback(error)
  })
}

function parseThemes (themes = [], options) {
  return themes.map((theme) => {
    const themePath = path.resolve(options.projectRoot, theme)
    const pathInfo = getPathInfo(themePath, options, options.context)
    return `{
        resource: require('${path.resolve(options.context, themePath)}').default,
        requirePath: '${pathInfo.requirePath}'
      }`
  })
}

function parseIcons (icons = {}) {
  const formats = Object.keys(icons.formats).map((format) => {
    return `\
'icons-${format.toLowerCase()}': {
  format: '${format}',
  glyphs: require('${icons.formats[format]}'),
  requirePath: '${icons.formats[format]}'
}`
  })

  return `
  {
    packageName: '${icons.packageName}',
    formats: {
      ${formats.join(',\n')}
    }
  }`
}
