const path = require('path')
const pkg = require('./package.json')

module.exports = {
  generateScopedName: function ({ env }) { // for css modules class names
    return (env === 'production') ? '[hash:base64:7]' : '[folder]__[local]'
  },
  // TODO: the following would be options to the webpack plugin
  title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
  favicon: path.join(__dirname, 'logo.png'),
  library: {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    repository: pkg.repository.url,
    homepage: pkg.homepage,
    author: pkg.author,
    output: path.join(__dirname, 'lib')
  },
  files: {
    // TODO: consolidate docs loader into a single loader and change this to an array of paths/patterns
    components: path.join(__dirname, 'lib/components/*/index.js'), // only top level components
    docs: path.join(__dirname, 'docs/*.md')
  },
  entryName: 'docs'
  // TODO: add option for additional chunks to include in the html template?
}
