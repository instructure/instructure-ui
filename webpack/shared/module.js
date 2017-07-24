const { generateScopedName } = require('../../themeable.config.js')

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: true,
    cacheDirectory: !debug ? false : '.babel-cache'
  }
}

module.exports = {
  rules: [
    {
      enforce: 'pre',
      test: /\.js?$/,
      exclude: [ /node_modules/ ],
      loader: 'eslint-loader',
      options: {
        failOnWarning: !debug,
        emitError: true,
        failOnError: !debug,
        fix: false,
        quiet: false
      }
    },
    {
      test: /\.js$/,
      exclude: [ /node_modules/ ],
      use: [ babelLoader ]
    },
    {
      test: /\.png$/,
      loader: 'url-loader'
    },
    {
      test: /\.css$/,
      exclude: [ /node_modules/ ],
      use: [
        babelLoader,
        'themeable-css-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: (typeof generateScopedName === 'function') && generateScopedName({
              env: !debug ? 'production' : env
            }),
            minimize: !debug,
            discardComments: true,
            discardEmpty: true,
            discardUnused: true
          }
        },
        'postcss-loader'
      ]
    }
  ]
}
