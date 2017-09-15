const path = require('path')
const webpack = require('webpack')

const DocsPlugin = require('@instructure/ui-docs-plugin')

const env = process.env.NODE_ENV
const debug = Boolean(process.env.DEBUG) || env === 'development'

const paths = {
  root: path.join(__dirname, '../'),
  output: path.join(__dirname, '__build__'),
  lib: path.join(__dirname, '../ui-core')
}

module.exports = {
  cache: debug,
  bail: !debug,
  entry: {
    common: [
      '@instructure/ui-polyfill-loader!',
      'react',
      'react-dom',
      'moment'
    ],
    'instructure-ui': [
      path.join(paths.lib, 'src/themes'),
      path.join(paths.lib, 'src')
    ]
  },
  output: {
    path: paths.output,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: paths.output,
    host: '0.0.0.0',
    port: 8080
  },
  plugins: getPlugins(),
  module: {
    rules: require('@instructure/ui-config/webpack/module/rules')
  },
  resolveLoader: require('@instructure/ui-config/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}

function getPlugins () {
  const pkg = require('../ui-core/package.json')

  let plugins = require('@instructure/ui-config/webpack/plugins')

  plugins = plugins.concat([
    new DocsPlugin({
      title: `InstructureUI : ${pkg.description} (${pkg.version})`,
      favicon: path.join(__dirname, '../../logo.png'),
      library: {
        root: paths.root,
        packageName: pkg.name,
        packageMain: path.join(paths.lib, 'src'),
        name: 'InstructureUI',
        description: pkg.description,
        version: pkg.version,
        repository: pkg.repository.url,
        author: pkg.author,
        codepen: {
          // codpen button form data (https://blog.codepen.io/documentation/api/prefill/)
          js_external: [
            `${pkg.homepage}common.js`,
            `${pkg.homepage}instructure-ui.js`,
            `${pkg.homepage}globals.js`
          ].join(';')
        }
      },
      globals: require('./globals'),
      files: {
        // TODO: consolidate docs loader into a single loader and change this to an array of paths/patterns
        components: [
          path.join(paths.lib, 'src/components/*/index.js') // only top level components
        ],
        docs: [
          path.join(paths.lib, 'README.md'),
          path.join(__dirname, '../CHANGELOG.md'),
          path.join(paths.lib, 'docs/*.md')
        ]
      },
      template: path.join(__dirname, 'index.tmpl.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'instructure-ui'].reverse(),
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
