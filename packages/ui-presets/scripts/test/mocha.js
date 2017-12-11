const spawn = require('cross-spawn')
const path = require('path')
const { runCommands, getCommand } = require('../utils')

const presetsDirectory = path.dirname(require.resolve('@instructure/ui-presets'))
const bootstrapPath = `${presetsDirectory}/scripts/test/mocha-bootstrap`

const commands = {
  mocha: getCommand([], 'mocha', ['--timeout', '60000', '--require', bootstrapPath, 'src/**/__tests__/**/*.test.js'])
}

const result = runCommands(commands)

process.exit(result.status)
