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

module.exports = function DocsLoader() {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const loaderOptions = loaderUtils.getOptions(this) || {}
  const options = getOptions(loaderOptions)

  // TODO rewrite this as a simple require!
  const processFile = (filepath) => {
    return `require('!!${require.resolve('./docgen-loader')}?${JSON.stringify(
      loaderOptions
    )}!${filepath}')`
  }

  const themes = parseThemes(options.themes, options)
  const icons = parseIcons(options.icons)

  const files = options.files.map((file) =>
    path.resolve(options.projectRoot, file)
  )

  const ignore = options.ignore
    ? options.ignore.map((file) => path.resolve(options.projectRoot, file))
    : undefined

  const showMenu = options.showMenu ? 'true' : 'false'

  globby(files, { ignore })
    .then((matches) => {
      const docs = matches.map((filepath) =>
        processFile(path.resolve(options.context, filepath))
      )

      callback(
        null,
        `
      // Activate hot module replacement
      module.hot && module.hot.accept()

      const renderDocsClient = require('@instructure/ui-docs-client').renderDocsClient
      const getClientProps = require('!!${require.resolve(
        '../utils/getClientProps'
      )}')

      const props = getClientProps(
        [
          ${docs.join(',')}
        ],
        [${themes.join(',')}],
        ${JSON.stringify(options.library || {})}
      )

      props.icons = ${icons}

      props.showMenu = ${showMenu}

      renderDocsClient(props, document.getElementById('app'))
    `
      )
    })
    .catch((error) => {
      callback(error)
    })
}

function parseThemes(themes = [], options) {
  return themes.map((theme) => {
    return `{
        resource: require('${theme}').theme,
        requirePath: '${theme}'
      }`
  })
}

function parseIcons(icons = {}) {
  const formats = Object.keys(icons.formats || []).map((format) => {
    const requirePath = icons.formats[format]
    const packageName = icons.packageName
    return `\
'icons-${format.toLowerCase()}': {
  format: '${format}',
  glyphs: require('${requirePath}'),
  packageName: '${packageName}',
  requirePath: '${requirePath}'
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
