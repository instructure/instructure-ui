const loaderUtils = require('loader-utils')
const globby = require('globby')
const path = require('path')

const getOptions = require('../utils/getOptions')

module.exports = function DocsLoader () {
  this.cacheable && this.cacheable()

  const callback = this.async()
  const options = getOptions()

  const processFile = (filepath) => {
    return `require('!!${require.resolve('./docgen-loader')}!${filepath}')`
  }

  globby(options.files, { ignore: options.ignore }).then((matches) => {
    const docs = matches.map((filepath) => processFile(path.resolve(process.cwd(), filepath)))

    callback(null, `
      // Activate hot module replacement
      module.hot && module.hot.accept()

      const renderDocsClient = require('!!${require.resolve('@instructure/ui-docs-client')}').default
      const parseDocs = require('!!${require.resolve('../utils/parseDocs')}')

      const props = parseDocs([${docs.join(',')}], ${processFile(path.resolve(options.projectRoot, 'README.md'))})
      props.library = ${JSON.stringify(options.library || {})}

      renderDocsClient(props, document.getElementById('app'))
    `)
  }).catch((error) => {
    callback(error)
  })
}
