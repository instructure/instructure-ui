const baseConfig = require('@instructure/ui-webpack-config')
const React = require('react')

module.exports = (storybookBaseConfig, configType) => {
  const config = {
    resolveLoader: { alias: {} },
    resolve: { alias: {} },
    ...storybookBaseConfig
  }

  config.module.rules = [
    ...baseConfig.module.rules,
    ...config.module.rules
  ]

  config.plugins = [
    ...config.plugins,
    ...baseConfig.plugins
  ]

  config.resolveLoader = {
   ...config.resolveLoader,
   alias: {
     ...config.resolveLoader.alias,
     ...baseConfig.resolveLoader.alias
   }
  }

  console.log(`Starting Storybook with React version ${React.version}...`)

  if (parseFloat(React.version) < 16) {
    console.error('Storybook requires React > 16. Run `yarn install:react:16` before running `yarn start:examples`.')
  }

  return config
}
