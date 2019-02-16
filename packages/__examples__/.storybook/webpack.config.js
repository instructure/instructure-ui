const React = require('react')
const merge = require('webpack-merge')

module.exports = (storybookBaseConfig, configType) => {
  const config = merge(storybookBaseConfig, require('@instructure/ui-webpack-config'))

  // need to override this instead of merge...
  config.optimization = require('@instructure/ui-webpack-config/config/optimization')
  if (process.env.NODE_ENV === 'production') {
    config.devtool = 'none'
  }

  config.resolveLoader.alias = {
    ...config.resolveLoader.alias,
    'examples-loader': require.resolve('@instructure/generate-examples/lib/examples-loader')
  }

  console.log(`Starting Storybook with React version ${React.version}...`)

  if (parseFloat(React.version) < 16) {
    console.error('Storybook requires React > 16. Run `yarn install:react:16` before running `yarn start:examples`.')
  }

  return config
}
