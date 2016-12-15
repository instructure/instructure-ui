const path = require('path')

const ROOT_PATH = process.cwd()
const BUILD_PATH = path.join(ROOT_PATH, '__build__')
const SRC_PATH = path.join(ROOT_PATH, 'lib')

module.exports = {
  polyfills: [
    'es6.array.find',
    'es6.array.find-index',
    'es6.symbol'
  ],

  generateScopedName: function ({ env }) { // for css modules class names
    return (env === 'production' || env === 'transpile') ? '[hash:base64:7]' : '[folder]__[local]'
  },

  generateComponentName: function (filepath) { // for component names in build output and docs
    const parts = path.dirname(filepath).split(path.sep)
    return parts[parts.length - 1]
  },

  generateThemeName: function (filepath) {
    const parts = path.dirname(filepath).split(path.sep)
    return parts[parts.length - 1]
  },

  files: {
    logo: path.join(ROOT_PATH, 'logo.png'),
    components: path.join(SRC_PATH, 'components/*/index.js'), // only top level components
    themes: path.join(SRC_PATH, 'themes/*/index.js'),
    docs: path.join(ROOT_PATH, 'docs/*.md')
  },

  paths: {
    root: ROOT_PATH,
    src: {
      root: SRC_PATH,
      docs: path.join(ROOT_PATH, 'docs/app')
    },
    build: {
      root: BUILD_PATH,
      dist: path.join(BUILD_PATH, '/dist'),
      docs: path.join(BUILD_PATH, '/docs')
    }
  }
}
