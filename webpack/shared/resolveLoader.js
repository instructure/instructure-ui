const path = require('path')

module.exports = {
  modules: [
    path.resolve(__dirname, '../loaders'),
    'node_modules'
  ]
}
