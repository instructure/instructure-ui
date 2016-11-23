module.exports = function (ciMode) {
  return {
    cache: false,
    bail: ciMode,
    resolve: require('./config/resolve'),
    resolveLoader: require('./config/resolveLoader'),
    plugins: require('./config/plugins')('test', false, ciMode),
    module: require('./config/module')('test', ciMode)
  }
}
