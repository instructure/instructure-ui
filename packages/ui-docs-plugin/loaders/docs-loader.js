const loaderUtils = require('loader-utils')

module.exports = function DocsLoader () {
  this.cacheable()

  // TODO: consolidate into one loader for all types
  const loaders = {
    components: require.resolve('./component-loader.js'),
    docs: require.resolve('./markdown-loader.js')
  }

  const { files, library } = loaderUtils.getOptions(this)

  const resources = Object.keys(files).map((type) => {
    const loader = loaders[type]
    const query = { files: files[type], library }
    return `${type}: require('!!${loader}?${JSON.stringify(query)}!')`
  })

  const client = require.resolve('@instructure/ui-docs-client')

  return `
    // Activate hot module replacement
    module.hot && module.hot.accept()

    const renderDocsClient = require('!!${client}').default

    const data = {
      library: ${JSON.stringify(library)},
      ${resources.join(',')}
    }

    renderDocsClient(data, document.getElementById('app'))
  `
}
