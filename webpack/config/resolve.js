const { paths } = require('../util/loadConfig')

module.exports = {
  alias: {
    'instructure-icons$': 'invalid'
  },
  modules: [
    paths.root,
    'node_modules'
  ]
}
