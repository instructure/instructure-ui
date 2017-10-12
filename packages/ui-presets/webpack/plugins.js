const webpack = require('webpack')
const HappyPack = require('happypack')

const loadConfig = require('../loadConfig')
const { generateScopedName } = loadConfig('themeable', require('../themeable'))

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

module.exports = function plugins (options = {}) {
  const threadPool = options.threadPool || new HappyPack.ThreadPool({ size: 4 })

  let plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new HappyPack({
      id: 'js',
      threadPool,
      loaders: [{
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: !DEBUG ? false : '.babel-cache'
        }
      }],
      verbose: false
    }),
    new HappyPack({
      id: 'css',
      threadPool,
      loaders: [
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
      ],
      verbose: false
    })
  ]

  if (!DEBUG) {
    plugins = plugins.concat([
      new webpack.NoEmitOnErrorsPlugin()
    ])
  }

  return plugins
}
