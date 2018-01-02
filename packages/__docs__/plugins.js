const path = require('path')
const webpack = require('webpack')
const DocsPlugin = require('@instructure/ui-docs-plugin')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

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
      'packages/*/src/components/*/**/index.js',
      'packages/*/src/components/*/**/README.md',
      'packages/*/src/utils/**/*.js',
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
      'packages/ui-core/src/components/Portal/*',
      'packages/ui-utils/src/{react,dom,i18n}/index.js',
      '**/theme.js',
      'packages/ui-docs-client/**/*.js',
      'packages/ui-docs-plugin/**/*.js'
    ],
    themes: [
      require.resolve('@instructure/ui-themes/lib/canvas'),
      require.resolve('@instructure/ui-themes/lib/canvas/high-contrast')
    ],
    icons: {
      packageName: '@instructure/ui-icons',
      formats: {
        React: '@instructure/ui-icons/lib',
        SVG: '@instructure/ui-icons/lib/svg',
        Font: '@instructure/ui-icons/lib/font'
      }
    },
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

module.exports = plugins
