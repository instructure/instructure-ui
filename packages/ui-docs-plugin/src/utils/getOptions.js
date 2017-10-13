const path = require('path')
const loadConfig = require('@instructure/ui-presets')

module.exports = function () {
  const projectRoot = process.cwd()

  // TODO: validate options

  return loadConfig('docs', {
    title: 'Documentation',
    files: [],
    library: {},
    projectRoot,
    ignore: [
      path.resolve(projectRoot, '**/node_modules/**'),
      path.resolve(projectRoot, '**/bower_components/**'),
      path.resolve(projectRoot, 'flow-typed/**'),
      path.resolve(projectRoot, 'coverage/**'),
      path.resolve(projectRoot, '{tmp,temp}/**'),
      path.resolve(projectRoot, '**/*.min.js'),
      path.resolve(projectRoot, '**/bundle.js'),
      path.resolve(projectRoot, 'fixture{-*,}.{js,jsx}'),
      path.resolve(projectRoot, 'fixture{s,}/**'),
      path.resolve(projectRoot, '{test,tests,spec,__tests__}/fixture{s,}/**'),
      path.resolve(projectRoot, 'vendor/**'),
      path.resolve(projectRoot, 'dist/**')
    ],
    template: path.resolve(__dirname, 'index.tmpl.html'),
    identifier: (resourcePath, matter, context) => {
      if (matter.data.id) {
        return matter.data.id
      } else if (resourcePath.includes('/index.js') || resourcePath.includes('README.md')) {
        return '[folder]'
      } else {
        return '[name]'
      }
    }
  })
}
