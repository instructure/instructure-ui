const { paths } = require('../util/loadConfig')

module.exports = function (env, ciMode) {
  const failOnError = (ciMode || env === 'production')

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
