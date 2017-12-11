const loadConfig = require('./loadConfig')

module.exports = function (context, opts = { themeable: false, esModules: false, coverage: false, node: false }) {
  const envPresetConfig = opts.node ? getNodeEnvConfig() : getWebEnvConfig(opts)

  const presets = [
    ['env', envPresetConfig],
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
    'transform-decorators-legacy',
    require.resolve('@instructure/babel-plugin-transform-class-display-name')
  ]

  if (opts.themeable) {
    let themeableConfig = {
      ignore: 'node_modules/**/*',
      postcssrc: loadConfig('postcss', require('./postcss')()),
      themeablerc: loadConfig('themeable', require('./themeable'))
    }

    if (typeof opts.themeable === 'object') {
      themeableConfig = Object.assign(themeableConfig, opts.themeable)
    }

    plugins = plugins.concat([
      [
        require.resolve('@instructure/babel-plugin-themeable-styles'),
        themeableConfig
      ]
    ])
  }

  if (opts.node) {
    plugins = plugins.concat([
      require('babel-plugin-dynamic-import-node').default,
      require('babel-plugin-transform-ensure-ignore').default
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

function getNodeEnvConfig () {
  return {
    // the test-quick command that is ran directly in node (in quizzes land) and not using webpack
    // needs commonjs modules, not es modules. But it only needs to transform js features
    // that the current version of node doesn't support, not everything our lowest supported
    // browser needs
    targets: {
      node: 'current'
    },
    modules: 'commonjs',
    // this is for babel-plugin-transform-themeable. it currently doesn't work against native class syntax.
    // once it does, this line can be removed
    include: ['transform-es2015-classes']
  }
}

function getWebEnvConfig (opts) {
  return {
    targets: {
      browsers: loadConfig('browserslist', require('./browserslist'))
    },
    modules: opts.esModules ? false : 'commonjs',
    useBuiltIns: true
  }
}
