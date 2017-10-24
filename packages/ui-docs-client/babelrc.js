module.exports = {
  presets: [[
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('@instructure/ui-presets/babel'),
    {
      themeable: true,
      esModules: Boolean(process.env.ES_MODULES)
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
