/* eslint no-var: 0 */
'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var multi = require('multi-loader')
var merge = require('webpack-merge')
var opts = require('../util/config')

var cssPrefix = [
  opts.library.prefix,
  opts.library.version,
  '[name]__[local]'
].join('-')

var CSS_LOADER = 'css?modules&importLoaders=1&localIdentName=' + cssPrefix + '!postcss'

module.exports = function (env) {
  var config = {
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
        test: /\.gif$/,
        loader: 'url?mimetype=image/gif'
      },
      {
        test: /\.jpe?g$/,
        loader: 'url?mimetype=image/jpeg'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  }

  if (env === 'production' || env === 'build') {
    config = merge(config, {
      loaders: [
        {
          test: /\.css$/,
          exclude: [
            /node_modules/,
            /\/theme\//
          ],
          loader: ExtractTextPlugin.extract('style', CSS_LOADER)
        },
        {
          test: /\.css$/,
          include: /\/theme\//,
          exclude: /node_modules/,
          loader: multi(
            ExtractTextPlugin.extract('style', CSS_LOADER + '?pack=extractTheme'),
            'to-string!' + CSS_LOADER
          )
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract('style', 'css')
        }
      ]
    })
  } else {
    config = merge(config, {
      loaders: [
        {
          test: /\.css$/,
          exclude: [
            /node_modules/,
            /\/theme\//
          ],
          loader: 'style!' + CSS_LOADER
        },
        {
          test: /\.css$/,
          include: /\/theme\//,
          exclude: /node_modules/,
          loader: CSS_LOADER
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: 'style!css'
        }
      ]
    })
  }

  return config
}
