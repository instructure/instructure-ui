const spawn = require('cross-spawn')
const { getCommand, runCommands } = require('../utils')

const vars = ['NODE_ENV=test']
const args = ['start']
const commands = {}

if (process.argv.includes('--watch')) {
  vars.push('DEBUG=1')
} else {
  vars.push('COVERAGE=1')
  commands.node = 'node lib/index.js'
}

commands.karma = getCommand(vars, 'karma', args)

const result = runCommands(commands)

process.exit(result.status)
