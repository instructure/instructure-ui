const loaderUtils = require('loader-utils')
const globby = require('globby')
const path = require('path')

const getOptions = require('../utils/getOptions')
const parseResourcePath = require('../utils/parseResourcePath')

module.exports = function DocsLoader () {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const context = this.context || process.cwd()
  const options = getOptions(loaderUtils.getOptions(this))

  const processFile = (filepath) => {
    return `require('!!${require.resolve('./docgen-loader')}?${JSON.stringify(options)}!${filepath}')`
  }

  const themes = (options.themes || [])
    .map((theme) => {
      const themePath = path.resolve(options.projectRoot, theme)
      return `{
        resource: require('${path.resolve(options.context, themePath)}').default,
        requirePath: '${parseResourcePath(themePath, options, context).requirePath}'
      }`
    })

  const files = options.files.map(file => path.resolve(options.projectRoot, file))
  const ignore = options.ignore ? options.ignore.map(file => path.resolve(options.projectRoot, file)) : undefined

  globby(files, { ignore }).then((matches) => {
    const docs = matches.map((filepath) => processFile(path.resolve(options.context, filepath)))

    callback(null, `
      // Activate hot module replacement
      module.hot && module.hot.accept()

      const renderClient = require('!!${require.resolve('@instructure/ui-docs-client')}').default
      const parseDocs = require('!!${require.resolve('../utils/parseDocs')}')
      const parseThemes = require('!!${require.resolve('../utils/parseThemes')}')

      const props = parseDocs(
        [${docs.join(',')}],
        ${processFile(path.resolve(options.projectRoot, 'README.md'))},
        ${processFile(path.resolve(options.projectRoot, 'CHANGELOG.md'))}
      )

      props.themes = parseThemes([${themes.join(',')}])

      props.library = ${JSON.stringify(options.library || {})}

      renderClient(props, document.getElementById('app'))
    `)
  }).catch((error) => {
    callback(error)
  })
}
