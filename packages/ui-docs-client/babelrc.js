module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  presets: [[ require('@instructure/ui-presets/babel'), {
    themeable: true,
    esModules: Boolean(process.env.ES_MODULES)
  }]]
}
