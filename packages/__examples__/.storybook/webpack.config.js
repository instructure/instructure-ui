const React = require('react')
const merge = require('webpack-merge')

module.exports = ({ config, mode }) => {
  const baseConfig = require('@instructure/ui-webpack-config')

  // Storybook does not like thread-loader, see
  // https://github.com/storybookjs/storybook/issues/12864
  const rules = baseConfig.module.rules
  for (const rule of rules) {
    if (rule.use) {
      for (let i = 0; i < rule.use.length; i++) {
        if (rule.use[i].loader === 'thread-loader') {
          rule.use.splice(i, 1)
        }
      }
    }
  }

  config = merge(config, baseConfig)

  // need to override this instead of merge for these...
  config.module.rules = baseConfig.module.rules
  config.optimization = require('@instructure/ui-webpack-config/config/optimization')
  if (process.env.NODE_ENV === 'production') {
    config.devtool = 'none'
  }

  console.log(`Building Storybook with React version ${React.version}...`)

  if (parseFloat(React.version) < 16) {
    console.error(
      'Storybook requires React > 16. Run `yarn install:react:16` before running `yarn start:examples`.'
    )
  }

  return config
}
