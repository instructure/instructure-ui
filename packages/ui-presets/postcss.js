const loadConfig = require('./loadConfig')

const CORE_PLUGINS = [
  ['autoprefixer', { browsers: loadConfig('browserslist', require('./browserslist')) }],
  ['postcss-initial'],
  ['postcss-bidirection'],
  ['postcss-reporter']
]

const DEBUG = Boolean(process.env.DEBUG)

module.exports = function (opts = { before: {}, after: {}, nesting: false }) {
  return function (ctx = {}) {
    let plugins = [
      opts.nesting ? ['postcss-nesting'] : ['postcss-nested'],
      ...CORE_PLUGINS
    ]

    if (DEBUG) {
      plugins = [['stylelint'], ...plugins, ['postcss-browser-reporter']]
    }

    const keys = plugins.map(plugin => plugin[0])

    if (opts.before && Array.isArray(opts.before.insert)) {
      const index = keys.indexOf(opts.before.plugin)
      if (index > -1) {
        plugins = insertPlugins(plugins, index, opts.before.insert)
      }
    }

    if (opts.after && Array.isArray(opts.after.insert)) {
      const index = keys.indexOf(opts.after.plugin)
      plugins = insertPlugins(plugins, index + 1, opts.after.insert)
    }

    return {
      // eslint-disable-next-line import/no-dynamic-require
      plugins: plugins.map((plugin) => require(plugin[0])(plugin[1]))
    }
  }
}

function insertPlugins (plugins, index, additions) {
  let pre = []
  let post = []

  if (index >= 0) {
    pre = plugins.slice(0, index)
  }

  if (index < plugins.length) {
    post = plugins.slice(index)
  }

  return [
    ...pre,
    ...additions.map(addition => (Array.isArray(addition)) ? addition : [addition]),
    ...post
  ]
}
