/* eslint-disable import/no-extraneous-dependencies */
module.exports = require('@instructure/ui-presets/postcss')({
  before: {
    plugin: 'postcss-nested',
    insert: [
      [require.resolve('postcss-input-range')], // for RangeInput
      [require.resolve('postcss-mixins')], // TODO: remove this. needed for Grid
      [require.resolve('postcss-simple-vars')] // TODO: remove this. needed for Grid
    ]
  }
})
/* eslint-enable import/no-extraneous-dependencies */
