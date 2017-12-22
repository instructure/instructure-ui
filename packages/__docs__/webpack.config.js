const path = require('path')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const outputPath = path.resolve(__dirname, '__build__')

module.exports = {
  cache: DEBUG,
  bail: !DEBUG,
  entry: {
    common: [
      '../ui-polyfill-loader!',
      'react',
      'react-dom'
    ],
    'instructure-ui': [
      '@instructure/ui-core',
      '@instructure/ui-svg-images',
      '@instructure/ui-themes',
      '@instructure/ui-themeable',
      '@instructure/ui-utils'
    ],
    globals: './globals' // for codepen
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: outputPath,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  plugins: require('./plugins'),
  resolve: {
    alias: {
      // set up aliases to get webpack to rebuild when we make changes to these packages
      '@instructure/ui-core$': path.resolve(__dirname, '../ui-core/src/'),
      '@instructure/ui-svg-images$': path.resolve(__dirname, '../ui-svg-images/src/'),
      '@instructure/ui-utils$': path.resolve(__dirname, '../ui-utils/src/'),
      '@instructure/ui-themes$': path.resolve(__dirname, '../ui-themes/src/'),
      '@instructure/ui-themeable$': path.resolve(__dirname, '../ui-themeable/src/'),

      '@instructure/ui-core/lib': path.resolve(__dirname, '../ui-core/src'),
      '@instructure/ui-svg-images/lib': path.resolve(__dirname, '../ui-svg-images/src'),
      '@instructure/ui-utils/lib': path.resolve(__dirname, '../ui-utils/src'),
      '@instructure/ui-themes/lib': path.resolve(__dirname, '../ui-themes/src'),
      '@instructure/ui-themeable/lib': path.resolve(__dirname, '../ui-themeable/src')
    }
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
