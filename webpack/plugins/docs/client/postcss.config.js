/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('autoprefixer')({
      // TODO: when we extract the plugin we'll need to get this from some shared module
      browsers: require('./browserslist.json')
    }),
    require('postcss-browser-reporter'),
    require('postcss-reporter')
  ]
}
/* eslint-enable import/no-extraneous-dependencies */
