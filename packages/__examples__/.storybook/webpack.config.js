module.exports = (baseConfig) => {
  const config = Object.assign({}, baseConfig)

  config.output.library = '[name]'
  config.module.rules = require('@instructure/ui-presets/webpack/module/rules')
  config.plugins = config.plugins.concat(require('@instructure/ui-presets/webpack/plugins')())

  return config
}
