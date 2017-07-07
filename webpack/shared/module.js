const { join } = require('path')

const {
  generateScopedName
} = require(join(process.cwd(), 'themeable.config.js')) // eslint-disable-line import/no-dynamic-require

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: true,
    cacheDirectory: !debug ? false : '.babel-cache'
  }
}

// TODO: remove webpack/plugins once plugin is in node_modules
const externalExcludes = [ /node_modules/, /webpack\/plugins/ ]

module.exports = {
  rules: [
    {
      enforce: 'pre',
      test: /\.js?$/,
      exclude: externalExcludes,
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
      exclude: externalExcludes,
      use: [ babelLoader ]
    },
    {
      test: /\.png$/,
      loader: 'url-loader'
    },
    {
      test: /\.css$/,
      exclude: externalExcludes,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: !debug ? false : '.babel-cache'
          }
        },
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
