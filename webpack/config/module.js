const { generateScopedName } = require('../util/loadConfig')

module.exports = function (env, debug) {
  const isProduction = env === 'production'

  const cssLoaderQuery = {
    modules: true,
    importLoaders: 1,
    localIdentName: (typeof generateScopedName === 'function') && generateScopedName({
      env: !debug ? 'production' : env
    }),
    minimize: isProduction,
    discardComments: true,
    discardEmpty: true,
    discardUnused: true
  }

  return {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        use: 'eslint-loader',
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          query: {
            babelrc: true,
            cacheDirectory: isProduction ? false : '.babel-cache'
          }
        }],
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.md$/,
        use: [ 'html-loader', 'markdown-loader' ],
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          query: {
            mimetype: 'image/png'
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file'
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /docs\/app\//
        ],
        use: [
          'babel-loader',
          'themeable-css-loader',
          { loader: 'css-loader', query: cssLoaderQuery },
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
          { loader: 'css-loader', query: cssLoaderQuery },
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
}
