const path = require('path')
const loadConfig = require('../../loadConfig')

const { generateScopedName } = loadConfig('themeable', require('../../themeable'))

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: !DEBUG ? false : '.babel-cache'
  }
}

module.exports = [
  {
    enforce: 'pre',
    test: /\.js?$/,
    exclude: [/node_modules/, /lib/],
    loader: 'eslint-loader',
    options: {
      failOnWarning: !DEBUG,
      emitError: !DEBUG,
      emitWarning: DEBUG,
      failOnError: !DEBUG,
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
              env: !DEBUG ? 'production' : ENV
            }),
          minimize: false,
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
