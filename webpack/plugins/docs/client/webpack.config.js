const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV

const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: true,
    cacheDirectory: (env === 'production') ? false : '.babel-cache'
  }
}

let plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
    DEBUG: false
  })
]

if (env === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ])
}

// TODO: remove __build__ once plugin is in node_modules
const externalExcludes = [ /node_modules/, /__build__/ ]

module.exports = {
  cache: (env !== 'production'),
  bail: (env === 'production'),
  entry: {
    index: path.join(__dirname, 'src/index.js'),
    globals: path.join(__dirname, 'src/globals.js')
  },
  output: {
    library: 'DocsApp',
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'instructure-icons$': 'invalid',
      // TODO: remove this alias when the plugin is in its own repo
      'instructure-ui': path.join(process.cwd(), '__build__')
    },
    modules: [
      process.cwd(),
      'node_modules'
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: externalExcludes,
        loader: 'eslint-loader',
        options: {
          failOnWarning: (env === 'production'),
          emitError: true,
          failOnError: (env === 'production'),
          fix: false,
          quiet: false
        }
      },
      {
        test: /\.js$/,
        exclude: externalExcludes,
        use: [ babelLoader ]
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        exclude: externalExcludes,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: (env === 'production') ? '[hash:base64:7]' : '[folder]__[local]',
              minimize: (env === 'production'),
              discardComments: true,
              discardEmpty: true,
              discardUnused: true
            }
          },
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
  },
  plugins
}
