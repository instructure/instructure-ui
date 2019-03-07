const React = require('react')
const merge = require('webpack-merge')

module.exports = ({ config, mode }) => {
  const baseConfig = require('@instructure/ui-webpack-config')
  config = merge(config, baseConfig)

  // need to override this instead of merge for these...
  config.module.rules = baseConfig.module.rules
  config.optimization = require('@instructure/ui-webpack-config/config/optimization')
  if (process.env.NODE_ENV === 'production') {
    config.devtool = 'none'
  }

  console.log(`Starting Storybook with React version ${React.version}...`)

  if (parseFloat(React.version) < 16) {
    console.error('Storybook requires React > 16. Run `yarn install:react:16` before running `yarn start:examples`.')
  }

  return config
}
