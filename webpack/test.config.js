module.exports = function (debug) {
  return {
    cache: !debug,
    bail: !debug,
    resolve: require('./config/resolve'),
    resolveLoader: require('./config/resolveLoader'),
    plugins: require('./config/plugins')('test', false, debug),
    module: require('./config/module')('test', debug),
    performance: {
      hints: false
    }
  }
}
