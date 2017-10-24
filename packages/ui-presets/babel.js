const path = require('path')
const loadConfig = require('./loadConfig')

module.exports = function (context, opts = { themeable: false, esModules: false, coverage: false }) {
  const presets = [
    ['env', {
      targets: {
        browsers: loadConfig('browserslist', require('./browserslist'))
      },
      modules: opts.esModules ? false : 'commonjs',
      useBuiltIns: false
    }],
    'stage-1',
    'react'
  ]

  let plugins = [
    ['transform-object-rest-spread', {
      useBuiltIns: true
    }],
    ['transform-react-jsx', {
      useBuiltIns: true
    }],
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: false
    }],
    'transform-decorators-legacy'
  ]

  if (opts.themeable) {
    plugins = plugins.concat([
      [
        require.resolve('@instructure/babel-plugin-themeable-styles'),
        {
          ignore: 'node_modules/**/*',
          postcssrc: loadConfig('postcss', require('./postcss')()),
          themeablerc: loadConfig('themeable', require('./themeable'))
        }
      ]
    ])
  }

  if (opts.coverage) {
    plugins = [
      ['istanbul', {
        include: ['src/**/*.js'],
        exclude: ['**/*.test.js']
      }]
    ].concat(plugins)
  }

  return {
    presets,
    plugins
  }
}
