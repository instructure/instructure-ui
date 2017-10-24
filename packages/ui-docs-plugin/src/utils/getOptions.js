const path = require('path')
const loadConfig = require('@instructure/ui-presets')

module.exports = function (pluginOptions = {}) {
  const options = Object.assign({}, loadConfig('docs'), pluginOptions)

  const context = options.context || process.cwd()
  const projectRoot = options.projectRoot || process.cwd()

  const defaultOptions = {
    context, // for webpack requires
    title: 'Documentation',
    files: [ path.resolve(projectRoot, '**/*.md') ],
    themes: [],
    library: {},
    document: {},
    projectRoot, // to determine src paths
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
    template: path.resolve(__dirname, '../../index.ejs')
  }

  return Object.assign({}, defaultOptions, options)
}
