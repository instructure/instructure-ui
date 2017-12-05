const fs = require('fs')
const path = require('path')

module.exports = function readDirectories (searchPath) {
  return fs.readdirSync(searchPath).filter(f => fs.statSync(path.join(searchPath, f)).isDirectory())
}
