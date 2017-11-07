module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  presets: [[ require('@instructure/ui-presets/babel'), {
    coverage: Boolean(process.env.COVERAGE),
    esModules: Boolean(process.env.ES_MODULES)
  }]]
}
