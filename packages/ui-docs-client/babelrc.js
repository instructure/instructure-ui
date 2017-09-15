module.exports = {
  presets: [[
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('@instructure/ui-presets/babel'),
    {
      themeable: true
    }
  ]],
  plugins: [[
    'inline-import', {
      extensions: [
        '.svg'
      ]
    }
  ]]
}
