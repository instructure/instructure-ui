const path = require('path')
const webpack = require('webpack')

const DocsPlugin = require('@instructure/ui-docs-plugin')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const outputPath = path.resolve(__dirname, '__build__')
const projectRoot = path.resolve(__dirname, '../../')
const pkg = require('../../package.json')

let plugins = require('@instructure/ui-presets/webpack/plugins')

plugins = plugins.concat([
  new DocsPlugin({
    projectRoot,
    title: `${pkg.name} : ${pkg.description} (${pkg.version})`,
    favicon: '../../logo.png',
    library: {
      name: pkg.name,
      version: pkg.version,
      repository: pkg.repository.url,
      author: pkg.author,
      packages: 'packages',
      scope: '@instructure',
      codepen: {
        // codepen button form data (https://blog.codepen.io/documentation/api/prefill/)
        // this is usually whatever webpack entries you've defined
        js_external: [
          `${pkg.homepage}common.js`,
          `${pkg.homepage}instructure-ui.js`,
          `${pkg.homepage}globals.js`
        ].join(';')
      }
    },
    files: [
      'CODE_OF_CONDUCT.md',
      'packages/ui-core/src/components/*/**/index.js',
      'packages/ui-core/src/components/*/**/README.md',
      'packages/ui-core/src/utils/**/*.js',
      'packages/ui-themeable/src/**/*.js',
      'packages/ui-utils/src/**/*.js',
      'packages/*/README.md',
      'docs/**/*.md'
    ],
    ignore: [
      '**/node_modules/**',
      '**/__tests__/**',
      '**/__docs__/**',
      '**/config/**',
      '**/src/index.js',
      'packages/ui-utils/src/{react,dom,i18n}/index.js',
      '**/theme.js'
    ],
    themes: [
      'packages/ui-themes/src/canvas',
      'packages/ui-themes/src/canvas/high-contrast'
    ],
    template: './index.ejs'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['common', 'instructure-ui'].reverse(),
    minChunks: Infinity
  })
])

if (!DEBUG) {
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

module.exports = {
  cache: DEBUG,
  bail: !DEBUG,
  entry: {
    common: [
      '../ui-polyfill-loader!',
      'react',
      'react-dom',
      'moment'
    ],
    'instructure-ui': [
      '../ui-core/src',
      '../ui-utils/src',
      '../ui-themeable/src'
    ],
    globals: './globals'
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: outputPath,
    host: '0.0.0.0',
    port: 8080
  },
  plugins,
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
