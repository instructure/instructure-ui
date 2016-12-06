const { paths } = require('../util/loadConfig')

module.exports = function (env, debug) {
  const failOnError = (!debug || env === 'production')

  return {
    debug: failOnError,
    options: {
      context: paths.root, // required for css-loader
      eslint: {
        emitError: true,
        failOnError
      }
    }
  }
}
