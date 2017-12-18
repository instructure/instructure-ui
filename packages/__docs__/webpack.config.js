const path = require('path')
const webpack = require('webpack')

const DocsPlugin = require('@instructure/ui-docs-plugin')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const outputPath = path.resolve(__dirname, '__build__')
const projectRoot = path.resolve(__dirname, '../../')
const pkg = require('../../package.json')

let plugins = require('@instructure/ui-presets/webpack/plugins')()

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
      'README.md',
      'CHANGELOG.md',
      'CODE_OF_CONDUCT.md',
      'packages/media-capture/src/components/MediaCapture/index.js',
      'packages/media-capture/src/components/MediaCapture/README.md',
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
      mangle: false,
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
      'react-dom'
    ],
    'instructure-ui': [
      '@instructure/media-capture',
      '@instructure/ui-core',
      '@instructure/ui-utils',
      '@instructure/ui-themes',
      '@instructure/ui-themeable'
    ],
    globals: './globals' // for codepen
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
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  plugins,
  resolve: {
    alias: {
      // set up aliases to get webpack to rebuild when we make changes to these packages
      '@instructure/media-capture$': path.resolve(__dirname, '../media-capture/src'),
      '@instructure/ui-core$': path.resolve(__dirname, '../ui-core/src/'),
      '@instructure/ui-utils$': path.resolve(__dirname, '../ui-utils/src/'),
      '@instructure/ui-themes$': path.resolve(__dirname, '../ui-themes/src/'),
      '@instructure/ui-themeable$': path.resolve(__dirname, '../ui-themeable/src/'),

      '@instructure/media-capture/lib': path.resolve(__dirname, '../media-capture/src'),
      '@instructure/ui-core/lib': path.resolve(__dirname, '../ui-core/src'),
      '@instructure/ui-utils/lib': path.resolve(__dirname, '../ui-utils/src'),
      '@instructure/ui-themes/lib': path.resolve(__dirname, '../ui-themes/src'),
      '@instructure/ui-themeable/lib': path.resolve(__dirname, '../ui-themeable/src')
    }
  },
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
