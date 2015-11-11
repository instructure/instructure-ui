/* eslint no-var: 0 */

var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (env) {
  var cssLoader = 'css?modules&importLoaders=1&localIdentName=ic-[name]__[local]!postcss'
  var loaders = []
  var plugins = []

  if (env !== 'test') {
    loaders.push(
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          cssLoader
        )
      }
    )
    plugins.push(
      new ExtractTextPlugin('[name].css', { allChunks: true })
    )
  } else {
    loaders.push(
      {
        test: /\.css$/,
        loader: 'style!' + cssLoader
      }
    )
  }

  return {
    module: {
      preLoaders: [
        {
          test: /\.js?$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
      ],
      loaders: loaders.concat([
        {
          test: /\.js$/,
          loader: 'babel',
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
      ])
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

    plugins: plugins
  }
}
