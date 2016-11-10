const { generateScopedName } = require('./themeable-css-transform')

module.exports = function (env) {
  let cssLoader = 'css?modules&importLoaders=1&localIdentName=' + generateScopedName(env)

  if (env === 'production') {
    cssLoader = cssLoader + '&minify'
  }

  cssLoader = cssLoader + '!postcss'

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
        loader: 'babel!themeable-component-style!' + cssLoader
      },
      {
        test: /\.css$/,
        include: [
          /docs\/app\//
        ],
        loader: 'style!' + cssLoader
      },
      {
        test: /\.css$/,
        include: [
          /node_modules/
        ],
        loader: 'style!css'
      }
    ]
  }
}
