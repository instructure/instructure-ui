const path = require('path')

module.exports = {
  modules: [
    path.resolve(__dirname, 'loaders'),
    path.resolve(__dirname, '../node_modules'),
    'node_modules'
  ]
}
