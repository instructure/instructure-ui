const { paths } = require('../util/loadConfig')

module.exports = function (env, debug) {
  const debugMode = debug || (env === 'development')

  return {
    debug: debugMode,
    options: {
      context: paths.root, // required for css-loader
      eslint: {
        failOnWarning: !debugMode,
        emitError: true,
        failOnError: !debugMode,
        fix: false,
        quiet: false
      }
    }
  }
}
