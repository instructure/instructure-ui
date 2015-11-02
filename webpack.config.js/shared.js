/* eslint no-var: 0 */

var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
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
        exclude: /node_modules/,
        loader: 'babel?optional=runtime&stage=2'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=ic-[name]__[local]!postcss'
        )
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
  },

  resolve: {
    modulesDirectories: [ 'components', 'node_modules' ]
  },

  postcss: [
    // Plugins seem to be first in last out
    // https://github.com/postcss/postcss#plugins
    require('webpack-postcss-tools').prependTildesToImports,

    require('autoprefixer')({ browsers: ['last 2 versions'] }),

    require('postcss-discard-comments')(),

    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-simple-vars')(),
    require('postcss-color-function')(),

    require('postcss-calc')(),

    require('postcss-url')({
      url: 'inline'
    })
  ],

  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true })
  ]
}
