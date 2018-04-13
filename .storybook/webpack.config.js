module.exports = (baseConfig) => {
  const config = Object.assign({}, baseConfig)

  config.output.library = '[name]'

  return config
}
