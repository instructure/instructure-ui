const { join } = require('path')
const cwd = process.cwd()
const config = require(join(cwd, 'build.config.js'))
config.pkg = require(join(cwd, 'package.json'))

// TODO: validate config

module.exports = config
