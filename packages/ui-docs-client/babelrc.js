module.exports = {
  presets: [[ require('@instructure/ui-config/babel/preset'), { // eslint-disable-line import/no-extraneous-dependencies
    themeable: true
  }]],
  plugins: [[
    'inline-import', {
      extensions: [
        '.svg'
      ]
    }
  ]]
}
