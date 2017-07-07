module.exports = {
  // FIXME: we need to load preset-themeable from a more proper location
  presets: [
    [
      require.resolve('../../../../babel/preset-themeable'),
      { transform: true, browsers: require('./browserslist.json') }]
  ]
}
