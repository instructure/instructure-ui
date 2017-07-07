const path = require('path')

const env = process.env.BABEL_ENV || process.env.NODE_ENV

if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(`\
Invalid or undefined NODE_ENV or \
BABEL_ENV environment variables. Valid values are "development", \
"test", and "production". Instead, received: ${JSON.stringify(env)}.\
`)
}

const debug = Boolean(process.env.DEBUG) || (env === 'development')
const esModules = Boolean(process.env.ES_MODULES)

module.exports = function (context, opts = {}) {
  let presets = []

  presets = presets.concat([
    [require.resolve('babel-preset-env'), {
      targets: {
        browsers: require('../browserslist.json') // TODO; make this an option
      },
      modules: (esModules === 0 || esModules === false) ? false : undefined
    }],
    require.resolve('babel-preset-stage-1'),
    require.resolve('babel-preset-react')
  ])

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
    }]
  ]

  if (opts.transform) {
    plugins = plugins.concat([
      require.resolve('babel-plugin-transform-decorators-legacy'),
      require.resolve('./plugins/transform-class-display-name')
    ])

    if (!debug) {
      // in 'dev' and for debugging we want the css changes to fire a recompile
      // so we use the themeable webpack loader instead

      plugins = plugins.concat([
        [
          require.resolve('./plugins/transform-themeable'),
          {
            postcssrc: opts.postcssrc,
            themeablerc: opts.themeablerc
          }
        ]
      ])
    }
  }

  if (env === 'test' && !debug) {
    plugins = [
      [require.resolve('babel-plugin-istanbul'), {
        include: ['lib/**/*.js'],
        exclude: ['**/*.test.js']
      }]
    ].concat(plugins)
  }

  return {
    presets,
    plugins
  }
}
