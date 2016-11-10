module.exports = {
  plugins: [
    require('stylelint')(),

    require('postcss-url')({
      url: 'inline'
    }),
    require('postcss-nested')(),
    require('postcss-custom-properties')(),
    require('postcss-calc')(),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    }),

    require('postcss-browser-reporter'),
    require('postcss-reporter')
  ]
}
