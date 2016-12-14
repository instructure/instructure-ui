const path = require('path')
const env = process.env.BABEL_ENV || process.env.NODE_ENV
const debug = process.env.DEBUG

if (env !== 'development' && env !== 'test' && env !== 'production' && env !== 'transpile') {
  throw new Error(
    'Invalid or undefined `NODE_ENV` or ' +
    '`BABEL_ENV` environment variables. Valid values are "development", ' +
    '"test", "transpile" and "production". Instead, received: ' + JSON.stringify(env) + '.'
  )
}

module.exports = function (context, opts = {}) {
  let presets = []

  const envOpts = {
    'targets': {
      'browsers': ['last 2 versions']
    }
  }

  if (env !== 'transpile') {
    envOpts['modules'] = false
  }

  presets = presets.concat([
    [require.resolve('babel-preset-env'), envOpts],
    require.resolve('babel-preset-stage-1'),
    require.resolve('babel-preset-react')
  ])

  if (env === 'development') {
    presets = presets.concat([ require.resolve('babel-preset-react-hmre') ])
  }

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
      regenerator: false,
      moduleName: path.dirname(require.resolve('babel-runtime/package'))
    }],
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('./plugins/transform-class-display-name')
  ]

  if (opts.themeable && (env === 'transpile' || env === 'production')) {
    plugins = plugins.concat([
      [require.resolve('./plugins/transform-themeable'), { 'postcssrc': './postcss.config.js' }]
    ])
  }

  if (env === 'test' && !debug) {
    plugins = [
      [require.resolve('babel-plugin-istanbul'), {
        'include': ['lib/**/*.js'],
        'exclude': ['**/*.test.js', '__tests__']
      }]
    ].concat(plugins)
  }

  return {
    presets,
    plugins
  }
}
