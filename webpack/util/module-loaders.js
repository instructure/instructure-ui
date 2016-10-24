/* eslint no-var: 0 */
'use strict'

var config = require('./config')

module.exports = function (env) {
  var cssLoader = 'css?modules&importLoaders=1&localIdentName=' + [
    config.library.prefix,
    config.library.version,
    '[folder]__[local]'
  ].join('-')

  if (env === 'production') {
    cssLoader = cssLoader + '&minify'
  }

  return {
    preLoaders: [
      {
        test: /\.js?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        loader: 'html!markdown',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        loader: 'url?mimetype=image/png'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.css$/,
        exclude: [
          /node_modules/,
          /docs\/app\//
        ],
        loader: 'component-style!' + cssLoader + '!postcss'
      },
      {
        test: /\.css$/,
        include: [
          /docs\/app\//
        ],
        loader: 'style!' + cssLoader + '!postcss?pack=docs'
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css'
      }
    ]
  }
}
