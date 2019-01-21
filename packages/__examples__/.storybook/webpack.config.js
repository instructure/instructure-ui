const instConfig = require('@instructure/ui-webpack-config')
const React = require('react')

module.exports = (storybookBaseConfig, configType) => {
  const config = {
    module: { rules: [] },
    plugins: [],
    resolveLoader: { alias: {} },
    ...storybookBaseConfig
  }

  config.module.rules = [
    ...config.module.rules,
    ...instConfig.module.rules
  ]

  config.plugins = [
    ...config.plugins,
    ...instConfig.plugins
  ]

  config.resolveLoader.alias = {
   ...config.resolveLoader.alias,
   ...instConfig.resolveLoader.alias,
   'examples-loader': require.resolve('@instructure/generate-examples/lib/examples-loader')
  }

  console.log(`Starting Storybook with React version ${React.version}...`)

  if (parseFloat(React.version) < 16) {
    console.error('Storybook requires React > 16. Run `yarn install:react:16` before running `yarn start:examples`.')
  }

  return config
}
