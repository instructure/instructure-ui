/* eslint no-var: 0 */
'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var merge = require('webpack-merge')
var opts = require('../util/config')

var CSS_LOADER = 'css?modules&importLoaders=1&localIdentName=' + opts.library.prefix + '[name]__[local]!postcss'

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
          include: /node_modules/,
          loader: ExtractTextPlugin.extract('style', 'css')
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'style',
            CSS_LOADER
          )
        }
      ]
    })
  } else {
    config = merge(config, {
      loaders: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: 'style!' + CSS_LOADER
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
