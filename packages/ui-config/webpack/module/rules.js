const path = require('path')
const { generateScopedName } = require('../../themeable')
const { loadConfig, BABELRC } = require('../../index')

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    babelrc: false,
    cacheDirectory: !debug ? false : '.babel-cache',
    presets: [loadConfig(BABELRC)]
  }
}

const excludeFiles = [/node_modules/, /lib/]

module.exports = [
  {
    enforce: 'pre',
    test: /\.js?$/,
    exclude: [/node_modules/, /lib/],
    loader: 'eslint-loader',
    options: {
      failOnWarning: !debug,
      emitError: !debug,
      emitWarning: debug,
      failOnError: !debug,
      fix: false,
      quiet: false,
      ignorePath: path.join(process.cwd(), '.eslintignore')
    }
  },
  {
    test: /\.js$/,
    exclude: [/node_modules/, /lib/],
    use: [babelLoader]
  },
  {
    test: /\.css$/,
    exclude: [/node_modules/, /lib/],
    use: [
      babelLoader,
      'themeable-css-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName:
            typeof generateScopedName === 'function' &&
            generateScopedName({
              env: !debug ? 'production' : env
            }),
          minimize: env === 'production',
          discardComments: true,
          discardEmpty: true,
          discardUnused: true
        }
      },
      {
        loader: 'postcss-loader'
      }
    ]
  },
  {
    test: /\.png$/,
    loader: 'url-loader'
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline-loader'
  }
]
