const path = require('path')
const webpack = require('webpack')

const DocsPlugin = require('@instructure/ui-docs')

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

const pkg = require('./package.json')

const output = path.join(__dirname, '__build__')

const paths = {
  lib: path.join(output, 'lib'),
  docs: path.join(output, 'docs'),
  src: path.join(__dirname, 'lib') // TODO: change to src and transpile to lib
}

module.exports = {
  cache: debug,
  bail: !debug,
  entry: {
    common: [
      'babel-polyfill-loader!',
      'react',
      'react-dom'
    ],
    [pkg.name]: [
      path.join(paths.src, 'themes'),
      paths.src
    ]
  },
  output: {
    path: paths.docs,
    filename: '[name].js'
  },
  devServer: {
    contentBase: paths.docs,
    host: '0.0.0.0',
    port: 8080
  },
  plugins: addPlugins(require('./webpack/shared/plugins')),
  resolve: require('./webpack/shared/resolve'),
  resolveLoader: require('./webpack/shared/resolveLoader'),
  module: require('./webpack/shared/module'),
  devtool: 'cheap-module-source-map'
}

function addPlugins (basePlugins) {
  let plugins = basePlugins || []

  plugins = plugins.concat([
    new DocsPlugin({
      title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
      favicon: path.join(__dirname, 'logo.png'),
      library: {
        packageName: pkg.name,
        packageMain: pkg.main,
        name: 'InstructureUI',
        description: pkg.description,
        version: pkg.version,
        repository: pkg.repository.url,
        author: pkg.author,
        codepen: { // codpen button form data
          js_external: [
            `${pkg.homepage}common.js`,
            `${pkg.homepage}${pkg.name}.js`,
            `${pkg.homepage}globals.js`
          ]
        }
      },
      globals: { // for component playground and codepen examples
        PlaceholderIcon: 'instructure-icons/lib/Line/IconUserLine',
        IconPlus: 'instructure-icons/lib/Solid/IconPlusSolid',
        IconX: 'instructure-icons/lib/Solid/IconXSolid',
        moment: 'moment',
        locales: 'moment/min/locales',
        avatarImage: path.join(__dirname, 'docs/assets/placeholder-avatar.png')
      },
      files: {
        // TODO: consolidate docs loader into a single loader and change this to an array of paths/patterns
        components: [
          path.join(__dirname, 'lib/components/*/index.js') // only top level components
        ],
        docs: [
          path.join(__dirname, 'README.md'),
          path.join(__dirname, 'CHANGELOG'),
          path.join(__dirname, 'docs/*.md')
        ]
      },
      template: path.join(__dirname, 'templates/docs/index.tmpl.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', pkg.name].reverse(),
      minChunks: Infinity
    })
  ])

  if (!debug) {
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
      })
    ])
  }
  return plugins
}
