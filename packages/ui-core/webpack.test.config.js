const path = require('path')

const debug = Boolean(process.env.DEBUG) || process.env.NODE_ENV === 'development'

module.exports = {
  cache: debug,
  bail: !debug,
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  plugins: require('@instructure/ui-config/webpack/plugins'),
  resolveLoader: require('@instructure/ui-config/webpack/resolveLoader'),
  module: {
    rules: require('@instructure/ui-config/webpack/module/rules')
  },
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
}
