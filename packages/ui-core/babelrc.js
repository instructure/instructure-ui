module.exports = {
  // eslint-disable-next-line import/no-extraneous-dependencies
  presets: [[ require('@instructure/ui-presets/babel'), {
    themeable: !process.env.DEBUG,
    coverage: Boolean(process.env.COVERAGE)
  }]]
}
