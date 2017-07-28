const debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development'

module.exports = {
  cache: debug,
  bail: !debug,
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  plugins: require('./webpack/shared/plugins'),
  resolve: require('./webpack/shared/resolve'),
  resolveLoader: require('./webpack/shared/resolveLoader'),
  module: require('./webpack/shared/module'),
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
}
