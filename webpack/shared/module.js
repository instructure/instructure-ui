const { join } = require('path')

const {
  generateScopedName
} = require(join(process.cwd(), 'themeable.config.js')) // eslint-disable-line import/no-dynamic-require

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

const cssLoader = {
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
}

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
      test: /\.md$/,
      exclude: [ /node_modules/ ],
      use: [ 'html-loader', 'markdown-loader' ]
    },
    {
      test: /\.png$/,
      loader: 'url-loader',
      options: {
        mimetype: 'image/png'
      }
    },
    {
      test: /\.css$/,
      exclude: [
        /node_modules/,
        /docs\/app\//
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: !debug ? false : '.babel-cache'
          }
        },
        'themeable-css-loader',
        cssLoader,
        'postcss-loader'
      ]
    },
    {
      test: /\.css$/,
      include: [
        /docs\/app\//
      ],
      use: [
        'style-loader',
        cssLoader,
        'postcss-loader'
      ]
    },
    {
      test: /\.css$/,
      include: [
        /node_modules/
      ],
      use: [ 'style-loader', 'css-loader' ]
    }
  ]
}
