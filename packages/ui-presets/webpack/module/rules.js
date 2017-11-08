const path = require('path')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

module.exports = [
  {
    enforce: 'pre',
    test: /\.js?$/,
    exclude: [/node_modules/, /lib/, /es/],
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
    use: ['happypack/loader?id=js']
  },
  {
    test: /\.css$/,
    exclude: [/node_modules/, /lib/],
    use: [
      'happypack/loader?id=js',
      'themeable-css-loader',
      'happypack/loader?id=css'
    ]
  },
  {
    test: /\.png$/,
    loader: 'url-loader'
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline-loader',
    options: {
      removeSVGTagAttrs: false
    }
  }
]
