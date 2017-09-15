const path = require('path')

const { BROWSERSLISTRC, loadConfig } = require('../index')

const env = process.env.BABEL_ENV || process.env.NODE_ENV

if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(`\
Invalid or undefined NODE_ENV or \
BABEL_ENV environment variables. Valid values are "development", \
"test", and "production". Instead, received: ${JSON.stringify(env)}.\
`)
}

module.exports = function (context, opts = { themeable: true, esModules: false, coverage: false }) {
  const presets = [
    [require.resolve('babel-preset-env'), {
      targets: {
        browsers: loadConfig(BROWSERSLISTRC)
      },
      modules: opts.esModules ? false : 'commonjs',
      useBuiltIns: false
    }],
    require.resolve('babel-preset-stage-1'),
    require.resolve('babel-preset-react')
  ]

  let plugins = [
    [require.resolve('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns: true
    }],
    [require.resolve('babel-plugin-transform-react-jsx'), {
      useBuiltIns: true
    }],
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: false
    }],
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('./plugin-transform-class-display-name')
  ]

  if (opts.themeable) {
    plugins = plugins.concat([
      [require.resolve('./plugin-transform-themeable'), { ignore: 'node_modules/**/*' }]
    ])
  }

  if (opts.coverage) {
    plugins = [
      [require.resolve('babel-plugin-istanbul'), {
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
